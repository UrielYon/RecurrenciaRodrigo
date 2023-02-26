var MongoClient = require('mongodb').MongoClient;
//const Config.base_datos = require('./config/');
var { ObjectId } = require('mongodb');

var Config = require('../config/config').home;




/**
 * inserta un usuario 
 * @param {*} user datos de el usaurio
 * @param {*} callback boolean si se hizo o noi,regresa un mensaje
 */
function insertarUser(user, callback) {
    const firm = "[DBManager::insertarUser] ";
    MongoClient.connect(Config.base_datos.url, function(err, db) {
        if (err) {
            console.log("error de coneccion con la DB")
        } else {
            var dbo = db.db(Config.base_datos.nameDB);
            console.log("intento insertar")
            dbo.collection(Config.base_datos.collectionUsers).insertOne(user, function(err, res) {
                db.close();
                if (err) {
                    callback(true, "error")
                } else {
                    callback(false, "se inserto un elemento")
                }
            });
        };
    });
}

/**
 * busca el documentos si existe 
 * @param {*} mail mail
 * @param {*} callback boolean si lo encontro,regresa un boolean si lo encontro
 */
function getDocumentMail(mail, callback) {
    const firm = "[DBManager::getDocumentMail] ";
    MongoClient.connect(Config.base_datos.url, function(err, db) {
        if (err) {
            console.log("error de coneccion con la DB")
        } else {
            var dbo = db.db(Config.base_datos.nameDB);

            dbo.collection(Config.base_datos.collectionUsers).find({ correo: mail }).toArray(function(err, data) {
                db.close();
                if (err) {
                    callback(true, "error")
                } else {
                    if (data.length > 0) { //existe 
                        callback(false, true);
                    } else { // no existe 
                        callback(false, false);
                    }
                }
            });
        };
    });
}

/**
 * valida si  exite ese documentos con esa contraseña 
 * @param {*} user json datos de el usario
 * @param {*} callback regresa en el segundo parametro si existe 
 */
function validarLogin(user, callback) {
    const firm = "[DBManager::validarLogin] ";
    MongoClient.connect(Config.base_datos.url, function(err, db) {
        if (err) {
            console.log("error de coneccion con la DB")
        } else {
            var dbo = db.db(Config.base_datos.nameDB);
            //console.log(firm + " " + Object.keys(user) + "====" + user.correo + " : " + user.pass);
            dbo.collection(Config.base_datos.collectionUsers).find({
                $and: [{ correo: user.correo },
                    { pass: user.pass }
                ]
            }).toArray(function(err, data) {
                db.close();
                if (err) {
                    callback(true, "error")
                } else {
                    //console.log(firm + "==" + Object.keys(data[0]))
                    if (data.length > 0) { //existe 
                        callback(false, true, data[0].tipo);
                    } else { // no existe 
                        callback(false, false, -1);
                    }
                }
            });
        };
    });
}



/**
 * regresa el tipo de usurio 
 * @param {*} mail correo 
 * @param {*} callback 
 */
function getTipo(mail, callback) {
    const firm = "[DBManager::getTipo] ";
    MongoClient.connect(Config.base_datos.url, function(err, db) {
        if (err) {
            console.log("error de coneccion con la DB")
        } else {
            var dbo = db.db(Config.base_datos.nameDB);
            console.log(firm + " " + user.correo + " : " + user.pass);
            dbo.collection(Config.base_datos.collectionUsers).find({ correo: user.correo }).toArray(function(err, data) {
                db.close();
                if (err) {
                    callback(true, "error")
                } else {
                    console.log(data[0].tipo);
                    // if (data.length > 0) { //existe 
                    //     callback(false, true);
                    // } else {// no existe 
                    //     callback(false, false);
                    // }
                }
            });
        };
    });
}


/**
 * obtiene una coleccion dependiendo de la fecha
 * @param {*} fecha1 dia incicio 
 * @param {*} fecha2 dia final 
 */
function getSemana(fecha1, fecha2, callback) {
    const firm = "[DBManager::getSemana] ";
    MongoClient.connect(Config.base_datos.url, function(err, db) {
        if (err) {
            console.log("error de coneccion con la DB")
        } else {
            var dbo = db.db(Config.base_datos.solicitudes);
            dbo.collection(Config.base_datos.collectionUsers).find({ correo: user.correo }).toArray(function(err, data) {
                db.close();
                if (err) {
                    callback(true, "error")
                } else {

                }
            });
        };
    });
}

/**
 * ejcuta un scrip 
 * @param {*} query 
 * @param {*} callback 
 */
