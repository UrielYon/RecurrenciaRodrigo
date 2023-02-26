const MongoClient = require('mongodb').MongoClient;
var DBManager = require('../modules/DBManager.js');
const Config = require('../config.json');



/**
 * se crea una reservacion 
 * con el nombre de quien lo reserva 
 * @param {*} resarvacion 
 */
function setReservacion(id, date, callback) {
    const firm = "[profesor::setReservacion] ";
    temp = {
        auditorio: id,
        fecha: date,
        horas: [10, 11, 17, 19],
        nombre: "rodrigo",
        numCuentas: 310123456789,
        fechaRegistro: new Date(),
    }
    console.log(firm + temp)
    DBManager.insertSolicitud(temp, function(err, data) {
        if (err) {
            console.log(data);
            callback(true, data)
        } else {
            console.log(firm + "inserto bien ");
            callback(false, data);
        }
    });

}


/**
 * 
 * @param {*} idAuditorio 
 * @param {*} fecha 
 * @param {*} stutus [] arreglo de todos 
 * si no existen elementos regresa error 
 */
function gethoras(idAuditorio, fecha, status) {
    const coleccion = Config.solicitudes;
    const query = { $and: [{ "evento_datos.id_espacio": 1 }, { $or: [{ "registro.status": 11 }, { "registro.status": 10 }, ] }, { "evento_datos.fecha": new Date(2019, 08, 16) }] }
    const proyeccion = { "evento_datos.hora": 1 };
    mongo.queryFind(coleccion, query, proyeccion, function(err, data) {
        if (err) {
            console.log("error: " + data);
        } else {
            //console.log(Object.keys(data[0].evento_datos))
            //console.log(data[0].evento_datos.hora);
            var horas = [];
            data.forEach(evento => {
                //console.log("aula " + evento)
                evento.evento_datos.hora.forEach(h => {
                    //console.log("horas " + h)
                    horas.push(h);
                });
            });
            console.log(horas);
        }
    });
}





module.exports.getCalendario = getCalendario;
module.exports.setReservacion = setReservacion;