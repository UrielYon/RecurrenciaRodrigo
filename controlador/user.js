//const { ObjectId } = require('mongodb');
//const Config = require('./config/config.json');
var format = require('date-format');
var DBManager = require('../modules/DBManager.js');
var ObjectID = require('mongodb').ObjectID;
const {
    generarHTML,
    asunto
} = require('../config/correo.js');
const {
    enviar
} = require('../modules/Mail.js');

/**
 *Obetner la informacion de un evento
 * @param {*} id 
 * @param {*} callback 
 */
function getEvento(id, callback) {
    const firm = "[Controlador:getEvento] ";
    var query = {
        _id: ObjectID(id)
    };
    //console.log(firm+query)
    DBManager.queryFind("solicitudes", query, {}, function (err, data) {
        if (err) {
            console.log("error: " + data);
            callback(true, data)
        } else {
            //console.log(data)
            callback(false, data)
        }
    });
}
/*****************************************
 ** Limpio  
 *****************************************/

/**
 * Modifica el status de el evento 
 * verifica el evento si existe 
 * cambia el stauts 
 * @param {*} id_evento 
 * @param {*} status 
 * @param {*} user 
 */
function changeStatus(id_evento, status, user, tipo, callback) {
    const firm = "[User:changeStatus] ";
    console.log(firm + id_evento, status, user + " tipo" + tipo);
    var query = {
        _id: ObjectID(id_evento)
    };
    var json = {};

    var tipoStatus = (tipo == 0 ? 20 : 15);
    console.log(firm + "tipo usuario:" + tipo + " se cambia[" + tipoStatus + "]")
    //busca el evento 
    DBManager.queryFind("solicitudes", query, {}, function (err, data) {
        if (err) {
            console.log(firm + " error-------" + data);
            json["code"] = 400;
            json["descripcion"] = "Error conexion base de datos";
            callback(true, json)
        } else {

            var query = {
                _id: ObjectID(id_evento)
            };
            data[0].registro.status = tipoStatus;
            data[0].registro["movimiento"] = user;

            var tempQuery = {
                $and: [{
                    //"registro.status": tipoStatus
                    $or: [{ "registro.status": 15 }, { "registro.status": 20 }]
                },
                {
                    "evento_datos.id_espacio": data[0].evento_datos.id_espacio
                },
                {
                    "evento_datos.fecha": data[0].evento_datos.fecha
                }
                ]
            };
            var tempProyeccion = {};
            console.log(firm + " modificacion :", tempQuery);
            // Obtiene eventos que sean el mismo dia y con la misma fecha 
            DBManager.queryFind("solicitudes", tempQuery, tempProyeccion, function (err, posible) {
                if (err) {
                    console.log("error conexion base de datos ");
                } else {
                    console.log("posibles :",posible)
                    var indice = posible.findIndex(i => i._id == id_evento); // obtenemos el indice
                    console.log(firm + " indice: ", indice)
                    if (indice != -1) {
                        posible.splice(indice, 1)
                    }

                    console.log(firm + "obtener eventos mismo dia " + posible.length);
                    if (posible.length == 0) { // esta libre ese dia 
                        console.log("no! hay elemntos");
                        DBManager.queryUpdate("solicitudes", query, data[0], function (err, data) {
                            if (err) {
                                console.log(firm + " Error al actualizar");
                                json["code"] = 400;
                                json["descripcion"] = "Error al actualizar";
                                callback(true, json)
                            } else {
                                console.log(firm + "Se actualizo correctamente");
                                json["code"] = 200;
                                json["descripcion"] = "Se actualizo correctamente";
                                callback(false, json)
                            }
                        });
                    } else {
                        var tempExiste = existe(data[0], posible); // verifica si chocan con  el mismo horario 

                        if (tempExiste) {

                            console.log("hay 1 evento con el horario similiar");
                            json["code"] = 400;
                            json["descripcion"] = "Hay 1 evento con el horario similar";
                            callback(false, json)
                        } else {
                            console.log("no! hay elemntos");
                            DBManager.queryUpdate("solicitudes", query, data[0], function (err, data) {
                                if (err) {
                                    json["code"] = 400;
                                    json["descripcion"] = "Error al actualizar";
                                    callback(true, json)
                                } else {
                                    console.log(firm + "Se actualizo correctamente");
                                    json["code"] = 200;
                                    json["descripcion"] = "Se actualizo correctamente";
                                    callback(false, json)
                                }
                            });
                        }
                    }
                }
            });
        }
    });
}