function aggregate1(query, callback) {
    const firm = "[DBManager::aggregate] "

    console.log(firm + "Ejecutando query [" + JSON.stringify(query) + "]");
    var options = {
        poolSize: 50,
        socketTimeoutMS: 86400000 // 24 horas
    };
    MongoClient.connect(Config.base_datos.url, options, function(err, client) {
        if (err) {
            console.log(firm + 'Error: NO ha sido posible conectarse a: ' + Config.base_datos.url);
            callback(true, err);
        }

        var cursor = client.db(Config.base_datos.nameDB).collection(Config.base_datos.solicitudes).aggregate(query, { "cursor": { "batchSize": Config.base_datos.batchSize } }, null);

        cursor.on("end", function(data) {
            console.log('[' + new Date + '] ' + firm + "Finalizando cursor... ");
            client.close();
            //resolve(counter);
            callback(false, data)
        });
        cursor.on("error", function(data) {
            console.log('[' + new Date + '] ' + firm + "Error al ejecutar el cursor... " + data);
            client.close();
            //resolve(counter);
            callback(true, data)
        });

        cursor.on("data",
            function(err, data) {
                console.log('[' + new Date + '] ' + firm + "Cursor: data " + cursor.toString());
                cursor.close();
            });
    });
}


/**
 * obtiene todos los auditorios para mostra en el html 
 * @param {*} callback 
 */
function getAuditorioAll(callback) {
    const firm = "[DBManager::getAuditorio] ";
    //console.log(firm + "All auditorios:: " + Object.keys(Config.base_datos));
    //console.log(Config.base_datos.port)
    var mensaje = {};
    MongoClient.connect(Config.base_datos.url, function(err, db) {
        if (err) {
            //console.log(firm + "error de coneccion con la DB");
            console.log(db);
            mensaje = { mensaje: "Error de coneccion con la DB", status: 400 }
            callback(true, mensaje);
        } else {
            var dbo = db.db(Config.base_datos.nameDB);
            dbo.collection(Config.base_datos.auditorios).find({}).toArray(function(err, data) {
                db.close();
                if (err) {
                    mensaje = { mensaje: "Error query ", status: 401 }
                    callback(true, mensaje)
                } else {


                    callback(false, data);

                }
            });
        };
    });
}

/**
 * regresa los auditorios 
 * @param {*} fecha 
 * @param {*} auditorio 
 * @param {*} callback 
 */
function getSolicitudes(fecha, auditorio, callback) {
    const firm = "[DBManager::getSolicitudes] ";

    console.log(firm + " _id:" + id);
    MongoClient.connect(Config.base_datos.url, function(err, db) {
        if (err) {
            console.log("error de coneccion con la DB")
        } else {
            var dbo = db.db(Config.base_datos.nameDB);
            dbo.collection(Config.base_datos.solicitudes).find({
                $and: [
                    { "auditorio": auditorio },
                    { "fecha": fecha }
                ]
            }).toArray(function(err, data) {
                db.close();
                if (err) {
                    callback(true, "error")
                } else {
                    if (data.length > 0) {
                        callback(false, data);
                    } else {
                        callback(true, "no hay elementos");
                    }
                }
            });
        };
    });
}


/**
 * 
 * @param {*} coleccion 
 * @param {*} query 
 * @param {*} proyeccion 
 * @param {*} callback 
 */
function queryFind(coleccion, query, proyeccion, callback) {
    const firm = "[DBManager::queryFind] ";
    //console.log(firm + JSON.stringify(query))
    MongoClient.connect(Config.base_datos.url, function(err, db) {
        if (err) {
            console.log(firm + "error de coneccion con la DB");
            callback(true, db);
        } else {
            var dbo = db.db(Config.base_datos.nameDB);
            //console.log(firm + "db= " + Config.base_datos.nameDB + "  query=" + JSON.stringify(query))
            dbo.collection(coleccion).find(
                query, {
                    projection: proyeccion
                }
            ).toArray(function(err, data) {
                db.close();
                if (err) {
                    callback(true, "error: " + data)
                } else {
                    //console.log("exito " + data.length);

                    callback(false, data);
                }
            });
        };
    });
}

/**
 * 
 * @param {*} coleccion 
 * @param {*} query 
 * @param {*} setupadte 
 * @param {*} callback 
 */

