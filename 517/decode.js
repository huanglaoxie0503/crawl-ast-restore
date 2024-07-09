const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
generator = require("@babel/generator").default;
const parser = require("@babel/parser");
const fs = require("fs");
const { log } = require("console");

let src = fs.readFileSync(__dirname + "/before.js", {encoding: "utf8"})

let ast = parser.parse(src);

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

function _0x5325(_0x419e75, _0x325a9b) {
  var _0x5909d0 = _0x5909();
  return _0x5325 = function (_0x5325de, _0x4f8f32) {
    _0x5325de = _0x5325de - 421;
    var _0xdda3cc = _0x5909d0[_0x5325de];
    return _0xdda3cc;
  }, _0x5325(_0x419e75, _0x325a9b);
}
(function (_0x7d73af, _0x30ec) {
  var _0x271b5f = _0x5325,
    _0x33c18e = _0x7d73af();
  while (!![]) {
    try {
      var _0x2fec50 = -parseInt(_0x271b5f(426)) / 1 * (-parseInt(_0x271b5f(427)) / 2) + parseInt(_0x271b5f(428)) / 3 + -parseInt(_0x271b5f(423)) / 4 + -parseInt(_0x271b5f(422)) / 5 + -parseInt(_0x271b5f(425)) / 6 * (-parseInt(_0x271b5f(430)) / 7) + -parseInt(_0x271b5f(429)) / 8 * (-parseInt(_0x271b5f(432)) / 9) + -parseInt(_0x271b5f(421)) / 10;
      if (_0x2fec50 === _0x30ec) break;else _0x33c18e["push"](_0x33c18e["shift"]());
    } catch (_0x4684f4) {
      _0x33c18e["push"](_0x33c18e["shift"]());
    }
  }
})(_0x5909, 300752);
function _0x5909() {
  var _0x5cfa3c = ["730ffyUJR", "1244YcRxAs", "684285ziYcKv", "40vkcCrI", "7sVLHWJ", "Hello World!", "514341nunswP", "3628440doEyiA", "2450460hvRvll", "693852yhSJLB", "hgrGj", "2155506KTLjvC"];
  _0x5909 = function () {
    return _0x5cfa3c;
  };
  return _0x5909();
}

var _0x2c2499 = _0x5325;

let _0x2c2499Visitor = {
   "CallExpression": function(path){
       let node = path.node;
       if(node.callee.name !== "_0x2c2499"){
          return
       }
       let value = node.arguments[0].value;
       let res = _0x2c2499(value);
       let newNode = types.StringLiteral(res);
       path.replaceWith(newNode);
       path.scope.crawl();
   }
}

let _0xe3ca9Visitor = {
    "MemberExpression": function(path){
        let node = path.node;
        if(node.object.name !== "_0xe3ca9"){
           return
        }
        // let scope = path.scope;
        // let binding = scope.getBinding("_0xe3ca9");
        // let obj = binding.path.evaluate().value;
        let parentFunc = path.findParent(p=>{
          return p.isFunctionDeclaration();
        })
        let scope = parentFunc.scope;
        let obj;
        scope.traverse(scope.block, {
          "VariableDeclarator": function(subPath){
            let subNode = subPath.node;
            if(subNode.id.name !== "_0xe3ca9"){
              return
            }
            let init = node.init;
            let initPath = subPath.get("init");
            obj = initPath.evaluate().value;
            path.stop();
          }
        })
      let key = node.property.value;
      let value = obj[key];
      path.replaceWith(types.StringLiteral(value));
      path.scope.crawl();
    }
}


let deadCodeVisitor = {
  "Identifier": function(path){
    let node = path.node;
    let scope = path.scope;
    let binding = scope.getBinding(node.name);
    if(binding && binding.constant && binding.references === 0){
        console.log(path.node.name);
        if(path.parentPath.isFunctionDeclaration() || path.parentPath.isFunctionExpression()){
            return
        }
        if (path.parentPath.isCatchClause()){
            return;
        }
        path.parentPath.remove();
        // path.scope.crawl();
    }
  }
}


traverse(ast, literalVisitor);
traverse(ast,_0x2c2499Visitor );
traverse(ast, _0xe3ca9Visitor);
traverse(ast, deadCodeVisitor);

let code = generator(ast).code;

fs.writeFileSync(__dirname + "/after.js", code, {encoding: "utf8"})
