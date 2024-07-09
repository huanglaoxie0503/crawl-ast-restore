const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
generator = require("@babel/generator").default;
const parser = require("@babel/parser");
const fs = require("fs");

let src = fs.readFileSync(__dirname + "/before.js", {encoding: "utf8"})
// let src = fs.readFileSync(__dirname + "/test.js", {encoding: "utf8"});

let ast = parser.parse(src);

// 提前处理下变量名，不然后续会出现同名变量导致变量引用不对
let prefix = "ali227_";
let count = 0;
let renameVisitor = {
    "Identifier": function (path) {
        let oldName = path.node.name;
        if (oldName.startsWith(prefix)) {
            return
        }
        // 这个懒得去适配，不要重命名这个
        if (oldName === "mi") {
            return;
        }
        if (oldName === "li") {
            return;
        }
        let newName = prefix + count++;
        path.scope.rename(oldName, newName);
        // path.scope.crawl();
    }
}


// 处理一下 li = 4 == mi ? to < ko.length ? 6339 : 29251 : mi < 4 ? (Se = Be) ? 9573 : 6240 : w < C.length ? 21059 : 24196;
// 这种形式的三元表达式
let assignEqualConditionVisitor = {
    "AssignmentExpression": function (path) {
        let {operator, left, right} = path.node;
        if (!path.parentPath.isExpressionStatement()) {
            return
        }
        if (!types.isConditionalExpression(right)) {
            return;
        }
        if (!types.isBinaryExpression(right.test) && right.test.operator !== "==") {
            return;
        }
        let {test, consequent, alternate} = right;
        let newNode = types.IfStatement(
            test,
            types.BlockStatement([types.ExpressionStatement(types.AssignmentExpression(operator, left, consequent))]),
            types.BlockStatement([types.ExpressionStatement(types.AssignmentExpression(operator, left, alternate))]),
        )
        if (path.parentPath.isExpressionStatement()) {
            path.parentPath.replaceWith(newNode);
        } else {
            path.replaceWith(newNode);
        }
    }
}


// ensureBlock
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