function queryUpdate(coleccion, query, setupadte, callback) {
    const firm = "[DBManager::queryUpdate] ";
    MongoClient.connect(Config.base_datos.url, function(err, db) {
        if (err) {
            console.log(firm + "error de coneccion con la DB");
            callback(true, db);
        } else {
            var dbo = db.db(Config.base_datos.nameDB);
            dbo.collection(coleccion).update(
                query,
                setupadte,
                function(err, data) {
                    db.close();
                    if (err) {
                        callback(true, data);
                    } else {
                        console.log(firm + data)
                        callback(false, data);
                    }
                });
        };
    });
}

/**
 * insertar una solicitud 
 * @param {*} fecha 
 * @param {*} callback 
 */
function insertSolicitud(coleccion, evento, callback) {
    const firm = "[DBManager::insertSolicitud] ";
    console.log(firm + " insertando la fecha:" + JSON.stringify(evento));
    MongoClient.connect(Config.base_datos.url, function(err, db) {
        if (err) {
            console.log(true, "error de coneccion con la DB")
        } else {
            var dbo = db.db(Config.base_datos.nameDB);
            dbo.collection(coleccion).insertOne(evento, function(err, data) {
                db.close();
                if (err) {
                    console.log(firm + "error:" + err)
                    callback(true, "error al guardar en la base de datos");
                } else {
                    console.log(firm + "Inserto correctamete")
                    callback(false, "Se guardo correctamente");
                }
            });
        };
    });
}

/**
 * ejecuta la funcion de agregacion 
 * @param {*} coleccion 
 * @param {*} query 
 * @param {*} callback 
 */
function aggregate(coleccion, query, callback) {
    const firm = "[DBManager::aggregate] ";
    console.log(firm + JSON.stringify(query));
    MongoClient.connect(Config.base_datos.url, function(err, db) {
        if (err) {
            //console.log(firm + "error de coneccion con la DB");
            callback(true, db)
        } else {
            var dbo = db.db(Config.base_datos.nameDB);
            dbo.collection(coleccion).aggregate(
                query
            ).toArray(function(err, docs) {
                db.close();
                if (err) {
                    console.log(firm + "Error al obtener los datos");
                    callback(false, docs)
                } else {
                    //console.log(docs)
                    //assert.equal(3, docs[0].total);                    
                    callback(false, docs)
                }
            });
        }
    });
}

/**
 * delete a document 
 * @param {*} coleccion coleccion a conectarse 
 * @param {*} query  consulta en json 
 * @param {*} callback 
 */
function queryDelete(coleccion, query, callback) {
    const firm = "[DBManager::queryDelete] ";
    console.log(firm + JSON.stringify(query));
    MongoClient.connect(Config.base_datos.url, function(err, db) {
        if (err) {
            callback(true, data);
        } else {
            var dbo = db.db(Config.base_datos.nameDB);
            dbo.collection(coleccion).deleteOne(query, function(err, data) {
                db.close();
                if (err) {
                    callback(true, data);
                } else {
                    callback(false, data);
                }
            });
        }
    });
}

/**
 * inserta un coumento en un coleccion
 * @param {*} coleccion 
 * @param {*} elemento 
 * @param {*} callback 
 */
function queryInsert(coleccion, elemento, callback) {
    const firm = "[DBManager::insertSolicitud] ";
    console.log(firm + " insertando la fecha:" + JSON.stringify(elemento));
    MongoClient.connect(Config.base_datos.url, function(err, db) {
        if (err) {
            console.log(true, "error de coneccion con la DB")
        } else {
            var dbo = db.db(Config.base_datos.nameDB);
            dbo.collection(coleccion).insertOne(elemento, function(err, data) {
                db.close();
                if (err) {
                    console.log(firm + "error:" + err)
                    callback(true, "error al guardar en la base de datos");
                } else {
                    console.log(firm + "Inserto correctamete" + JSON.stringify(data));
                    callback(false, data);
                }
            });
        };
    });
}

module.exports.queryDelete = queryDelete;
module.exports.queryUpdate = queryUpdate; // sirve
module.exports.queryFind = queryFind; // sirve 
module.exports.getAuditorioAll = getAuditorioAll; // sirve 
module.exports.getAuditorioAll = getAuditorioAll; // sirve 
module.exports.aggregate = aggregate; //sirve 
module.exports.queryInsert = queryInsert; // sirve 

module.exports.getSolicitudes = getSolicitudes
module.exports.insertSolicitud = insertSolicitud;
module.exports.getSemana = getSemana;
module.exports.insertarUser = insertarUser;
module.exports.checkMailLogin = getDocumentMail;
module.exports.validarLogin = validarLogin;
module.exports.getTipo = getTipo;