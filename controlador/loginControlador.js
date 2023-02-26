const MongoClient = require('mongodb').MongoClient;
//const Config = require('./config/config.json');
var DBManager = require('../modules/DBManager.js');
var ObjectID = require('mongodb').ObjectID;
var CryptoJS = require("crypto-js");
var llave = require('../config/config').llave;

/**
 * valia si existe el correo si, invoca el metodo de insetar 
 * @param {*} usuario datos de usuario 
 * @param {*} callback si hubo algun erro ,tipo de erro ,mensaje
 */
function insertUser(usuario, callback) {
    const firm = "[insertUser] ";

    console.log(firm + "Usuario: " + JSON.stringify(usuario));
    DBManager.checkMailLogin(usuario.correo, function(err, data) {
        if (err) {
            callback(true, -1, "erro");
        } else {
            if (data) {
                callback(false, 1, "correo duplicado")
            } else {
                var temp = usuario.pass;
                var cifraPass = CryptoJS.AES.encrypt(temp, 'SCSDC');
                usuario.pass = cifraPass.toString();
                console.log(firm + JSON.stringify(usuario))
                DBManager.insertarUser(usuario, function(err, data1) {
                    if (err) {
                        callback(true, -1, data1)
                        console.log("Error al isnertar");
                    } else {
                        console.log("se inserto correctamente");
                        callback(false, 0, data1)
                    }

                });
            }
        }
    });
}

/**
 * verifica si ya esta registrado
 * @param {*} user 
 * @param {*} callback 
 */
function checkLogin(user, callback) {
    const firm = "[checkLogin] ";
    console.log(firm + "[" + user.correo + "] : [" + user.pass + "]");

    //var cifrar = CryptoJS.AES.encrypt(user.pass, llave);
    var hash = CryptoJS.SHA1(user.pass);
    user.pass = hash.toString();    
    console.log(firm + JSON.stringify(user))
    DBManager.validarLogin(user, function(err, data, tipo) {
        if (err) {
            callback(true, -1, "")
        } else {
            callback(false, tipo, data);
        }

    });
}

/**
 * Obtiene el tipo de usuario con su correo  
 *
 * @param {*} correo 
 * @param {*} callback 
 */
function getTipoUser(correo, callback) {
    const firm = "[getTipoUser] ";
    var json = {};
    console.log(firm + correo)
    if (correo == null || correo == undefined) {
        json["code"] = 400;
        json["descripcion"] = "correo invalido";
        callback(true, json)
    }
    console.log(correo + " : ");
    var query = { 'correo': correo };
    var proyeccion = { "nombre": 1, "tipo": 1 };
    DBManager.queryFind("user", query, proyeccion, function(err, data) {
        if (err) {
            callback(true, data);
        } else {
            console.log(JSON.stringify(data) + "----" + data.length)
            json["code"] = 200;
            json["nombre"] = data[0].nombre;
            json["status"] = data[0].tipo == 0 ? 20 : 15;
            json["tipo"] = data[0].tipo;
            callback(false, json);
        }
    });
}


/**
 * elimna un usuario 
 */
function userDelete(id, callback) {
    const firm = "[User:userDelete] ";
    var json = {};
    var query = { _id: ObjectID(id) }
    console.log(firm + query);
    DBManager.queryDelete("user", query, function(err, data) {
        if (err) {
            json["code"] = 400;
            json["descripcion"] = "error al insertar";
            console.log(firm + " Eroro " + data);
            callback(true, json);
        } else {
            json["code"] = 200;
            json["descripcion"] = "Se ha eliminado correctamente ";
            console.log(firm + " Eroro " + data);
            callback(true, json);
        }
    });
}

/**
 * actuliza un usuario 
 */
