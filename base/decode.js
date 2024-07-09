const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
generator = require("@babel/generator").default;
const parser = require("@babel/parser");
const fs = require("fs");

let src = fs.readFileSync(__dirname + "/before.js", {encoding: "utf8"})

let ast = parser.parse(src);


// 变量重命名
// 非常实用, 在混淆的基本思想里面有一条就是要用尽可能少的变量名完成所有的工作, 以达到尽可能让人难以调试的效果
// 变量名混淆不仅仅是直观的不好看,
// 还有的是在不同作用域(也就是AST里的scope中)使用同一个变量名让你调试的时候不知道当前用的变量是之前的哪一个
let prefix = "TEST_";
let count = 0;
let renameVisitor = {
    "Identifier": function (path) {
        let oldName = path.node.name;
        if (oldName.startsWith(prefix)) {
            return
        }
        let newName = prefix + count++;
        path.scope.rename(oldName, newName);
    }
}

// 字面量转换
// 一般般, 在一些情况下万一直接让你搜到一些加密相关的特征值?
let literalVisitor = {
    "NumericLiteral": function (path) {
        delete path.node.extra;
    },
    "StringLiteral": function (path) {
        path.node.extra = {
            "rawValue": path.node.value,
            "raw": JSON.stringify(path.node.value),
        }
    }
}


// ensureBlock
// 非常实用, 后面的三目运算符处理前提也要先执行这个,
// 保证你在替换只有一条语句的子节点的时候不会影响代码逻辑
let ensureBlockVisitor = {
    "WhileStatement": function (path) {
        path.ensureBlock();
    },
    "ForStatement": function (path) {
        path.ensureBlock();
    },
    "IfStatement": function (path) {
        let {consequent, alternate} = path.node;
        if (!types.isBlockStatement(consequent)) {
            path.get("consequent").replaceWith(
                types.blockStatement([consequent])
            )
        }
        if (alternate && !types.isBlockStatement(alternate)) {
            path.get("alternate").replaceWith(
                types.blockStatement([alternate])
            )
        }
    }
}


// 转换 conditionalExpression to ifStatement
// 三目运算符转普通的If, 不转换的话, 子表达式可能是一个逗号表达式, 而三目运算符的子表达式是没法替换为多个语句的
// 替换之后可以让后续的操作处理空间更大
let convertConditionalToIfVisitor = {
    "ConditionalExpression": {
        exit: function(path) {
            if (!path.parentPath.isBlockStatement() && !path.parentPath.isExpressionStatement()) {
                return
            }

            let {test, consequent, alternate} = path.node;

            path.insertBefore(types.IfStatement(
                test,
                types.blockStatement([types.expressionStatement(consequent)]),
                types.blockStatement([types.expressionStatement(alternate)])
            ))

            path.remove();
        }
    }
}

// 处理逗号表达式
// 简单又实用, 逗号表达式调试的时候很麻烦, 改成普通的多个语句之后就方便处理了
let convertSequenceVisitor = {
    "SequenceExpression": function (path) {
        let parentPath = path.parentPath;
        if (!parentPath.isExpressionStatement()) {
            return
        }
        let exps = path.node.expressions;
        let nodes = [];
        exps.forEach(exp => {
            nodes.push(
                types.expressionStatement(exp)
            )
        })
        parentPath.replaceWithMultiple(nodes);
    }
}

// if 转 switch
// 仅针对例子里的这种情况下的处理, 包括了基本的节点特征定位 子作用域内的节点遍历 到复杂节点(switch)的生成替换
let convertIfToSwitchVisitor = {
    "FunctionDeclaration": function (path) {
        // 定位目标函数
        let node = path.node;
        let body = node.body;
        if (body.body.length !== 1 || !types.isIfStatement(body.body[0])) {
            return
        }
        let ifPath = path.get("body.body")[0];
        let testKey = ifPath.node.test.left.name;
        let testOperator = ifPath.node.test.operator;
        let cases = [];
        ifPath.scope.traverse(ifPath.scope.block, {
            "IfStatement": function (subPath) {
                // 判断是不是我们要的那些种类的IF节点处
                if (subPath.node.test.left.name !== testKey ||
                    subPath.node.test.operator !== testOperator
                ) {
                    return
                }
                // 接下来分两种情况, 如果节点内还是if, 那就不管,如果不是 那就分别处理
                let testValue = subPath.node.test.right.value;
                let {consequent, alternate} = subPath.node;
                if (!types.isIfStatement(consequent.body[0])) {
                    cases[testValue] = consequent.body;
                }
                if (!types.isIfStatement(alternate.body[0])) {
                    cases[testValue + 1] = alternate.body;
                }
            }
        })
        let caseNode = [];
        for (let i = 0; i < cases.length; i++) {
            let thisNode = cases[i];
            thisNode.push(types.breakStatement());
            caseNode.push(types.switchCase(
                types.numericLiteral(i),
                thisNode
            ))
        }
        let newSwitch = types.switchStatement(
            types.identifier(testKey),
            caseNode
        );
        ifPath.replaceWith(newSwitch);
    }
}

traverse(ast, renameVisitor);
traverse(ast, literalVisitor);
traverse(ast, ensureBlockVisitor);
traverse(ast, convertConditionalToIfVisitor);
traverse(ast, convertSequenceVisitor);
traverse(ast, convertIfToSwitchVisitor)

let code = generator(ast).code;

fs.writeFileSync(__dirname + "/after.js", code, {encoding: "utf8"})
