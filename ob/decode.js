const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
generator = require("@babel/generator").default;
const parser = require("@babel/parser");
const fs = require("fs");

let src = fs.readFileSync(__dirname + "/before.js", {encoding: "utf8"})

let ast = parser.parse(src);

let visitor = {

}

traverse(ast, visitor);

let code = generator(ast).code;

fs.writeFileSync(__dirname + "/after.js", code, {encoding: "utf8"})