function userUpdate(id, user, callback) {
    const firm = "[User:userUpdate] ";
    var json = {};
    var query = { _id: ObjectID(id) }
    console.log(firm + query)
    DBManager.queryFind("user", query, {}, function(err, data) {
        if (err) {
            json["code"] = 400;
            json["descripcion"] = "error al insertar";
            console.log(firm + " Eroro " + data);
            callback(true, json);
        } else {
            data[0].nombre = user.nombre;
            data[0].tipo = user.tipo;
            data[0].correo = user.correo;
            console.log(firm + JSON.stringify(data[0]))
            if (user.pass.length > 0) {
                var hash = CryptoJS.SHA1(user.pass);
                //user.pass = hash.toString();
                data[0].pass = hash.toString();
            } else {
                data[0].pass = data[0].pass;
            }
            var useUpdate = {
                id: data[0]._id,
                nombre: user.nombre,
                tipo: user.tipo,
                correo: user.correo
            };

            console.log(firm + "salida" + JSON.stringify(data[0]));
            DBManager.queryUpdate("user", query, data[0], function(err, data) {
                if (err) {
                    console.log(firm + " Error" + data);
                    json["code"] = 400;
                    json["descripcion"] = "Error al actulizar";
                    callback(true, json)
                } else {
                    console.log(firm + " Exito " + data);
                    json["code"] = 200;
                    json["descripcion"] = "Se actualizo exitosamente ";
                    json["json"] = useUpdate;
                    callback(false, json)
                }
            });
        }
    });
}

/**
 * crea un usuario 
 */
function userCrear(user, callback) {
    const firm = "[User:userCrear] ";
    var json = {};
    var query = { correo: user.correo };
    var proyeccion = { correo: 1 };
    console.log(firm + JSON.stringify(query));
    DBManager.queryFind("user", query, proyeccion, function(err, data) {
        if (err) {
            json["code"] = 400;
            json["descripcion"] = "Error conexion base de datos";
            console.log(firm + "error find " + JSON.stringify(data));
            callback(true, json);
        } else {
            // console.log(data)
            // console.log(data.length)
            if (data.length == 0) {
                //var temp = user.pass;
                var cifraPass = CryptoJS.SHA1(user.pass);
                user.pass = cifraPass.toString();
                console.log(firm + JSON.stringify(user))

                DBManager.queryInsert("user", user, function(err, data) {
                    if (err) {
                        json["code"] = 400;
                        json["descripcion"] = "error al insertar";
                        console.log(firm + "error insert " + JSON.stringify(data));
                        callback(true, json);
                    } else {
                        json["code"] = 200;
                        json["descripcion"] = "Se inserto correctamente";
                        json["_id"] = data.insertedId;
                        //console.log(firm + " exutiti " + data.insertedId)                        
                        callback(false, json);
                    }
                });
            } else {
                json["code"] = 400;
                json["descripcion"] = "El correo ya existe ";
                console.log(firm + "error find " + JSON.stringify(data));
                callback(true, json);
            }
        }
    });
}

/**
 * Muestra un usuario 
 */
function userShow(id, callback) {
    const firm = "[User:userShow] ";
    var json = {};
    var query = { _id: ObjectID(id) };
    var proyeccion = { correo: 1, tipo: 1, nombre: 1, };
    DBManager.queryFind("user", query, proyeccion, function(err, data) {
        if (err) {
            json["code"] = 400;
            json["descripcion"] = "error al insertar";
            console.log(firm + " Eroro " + data);
            callback(true, json);
        } else {
            console.log(firm + " Exito " + data);
            json["code"] = 200;
            json["descripcion"] = data[0];
            callback(true, json);
        }
    });
}

/**
 * lista  usuarios
 */
function userShowAll(callback) {
    const firm = "[User:userShowAll] ";
    var json = {};
    var proyeccion = { correo: 1, tipo: 1, nombre: 1 };
    DBManager.queryFind("user", {}, proyeccion, function(err, data) {
        if (err) {
            json["code"] = 400;
            json["descripcion"] = "error al insertar";
            //console.log(firm + " Erro " + data);
            callback(true, json);
        } else {
            //console.log(firm + " Exito " + data);
            json["code"] = 200;
            json["descripcion"] = formato(data);
            callback(false, json);
        }
    });
}

/**
 * le da formato a la lista para mostrar en el w2grid
 */
function formato(data) {
    var lista = [];
    data.forEach(element => {
        var tipo = ""
        if (element.tipo == 0) {
            tipo = "Administrador";
        }
        if (element.tipo == 1) {
            tipo = "Usuario";
        }
        if (element.tipo == 2) {
            tipo = "Tecnico";
        }
        var temp = {
            recid: element._id,
            nombre: element.nombre,
            correo: element.correo,
            tipo: tipo,
        }
        lista.push(temp);
    });
    return lista;
}

module.exports.getTipoUser = getTipoUser;
module.exports.insertUser = insertUser;
module.exports.checkLogin = checkLogin;
module.exports.userDelete = userDelete;
module.exports.userUpdate = userUpdate;
module.exports.userCrear = userCrear;
module.exports.userShowAll = userShowAll;
module.exports.userShow = userShow;