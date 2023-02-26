const ObjectID = require('mongodb').ObjectID
var mongo = require("../modules/DBManager");

function a(colleciton, query, proyeccion) {

    mongo.queryFind(colleciton, query, proyeccion, function(err, data) {
        if (err) {
            console.log("error: " + data);
        } else {
            // console.log(Object.keys(data[0].evento_datos))
            //console.log(data[0].evento_datos.hora);
            console.log(data)

        }
    });
}

var query = { _id: ObjectID("5d5ad3ccdcd5d9d51143761d") };
a("solicitudes", query, {});