/**
 * auxiliar de changeStatus
 * vefifica que las horas esten contenidos en los eventos 
 * si no esta el evento  se puede realizar 
 * @param {*} horas  hora valida 
 * @param {*} posibles evetnos con horas disponibles
 */
function existe(horas, posibles) {
    const firm = "[User::existe]";
    console.log(firm + " posibles", posibles.length);
    var temp = false;
    posibles.forEach(evento => {
        //console.log(evento);
        evento.evento_datos.hora.forEach(hora => {
            //console.log("h= " + hora)
            horas.evento_datos.hora.forEach(cambio => {
                //console.log("h " + hora + "== " + cambio)
                if (hora == cambio) {
                    //console.log("son iguales");
                    temp = true;
                }
            });
        });
    });
    console.log("regresa " + temp)
    return temp;
};

/**
 * actualiza un evento 
 * @param {*} id_evento id de el evento 
 * @param {*} datos json con los datos nuevos 
 * @param {*} user el usuario quien hizo el movimiento 
 */
function updateEvento(id_evento, datos, user, callback) {
    const firm = "[User:updateEvento] ";
    console.log(firm + id_evento)
    var json = {};
    var query = {
        _id: ObjectID(id_evento)
    };
    DBManager.queryFind("solicitudes", query, {}, function (err, data) {
        if (err) {
            console.log(data);
        } else {
            //console.log(firm + "viejo : " + JSON.stringify(data[0]));
            //console.log("------------------");
            var id = data[0]._id;
            var registro = data[0].registro.nombre;
            var fecha = data[0].registro.fecha;
            var status = data[0].registro.status;
            data[0] = datos;
            data[0]["_id"] = id;
            data[0]["registro"] = {};
            data[0]["registro"]["nombre"] = registro;
            data[0]["registro"]["fecha"] = new Date(fecha);
            data[0]["registro"]["status"] = status;
            data[0]["registro"]["fechaModificacion"] = new Date();
            data[0]["registro"]["modifico"] = user;
            data[0].evento_datos.id_espacio = parseInt(data[0].evento_datos.id_espacio);
            data[0].evento_datos.fecha = new Date(datos.evento_datos.fecha);
            //data[0].evento_datos.id_espacio = parseInt(datos.evento_datos.id_espacio);
            //console.log(firm + "nuevo : " + JSON.stringify(data[0]));

            let html = generarHTML(datos, asunto[1].mensaje);

            // DBManager.queryUpdate("solicitudes", query, data[0], function (err, data) {
            //     if (err) {
            //         console.log("error insertar base de datos " + data)
            //         json["status"] = 500;
            //         json["descripcion"] = "Error al aculizar el evento";
            //         callback(false, json)
            //     } else {
            //         console.log("exito" + JSON.stringify(data));
            //         json["status"] = 200;
            //         json["descripcion"] = "Se actualizo Correctamente ";
            //         callback(false, json);
            //     }
            // });
            enviar(datos.datos_profesores.correo, html, asunto[1].asunto, function (err, resp) {
                if (err) {
                    json["code"] = 500;
                    json["descripcion"] = "Error al Enviar el correo no se guardo el Registro";
                    callback(true, json);
                } else {
                    console.log(firm + "nuevo : " + JSON.stringify(data[0]));
                    DBManager.queryUpdate("solicitudes", query, data[0], function (err, data) {
                        if (err) {
                            console.log("error insertar base de datos " + data)
                            json["status"] = 500;
                            json["descripcion"] = "Error al aculizar el evento";
                            callback(false, json)
                        } else {
                            console.log("exito" + JSON.stringify(data));
                            json["status"] = 200;
                            json["descripcion"] = "Se actualizo Correctamente ";
                            callback(false, json);
                        }
                    });
                }
            })
        }
    });
}

/**
 * Obetener los eventos de auditorios de una fecha inico 
 * y fecha fin con un estautus 
 * regresa valores los valores 
 * 
 * @param {*} fecha_inicio date
 * @param {*} fecha_fin date  
 * @param {*} auditorios [] un arreglo
 * @param {*} status  un arreglo 
 */