// convert conditionalExpression to ifStatement
let convertConditionalToIfVisitor = {
    "ConditionalExpression": function (path) {
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

// 删掉 case 中最外层的 void 运算符
let deleteVoidVisitor = {
    "UnaryExpression": function (path) {
        let {operator, argument} = path.node;
        if (operator !== "void") {
            return
        }
        if (!path.parentPath.parentPath.isSwitchCase()) {
            return;
        }
        path.replaceWith(types.ExpressionStatement(argument));
    }
}


// di 就是最外层 Switch 对应的值
function mi_Ci_di2li(mi, Ci, di) {
    return (mi << 10) | (Ci << 5) | di;
}

// 先写个判断每个 if 所对应的 test 值
const testKey = "mi"; // 懒得动态去适配， 直接用吧
let mainFuncName = "";
let convertCase_if2CaseVisitor = {
    "SwitchStatement": function (path) {
        // 判断下条件是 31 & li 那个
        let {discriminant} = path.node;
        if (!types.isBinaryExpression(discriminant)) {
            return
        }
        if (discriminant.operator !== "&" || discriminant.left?.value !== 31 || discriminant.right.name !== "li") {
            return;
        }
        let funParent = path.findParent(p => {
            return p.isFunctionDeclaration();
        })
        mainFuncName = funParent.node.id.name;
        let casePaths = path.get("cases");
        console.log(casePaths.length)
        let casesMap = [];
        for (let casePath of casePaths) {
            // 先判断一下是不是自执行函数那种类型
            let {consequent, test} = casePath.node;
            let di = test.value;
            // 是自执行函数类型的
            if (consequent.length === 2
                && types.isBreakStatement(consequent[1])
                && types.isExpressionStatement(consequent[0])
                && types.isCallExpression(consequent[0].expression.argument)
            ) {
                let CiSwitch = casePath.get("consequent.0.expression.argument.callee.body.body.0");
                let CiCasePaths = CiSwitch.get("cases");
                for (let CiCasePath of CiCasePaths) {
                    let {test} = CiCasePath.node;
                    let Ci = test.value;
                    // 接下来就是对最内层mi的值进行处理
                    CiCasePath.scope.traverse(CiCasePath.scope.block, {
                        "IfStatement": function (subPath) {
                            // 作用域的遍历存在问题，需要提前处理
                            let caseParent = subPath.find(p => {
                                return p.isSwitchCase();
                            })
                            if (caseParent.node.test.value !== Ci) {
                                subPath.skip();
                                return;
                            }

                            // 分两种情况
                            // 1. 10 == mi
                            // 2. mi < 8
                            let {test, consequent, alternate} = subPath.node;
                            if (!types.isBinaryExpression(test)) {
                                return;
                            }
                            if (test.left?.name !== "mi" && test.right?.name !== "mi") {
                                return;
                            }
                            let alternate_mi = undefined; // 两种情况的alternate的值都需要根据consequent来推断
                            // 10 == mi
                            if (test.right?.name === "mi" && test.operator === "==") { // mi 都在右边
                                let mi = test.left.value;
                                let li = mi_Ci_di2li(mi, Ci, di);
                                casesMap[li] = consequent.body;
                                alternate_mi = mi + 1;
                            } else if (test.left?.name === "mi" && test.operator === "<") {
                                // 如果子级还是 mi 的 if 块情况那就跳过不处理
                                if (types.isIfStatement(consequent.body[0])
                                    && consequent.body.length === 1
                                    && (consequent.body[0].test.left?.name === "mi" || consequent.body[0].test.right?.name === "mi")
                                ) {
                                    return;
                                }
                                let mi = test.right.value - 1;
                                let li = mi_Ci_di2li(mi, Ci, di);
                                casesMap[li] = consequent.body;
                                alternate_mi = test.right.value + 1;
                            } else if (test.left?.name === "mi" && test.operator === ">") {
                                // 如果子级还是 mi 的 if 块情况那就跳过不处理
                                if (types.isIfStatement(consequent.body[0])
                                    && consequent.body.length === 1
                                    && (consequent.body[0].test.left?.name === "mi" || consequent.body[0].test.right?.name === "mi")
                                ) {
                                    return;
                                }
                                let mi = test.right.value + 1;
                                let li = mi_Ci_di2li(mi, Ci, di);
                                casesMap[li] = consequent.body;
                            } else {
                                // throw "没处理的情况"
                                console.log("没处理的情况");
                                return;
                            }
                            if (!alternate_mi) {
                                return;
                            }
                            // 接下来处理alternate 部分
                            if (types.isIfStatement(consequent.body[0])
                                && consequent.body.length === 1
                                && (consequent.body[0].test.left?.name === "mi" || consequent.body[0].test.right?.name === "mi")
                            ) {
                                return;
                            }
                            let alternate_li = mi_Ci_di2li(alternate_mi, Ci, di);
                            casesMap[alternate_li] = alternate.body;
                        }
                    })
                }
            } else {
                // 不是自执行函数类型的
                let mi = 0;
                let Ci = 0;
                let li = mi_Ci_di2li(mi, Ci, di);
                let length = 0;
                if (!types.isBreakStatement(consequent[consequent.length - 1])) {
                    length = consequent.length;
                } else {
                    length = consequent.length - 1;
                }
                casesMap[li] = consequent.slice(0, length);
            }
        }
        let newCases = [];
        for (let caseTest in casesMap) {
            let body = casesMap[caseTest];
            body = body.concat([types.BreakStatement()]);
            newCases.push(types.SwitchCase(
                types.NumericLiteral(parseInt(caseTest)),
                body
            ))
        }
        let SwitchNode = types.SwitchStatement(
            types.Identifier("li"),
            newCases
        )
        path.replaceWith(SwitchNode);
        path.stop();
    }
}

let convertSequenceVisitor = {
    "SequenceExpression": function (path) {
        if (!path.parentPath.isExpressionStatement()) {
            return
        }
        let {expressions} = path.node;
        let exps = [];
        expressions.forEach(e => {
            exps.push(types.ExpressionStatement(e));
        })
        path.replaceWithMultiple(exps);
    }
}

// li = ali227_175 ? 24322 : 15200;
let convertAssignConditionVisitor = {
    "AssignmentExpression": function (path) {
        if (!path.parentPath.isExpressionStatement()) {
            return
        }
        let {left, right, operator} = path.node;
        if (!types.isConditionalExpression(right)) {
            return;
        }
        let newNode = types.IfStatement(
            right.test,
            types.BlockStatement([types.ExpressionStatement(types.AssignmentExpression(operator, left, right.consequent))]),
            types.BlockStatement([types.ExpressionStatement(types.AssignmentExpression(operator, left, right.alternate))]),
        );
        path.parentPath.replaceWith(newNode);
    }
}

// 有很多 mi > 0 && __ 的地方，实际上mi的值是 >= 0的，并且任意case处的mi值是已知的
let remove_miVisitor = {
    "LogicalExpression": function (path) {
        let {left, right, operator} = path.node;
        if (operator !== "&&" || !path.parentPath.isExpressionStatement()) {
            return
        }
        if (!types.isBinaryExpression(left) || left.left?.name !== "mi" || left.operator !== ">" || !types.isNumericLiteral(left.right)) {
            return;
        }
        let parentCase = path.findParent(p => {
            return p.isSwitchCase();
        })
        let li = parentCase.node.test.value;
        let ali227_224 = li >> 5;
        let mi = 31 & ali227_224 >> 5;
        if (mi > left.right.value) {
            path.replaceWith(right);
        } else {
            console.log("难不成真有为false的地方？")
        }
    }
}

// 获取所有节点 path 和 对应 value 的一个映射，方便后续处理
let allCasesMap = {};
let allCaseMapVisitor = {
    "SwitchCase": function (path) {
        let funcParent = path.findParent(p => {
            return p.isFunctionDeclaration();
        })
        if (funcParent.node.id.name !== mainFuncName) {
            return;
        }
        if (!allCasesMap[mainFuncName]) {
            allCasesMap[mainFuncName] = [];
        }
        let {test} = path.node;
        allCasesMap[mainFuncName][test.value] = path;
    }
}


let graphPaths = [];
let genGraphVisitor = {
    "SwitchStatement": function (path) {
        let funcParent = path.findParent(p => {
            return p.isFunctionDeclaration();
        })
        if (funcParent.node.id.name !== mainFuncName) {
            return;
        }
        path.scope.traverse(path.scope.block, {
            "AssignmentExpression": function (subPath) {
                if (subPath.node.left.name !== "li") {
                    return;
                }
                if (!types.isNumericLiteral(subPath.node.right)) {
                    return;
                }
                let parentCasePath = subPath.findParent(p => {
                    if (!p.isSwitchCase()) {
                        return false;
                    }
                    let ppFuncParent = p.findParent(pp => {
                        return pp.isFunctionDeclaration();
                    })
                    if (ppFuncParent.node.id.name !== mainFuncName) {
                        return false;
                    }
                    return true;
                })
                let curCaseValue = parentCasePath.node.test.value;
                let nextValue = subPath.node.right.value;
                // graphPaths.push(`NODE_${curCaseValue} -> NODE_${nextValue};`);
                graphPaths.push({
                    "cur": curCaseValue,
                    "next": nextValue
                })
            }
        })

    }
}

// 科学计数法转普通数字 1e3 -> 1000
let convert1e3To1000Visitor = {
    "NumericLiteral": function (path){
        delete path.node.extra;
    }
}

traverse(ast, renameVisitor);
traverse(ast, deleteVoidVisitor);
traverse(ast, ensureBlockVisitor);
traverse(ast, convertConditionalToIfVisitor);
traverse(ast, assignEqualConditionVisitor);
traverse(ast, convertCase_if2CaseVisitor);
traverse(ast, convertSequenceVisitor);
traverse(ast, convertAssignConditionVisitor);
traverse(ast, convert1e3To1000Visitor);


// 后面是针对性处理
traverse(ast, remove_miVisitor);
traverse(ast, assignEqualConditionVisitor);
traverse(ast, convertAssignConditionVisitor)
traverse(ast, convertSequenceVisitor);
traverse(ast, convertAssignConditionVisitor)


traverse(ast, allCaseMapVisitor);


// // 直接合并也有问题，先生成一个图看看
// // 生成一个跳转的图看看
// traverse(ast, genGraphVisitor);
//
// // 简单做下统计
// let prevStatics = {};
// for (let item of graphPaths) {
//     if (!Object.keys(prevStatics).includes(item["next"] + "")) {
//         prevStatics[item["next"]] = {};
//         prevStatics[item["next"]].prev = new Set();
//     }
//     prevStatics[item.next].prev.add(item["cur"]);
// }
// for (let key of Object.keys(prevStatics)) {
//     let value = prevStatics[key];
//     if (value) {
//         prevStatics[key].prev = Array.from(prevStatics[key].prev)
//     }
// }
//
// fs.writeFileSync("./prevStatics.json", JSON.stringify(prevStatics), {encoding: "utf8"});
//
// let nextStatics = [];
// for (let key of Object.keys(prevStatics)) {
//     let value = prevStatics[key];
//     for (let v of value.prev) {
//         if (!nextStatics[v]) {
//             nextStatics[v] = [];
//         }
//         nextStatics[v].push(Number(key));
//     }
// }
//
// let chains = [];
// // 能合并的节点应该满足
// // 1. 起始点的满足
// //    a. 如果前驱数量大于1，那么后继数量必须为1
// //    b. 如果前驱数量为1，那么前驱的后继数量必须大于1
// //    c. 如果前驱数量为0，那么后继数量必须为1
// // 2. 终止点满足
// //    a. 后继节点的前驱数量大于1
// //    b. 后继数量大于1
// //    c. 后继数量为0
// for (let key of Object.keys(prevStatics)) {
//     let cur = prevStatics[key];
//     if (cur.prev.length === 1) {
//         if (nextStatics[cur.prev[0]].length < 2) {
//             continue
//         }
//     } else if (cur.prev.length > 1) {
//         if (nextStatics[key]?.length !== 1) {
//             continue
//         }
//     } else {
//         if (nextStatics[key]?.length !== 1) {
//             continue
//         }
//     }
//     cur = Number(key);
//     let chain = [];
//     chain.push(cur);
//     while (true) {
//         let next = nextStatics[cur];
//         if (!next) {
//             chains[chain[0]] = chain;
//             break;
//         }
//         if (next.length > 1) {
//             chains[chain[0]] = chain;
//             break;
//         }
//         if (next.length === 0) {
//             chains[chain[0]] = chain;
//             break;
//         }
//         if (prevStatics[next[0]].prev.length > 1) {
//             chains[chain[0]] = chain;
//             break;
//         }
//         cur = next[0];
//         chain.push(cur);
//     }
// }
// for (let index = 0; index < chains.length; index++) {
//     if (chains[index]?.length === 1) {
//         chains[index] = null;
//     }
// }
//
// // 根据生成的chains合并节点
// function mergeChains() {
//     for (let chain of chains) {
//         if (!chain) {
//             continue
//         }
//         let start = chain[0];
//         let startPath = allCasesMap[mainFuncName][start];
//         let startNode = startPath.node;
//         let breakPath = startPath.get(`consequent.${startNode.consequent.length - 1}`);
//         let exps = [];
//         for (let i = 1; i < chain.length; i++) {
//             let thisPath = allCasesMap[mainFuncName][chain[i]];
//             let thisNode = thisPath.node;
//             let thisBlock;
//             if (types.isBreakStatement(thisNode.consequent[thisNode.consequent.length - 1])) {
//                 thisBlock = thisNode.consequent.slice(0, thisNode.consequent.length - 1);
//             } else {
//                 thisBlock = thisNode.consequent;
//             }
//             exps = exps.concat(thisBlock);
//             thisPath.remove();
//         }
//         for (let node of exps) {
//             breakPath.insertBefore(node);
//         }
//     }
// }
//
// // mergeChains()
//

console.log(mainFuncName)
let code = generator(ast).code;

fs.writeFileSync(__dirname + "/after.js", code, {encoding: "utf8"})

// fs.writeFileSync("./graph.json", JSON.stringify(graphPaths), {encoding: "utf8"});
