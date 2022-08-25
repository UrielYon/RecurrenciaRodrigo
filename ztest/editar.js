var mongo = require("../modules/DBManager");
const { ObjectId } = require('mongodb');

var a = {};
var b = { nombre: "rodrigo" };
var c = { x: "12312" };
a["hola"] = b;
a["registro"] = b
a["registro"]["g"] = b

console.log(a);