function getEventos(fecha_inicio, fecha_fin, auditorios, status, callback) {
    const firm = "[User:getEventos] ";
    var json = {};
    var query = {
        $and: [{
            "evento_datos.fecha": {
                $gte: new Date(fecha_inicio)
            }
        },
        {
            "evento_datos.fecha": {
                $lte: new Date(fecha_fin)
            }
        }
        ]
    }
    var temSatus = {
        $or: []
    };
    var tempAuditorios = {
        $or: []
    };
    //agrega a el query  los auditorios 
    for (let i = 0; i < auditorios.length; i++) {
        //console.log(auditorios[i] + "");
        var t = {
            "evento_datos.id_espacio": auditorios[i]
        }
        tempAuditorios.$or.push(t);
    }
    //console.log(firm + status)
    // agrega a el query que tipo de status 
    for (let i = 0; i < status.length; i++) {
        var t = {
            "registro.status": status[i]
        }
        temSatus.$or.push(t);
    }
    query.$and.push(temSatus);
    //console.log(query);
    query.$and.push(tempAuditorios);
    console.log(firm + "query: " + JSON.stringify(query));
    DBManager.queryFind("solicitudes", query, {}, function (err, data) {
        if (err) {
            console.log("error " + data);
            json = {
                code: 400,
                descripcion: "Error conexion de base de datos"
            }
            callback(true, json);
        } else {
            console.log(firm + data.length);
            if (data.length == 0) {
                json = {
                    code: 400,
                    descripcion: "no hay elementos"
                }
                callback(false, json);
            } else {
                //console.log(firm + "tamaño: " + data.length)
                json = {
                    code: 200,
                    descripcion: formato(data)
                }
                callback(false, json);
            }
        }
    });
}

/**
 * Obtine los datos y le da formato para (mostrar Tabla )
 * @param {*} data  fecha incio, fecha fin, auditorios
 * @param {*} callback 
 */
function getReportesIndicadores(fecha_inicio, fecha_fin, auditorios, callback) {
    const firm = "[User:getReportesIndicadores] ";
    var json = {};
    var query = [{
        $match: {
            "registro.status": 20
        }
    },
    {
        $match: {
            $and: [{
                "evento_datos.fecha": {
                    $gte: new Date(fecha_inicio),
                    $lte: new Date(fecha_fin)
                }
            }]
        }
    },
    {
        $group: {
            _id: "$evento_tipo",
            suma: { $sum: "$evento_datos.asisitentes" },
            count: {
                $sum: 1
            }
        }
    }

    ]



    //agrega a el query  los auditorios 
    var tempAuditorios = {
        $or: []
    };
    for (let i = 0; i < auditorios.length; i++) {
        //console.log(auditorios[i] + "");
        var t = {
            "evento_datos.id_espacio": auditorios[i]
        }
        tempAuditorios.$or.push(t);
    }
    // query.$and.push(tempAuditorios);
    console.log(firm + "query: " + JSON.stringify(query));
    DBManager.aggregate('solicitudes', query, function (err, data) {
        if (err) {
            console.log(firm + " erroe: " + JSON.stringify(data));
            json["code"] = 400;
            json["descripcion"] = "Erro conexion de base de datos ";
        } else {
            //console.log(firm + " exito: ", data);
            if (data.length > 0) {
                json["code"] = 200;
                json["descripcion"] = data //formato(data);
                callback(false, json);
            } else {
                json["code"] = 400;
                json["descripcion"] = "No hay elementos";
                callback(true, json);
            }
        }
    });
}


function formato(data) {
    var lista = []
    //console.log(data)
    data.forEach(element => {
        //console.log(Object.keys(element))
        var temp = {
            recid: element._id,
            nombre: element.datos_profesores.nombre,
            correo: element.datos_profesores.correo,
            telefono: element.datos_profesores.telefono,
            fecha: formatoFechas(new Date(element.evento_datos.fecha)),
            nombre_evento: element.evento_datos.nombre,
            auditorio: element.evento_datos.auditorio,
            nombre_Registro: element.registro.nombre,
            tipo: element.evento_tipo.nombre,
            horas: element.evento_datos.hora,
            //servicios: formatoServicios(element.servicios.cantidad, element.servicios.check),
            ///status: element.registro.status,
        }
        lista.push(temp)
        //console.log(element);
    });
    return lista;
}

/**
 * Le formato de la fecha
 * @param {*} date fehca 
 */
function formatoFechas(date) {
    var temp = date.toISOString().split("T")[0].split("-");
    var fecha = temp[2] + "-" + temp[1] + "-" + temp[0];
    return fecha;
}

