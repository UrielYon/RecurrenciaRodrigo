var mongo = require("../modules/DBManager");
const { ObjectId } = require('mongodb');

function changeStatus(id_evento, datos, user) {

    var query = { _id: ObjectId(id_evento) }
        // var data = { "registro": { "nombre": "profesor 0", "fecha": new Date(2019, 08, 15), "status": 10 }, "datos_profesores": { "nombre": "karim  rivera Paz", "cargo": "estudiante", "area": " computer since", "institucion": "UNAM", "telefono": "55 47 71 11 76", "correo": "santiago@ciencias.unam.mx" }, "evento_tipo": { "tipo": 1, "descripcion": "temporarl vmaos hacer algo " }, "evento_datos": { "id_espacio": 1, "espacio": "Auditorio Alberto Barajas", "nombre": "ejemplo1", "fecha": new Date(2019, 08, 22), "asisitentes": 25, "tipo": "publico", "pagina": "www.saniiago.com.mx" }, "evento_servicios": { "microfono_Inalambrico": 1, "microfono_Alambrico": 2, "solapa": 1, "proyetor_Video": 1, "computadora": 1, "internet": 1, "internet_Alambrico": 1, "videoconferencia": 1, "pódium": 1, "camaras": 3, "dvd": 1, "bocinas": 1, "lugares_dicapacitados": 3, "grabra": true, "difundir": false, "coffeebreak": true } }

    mongo.queryFind("solicitudes", query, {}, function(err, data) {
        if (err) {
            console.log(data);
        } else {
            //console.log(data[0].registro.status);
            //var temp = JSON.parse(data[0]);
            console.log("++++++++++++++++" + datos)
            data[0] = datos;
            data[0]["registro"] = {};
            data[0]["registro"]["movimiento"] = user;
            mongo.queryUpdate("solicitudes", query, data[0], function(err, data) {
                if (err) {
                    console.log("errror " + data)
                } else {
                    console.log("exito" + data)
                }
            });
        }
    });
}
//registro.status
changeStatus("5d558fa8161aa53139a5744a", { "registro": { "nombre": "profesor 0", "fecha": new Date(2019, 08, 15), "status": 10 }, "datos_profesores": { "nombre": "karim  rivera Paz", "cargo": "estudiante", "area": " computer since", "institucion": "UNAM", "telefono": "55 47 71 11 76", "correo": "santiago@ciencias.unam.mx" }, "evento_tipo": { "tipo": 1, "descripcion": "temporarl vmaos hacer algo " }, "evento_datos": { "id_espacio": 1, "espacio": "Auditorio Alberto Barajas", "nombre": "ejemplo1", "fecha": new Date(2019, 08, 22), "asisitentes": 25, "tipo": "publico", "pagina": "www.saniiago.com.mx" }, "evento_servicios": { "microfono_Inalambrico": 1, "microfono_Alambrico": 2, "solapa": 1, "proyetor_Video": 1, "computadora": 1, "internet": 1, "internet_Alambrico": 1, "videoconferencia": 1, "pódium": 1, "camaras": 3, "dvd": 1, "bocinas": 1, "lugares_dicapacitados": 3, "grabra": true, "difundir": false, "coffeebreak": true } }

    , "sanitago");