/**
 * Da formato a los servicios quita _
 * @param {*} check 
 * @param {*} cantidad 
 */
function formatoServicios(check, cantidad) {
    var x = Object.keys(check);
    //console.log("formato " + check + " cantidad: " + cantidad)
    var servicios = "";
    for (let i = 0; i < x.length; i++) {
        servicios += x[i] + " = " + check[x[i]] + ", \n";
    }
    var y = Object.keys(cantidad);
    for (let i = 0; i < y.length; i++) {
        //console.log(cantidad[y[i]])
        if (cantidad[y[i]] == true) {
            //console.log(y[i])
            servicios += y[i] + " = si \n";
        }
    }
    return servicios;
}

/**
 * busca si el correo existe regresa el json de el correo 
 * @param {*} correo 
 */
function existeCorreo(correo, callback) {
    const firm = "[User:existeCorreo] ";
    var query = {
        correo: correo
    };
    //console.log(firm + correo)
    DBManager.queryFind("user", query, {
        correo: 1,
        tipo: 1
    }, function (err, data) {
        if (err) {
            callback(true, data);
        } else {
            callback(false, data[0]);
        }
    });

}

/**
 * ejeucta una consulta donde agrupa los eventos por los mas usados por el mes
 * @param {*} fecha 
 */
function getReporteAuditoriosCapacidad(fechaI, fechaF, callback) {
    const firm = "[User:getReporteAuditoriosCapacidad] ";
    var dateI = new Date(fechaI);
    var dateF = new Date(fechaF);
    // dateI.setDate(1);
    // dateF.setMonth((dateI.getMonth() + 1));
    // dateF.setDate(0);
    var query = [{
        $match: {
            'evento_datos.fecha': {
                $gte: dateI, //new Date('2019-09-01'),
                $lte: dateF, //new Date('2019-09-30')                    
            },
            'registro.status': 20
        }
    },
    {
        $group: {
            _id: {
                auditorio: '$evento_datos.auditorio'
            },
            count: {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            '_id.auditorio': 1
        }
    }
    ];
    console.log(firm + query)
    DBManager.aggregate("solicitudes", query, function (err, data) {
        if (err) {
            var json = {
                code: 400,
                descripcion: data
            }
            callback(json);
        } else {
            //console.log(firm + " distintos= " + data.length)
            if (data.length > 0) {
                var json = {};
                data.forEach(element => {
                    //console.log(element);
                    json[element._id.auditorio] = element.count;
                });
                callback(json);
            } else {
                var json = {
                    code: 400,
                    descripcion: "no hay datos"
                }
                callback(json);
            }
        }
    });
}


/**
 * obtiene que tipo de evento mas aceptado 
 */
function getReporteTipo(fechaI, fechaF, callback) {
    const firm = "[User:getReportTipo] ";
    var dateI = new Date(fechaI);
    var dateF = new Date(fechaF);
    // dateI.setDate(1);
    // dateF.setMonth((dateI.getMonth() + 1));
    // dateF.setDate(0);
    var json = {};
    var query = [{
        $match: {
            'evento_datos.fecha': {
                $gte: dateI, //new Date('2019-09-01'),
                $lte: dateF, //new Date('2019-09-30') 
            },
            'registro.status': 20
        }
    },
    {
        $group: {
            _id: {
                tipo: '$evento_tipo.nombre'
            },
            count: {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            "count": -1
        }
    }
    ];
    console.log(firm + query)
    DBManager.aggregate("solicitudes", query, function (err, data) {
        if (err) {
            //console.log()
        } else {
            //console.log(firm + data.length)

            if (data.length > 0) {
                var json = {};
                data.forEach(element => {
                    //console.log(element);
                    json[element._id.tipo] = element.count;
                });
                callback(json);
            } else {

                var json = {
                    code: 400,
                    descripcion: "no hay datos"
                }
                callback(json);
            }
            //callback(data);
            //callback(true, data);
        }
    });
}


/**
 * crea un reporte general 
 */
function reporte(fechaI, fechaF, callback) {
    const firm = "[User:reporte] ";
    var json = {};
    var masUsado = null;
    console.log(firm + fechaI + ":::::" + fechaF);
    getReporteAuditoriosCapacidad(fechaI, fechaF, function (data) {
        getReporteTipo(fechaI, fechaF, function (data1) {
            console.log(data);
            console.log(data1);
            json["grup"] = data;
            json["tipo"] = data1;
            callback(false, json);
        })
    });
}


/**
 * elimina un evento por su id 
 */
function deleteEvento(id, callback) {
    const firm = "[User:deleteEvento] ";
    var json = {};
    var query = {
        _id: ObjectID(id)
    };
    console.log(firm, query)


    DBManager.queryFind("solicitudes", query, {}, function (err, data) {
        if (err) {
            console.log(firm, "error buscar: ", data);
            json["code"] = 500;
            json["descripcion"] = "Error al consultar Evento";
            callback(true, json);
        } else {
            console.log(firm, data.length)
            if (data.length > 0) {

                let html = generarHTML(data[0], asunto[2].mensaje);
                // DBManager.queryDelete("solicitudes", query, function (err, data) {
                //     if (err) {
                //         console.log(firm + "error_: " + data);
                //         json["status"] = 500;
                //         json["descripcion"] = "error al eliminar evento ";
                //         callback(true, json);
                //     } else {
                //         console.log(firm + "exito " + data);
                //         json["status"] = 200;
                //         json["descripcion"] = "Se elimino con exito ";
                //         callback(false, json);
                //     }
                // });
                enviar(data[0].datos_profesores.correo, html, asunto[2].asunto, function (err, resp) {
                    if (err) {
                        json["code"] = 500;
                        json["descripcion"] = "Error al Enviar el correo";
                        callback(true, json);
                    } else {

                        DBManager.queryDelete("solicitudes", query, function (err, data) {
                            if (err) {
                                console.log(firm + "error_: " + data);
                                json["status"] = 500;
                                json["descripcion"] = "error al eliminar evento ";
                                callback(true, json);
                            } else {
                                console.log(firm + "exito " + data);
                                json["status"] = 200;
                                json["descripcion"] = "Se elimino con exito ";
                                callback(false, json);
                            }
                        });
                    }
                });

            } else {
                json["status"] = 500;
                json["descripcion"] = "error no se encontro el evento ";
                callback(true,)
            }

            //console.log(html);
        }
    });
}

/**
 * elimina un evento por su id 
 */
function deleteEventoDB(id, callback) {
    const firm = "[User:deleteEvento] ";
    var json = {};
    var query = {
        _id: ObjectID(id)
    };
    console.log(firm, query)


    DBManager.queryFind("solicitudes", query, {}, function (err, data) {
        if (err) {
            console.log(firm, "error buscar: ", data);
            json["code"] = 500;
            json["descripcion"] = "Error al consultar Evento";
            callback(true, json);
        } else {
            console.log(firm, data.length)
            if (data.length > 0) {

                let html = generarHTML(data[0], asunto[2].mensaje);
                DBManager.queryDelete("solicitudes", query, function (err, data) {
                    if (err) {
                        console.log(firm + "error_: " + data);
                        json["status"] = 500;
                        json["descripcion"] = "error al eliminar evento ";
                        callback(true, json);
                    } else {
                        console.log(firm + "exito " + data);
                        json["status"] = 200;
                        json["descripcion"] = "Se elimino con exito ";
                        callback(false, json);
                    }
                });
                enviar(data[0].datos_profesores.correo, html, asunto[2].asunto, function (err, resp) {
                    if (err) {
                        json["code"] = 500;
                        json["descripcion"] = "Error al Enviar el correo";
                        callback(true, json);
                    } else {

                        DBManager.queryDelete("solicitudes", query, function (err, data) {
                            if (err) {
                                console.log(firm + "error : " + data);
                                json["status"] = 500;
                                json["descripcion"] = "error al eliminar evento ";
                                callback(true, json);
                            } else {
                                console.log(firm + "exito " + data);
                                json["status"] = 200;
                                json["descripcion"] = "Se elimino con exito ";
                                callback(false, json);
                            }
                        });
                    }
                });

            } else {
                json["status"] = 500;
                json["descripcion"] = "error no se encontro el evento ";
                callback(true,)
            }

            //console.log(html);
        }
    });
}


module.exports.reporte = reporte;
module.exports.existeCorreo = existeCorreo;
module.exports.changeStatus = changeStatus;
module.exports.getEventos = getEventos;
module.exports.getReportesIndicadores = getReportesIndicadores;
module.exports.updateEvento = updateEvento;
module.exports.getEvento = getEvento;
module.exports.deleteEvento = deleteEvento;