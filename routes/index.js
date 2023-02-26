var express = require('express');
var router = express.Router();
var moment = require('moment');
var controladorLogin = require('../controlador/loginControlador');
var controladorGeneral = require('../controlador/generales');
var controladorUser = require('../controlador/user');
var controladorTecnico = require('../controlador/tecnico');
let { validarBusdaHorario } = require('../util/validador');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('profesor', { title: 'Express' });
});


router.get('/login', function (req, res, next) {
    res.render('login');
});


router.get('/operador/home', function (req, res, next) {

    console.log(req.session)
    if (req.session.tipo === 1) {

        res.render('operador', { user: req.session.mail });
    } else {
        res.redirect("/login")
    }
});


router.get('/tecnico/home', function (req, res, next) {
    if (req.session.tipo === 2) {

        res.render('tecnico', { user: req.session.mail });

    } else {
        res.redirect("/login")
    }
});


router.get('/admin/home', function (req, res, next) {
    if (req.session.tipo === 0) {

        res.render('admin', { user: req.session.mail });
    } else {
        res.redirect("/login")
    }

});

/**
 * verifica si esta dado de alta en la base de datos,
 * se redirecciona a la misma pagina 
 */
router.post('/login', function (req, res, next) {

    user = {
        correo: req.body.mail,
        pass: req.body.pass
    }

    controladorLogin.checkLogin(user, function (err, code, data) {
        if (err) {
            console.log("Error de el lado de el servidor")
        } else {
            var json = {};
            if (data) { // existe lo crea
                if (code == 0) { // administrador (iris )
                    console.log("admin");
                    req.session.mail = req.body.mail;
                    req.session.tipo = 0;
                    res.redirect('/admin/home')
                    //res.render("admin", { user: req.session.mail });
                }
                if (code == 1) {
                    console.log("operador");
                    req.session.mail = req.body.mail;
                    req.session.tipo = 1;
                    //res.render("operador", { user: req.session.mail });
                    res.redirect('/operador/home')
                }
                if (code == 2) {
                    console.log("tecnico");
                    req.session.mail = req.body.mail;
                    req.session.tipo = 2;
                    res.redirect('/tecnico/home')
                    //res.render("tecnico", { user: req.session.mail });
                }
            } else {
                console.log("no existe  o correo invalido")
                json["code"] = 400;
                json["descripcion"] = 'no existe  o correo invalido';
                //res.send(json);
                res.render("login", json)
            }
        }
    });
});



router.get('/logout', function (req, res, next) {
    req.session.destroy();

    res.redirect("login");
});


/**
 * Metodos generales
 */

/**********************************
 ** Get evento 
 **********************************/

router.post('/get/evento', function (req, res, next) {
    const firm = "[Router::GetEvento]";
    console.log(firm + JSON.stringify(req.body.evento));
    controladorUser.getEvento(req.body.evento, function (err, data) {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
});

/**
 * regresa las hora
 * para generar la tabla 
 * 
 */
router.post('/get/horario/', function (req, res, next) {
    const firm = "[Router::/get/horario/]";
    //console.log(firm + Object.keys(req.body));
    var json = JSON.parse(req.body.js);
    if (req.session.mail) {
        // regres el nombre y satus dependiendo quien tiene login
        controladorLogin.getTipoUser(req.session.mail, function (err, data) {
            if (err) {
                console.log(firm + JSON.stringify(data));
                res.send(data);
            } else {
                console.log(firm + JSON.stringify(data));
                if (data.tipo == 0) {
                    //console.log("adminstrador")
                    controladorGeneral.getHorario(json.auditorio, json.fechaI, [20], function (err, data) {
                        if (err) {
                            //console.log(data)
                            res.send(data);
                        } else {
                            //console.log(data);
                            var jsonSend = {};
                            jsonSend["admin"] = data;
                            res.send(jsonSend);
                        }
                    });
                }

                if (data.tipo == 1) {
                    console.log("usuario ");
                    var jsonSend = {};
                    controladorGeneral.getHorario(json.auditorio, json.fechaI, [20], function (err, admin) {
                        if (err) {
                            //console.log(data)
                            res.send(admin);
                        } else {
                            //console.log(data);

                            controladorGeneral.getHorario(json.auditorio, json.fechaI, [15], function (err, user) {
                                if (err) {
                                    //console.log(data)
                                    res.send(user);
                                } else {
                                    //console.log(data);
                                    jsonSend["admin"] = admin;
                                    jsonSend["user"] = user;
                                    res.send(jsonSend);
                                }
                            });
                        }
                    });
                }
            }
        });
    } else {
        console.log("no hay session - profesor");
        controladorGeneral.getHorario(json.auditorio, json.fechaI, [20], function (err, data) {
            if (err) {
                //console.log(data)
                res.send(data);
            } else {
                //console.log(data);
                var jsonSend = {};
                jsonSend["admin"] = data;
                res.send(jsonSend);
            }
        });
    }




});

/**********************************
 ** Metodos Profesor
 **********************************/

router.post('/get/auditorios', function (req, res, next) {
    const firm = "/get/auditorios";
    console.log(req.body);
    controladorGeneral.getCalendario(parseInt(req.body._id), new Date(req.body.inicio), new Date(req.body.fin), function (mensaje) {
        if (mensaje.code == 400) {
            console.log(mensaje.descripcion);
        } else {
            console.log(mensaje.descripcion);
        }
    });
});


/**
 * inserta un evento dependiendo de quien esta inicando la session
 */

router.post('/insert', function (req, res, next) {
    const firm = "[Router::insert] ";
    //console.log(firm + JSON.stringify(req.body.a));
    var evento = JSON.parse(req.body.a)
    ///console.log(firm + Object.keys(evento));
    console.log(req.session.mail);

});


/**
 * actuliza un evento 
 */
router.post('/evento/update', function (req, res, next) {
    const firm = "[Router::evento-update] ";
    //console.log(firm + JSON.stringify(req.body));
    var evento = JSON.parse(req.body.evento)
    ///console.log(firm + Object.keys(evento));
    console.log(req.session.mail);
    var json = {};
    if (req.session.mail) {
        // regres el nombre y satus dependiendo quien tiene login
        controladorLogin.getTipoUser(req.session.mail, function (err, data) {
            if (err) {
                console.log(firmdata.nombre + JSON.stringify(data));
                res.send(data);
            } else {
                //evento.evento.nombre = data.nombre;
                //evento.evento.registro.status = data.status;
                //console.log(firm + "cliente:  " + JSON.stringify(evento))
                controladorUser.updateEvento(evento._id, evento.evento, data.nombre, function (err, data) {
                    if (err) {
                        res.send(data);
                    } else {
                        res.send(data);
                    }
                });
            }
        });
    } else {
        json["code"] = 400;
        json["descripcion"] = "No tines permisos "
        res.send();
    }
});
/**
 * modifica el status de un evento dependiendo de el 
 * usuario que modifico 
 */
router.post('/change/status', function (req, res, next) {

    const firm = "[Router::change/status] ";
    // console.log("  keys [ " + Object.keys(req.body) + " ]");
    // console.log(req.body.id)
    // console.log(firm + req.session.mail + "   [ " + req.body.id + " ]");
    if (req.session.mail) {
        controladorLogin.getTipoUser(req.session.mail, function (err, data) {
            if (err) {
                console.log(firm + "errror" + JSON.stringify(data));
                //res.send(data);
            } else {
                console.log(firm + " exito " + JSON.stringify(data));

                if (data.tipo == 0) {
                    console.log(firm + "administador")
                    controladorUser.changeStatus(req.body.id, 20, data.nombre, 0, function (err, data) {
                        if (err) {
                            console.log(firm + "ocurrio un error " + Object.keys(data));
                            res.send(data);
                        } else {
                            console.log(firm + "exito " + Object.keys(data));
                            console.log(firm + "exito " + JSON.stringify(data));
                            res.send(data);
                        }
                    });
                }
                if (data.tipo == 1) {
                    console.log(firm + "user")
                    controladorUser.changeStatus(req.body.id, 15, data.nombre, 1, function (err, data) {
                        if (err) {
                            console.log(firm + "ocurrio un error " + Object.keys(data));
                            res.send(data);
                        } else {
                            console.log(firm + "exito " + Object.keys(data));
                            console.log(firm + "exito " + JSON.stringify(data));
                            res.send(data);
                        }
                    });
                }
            }
        });
    } else {
        console.log("no hay session - profesor");
        // evento.registro.nombre = "Profesor";
        // evento.registro.status = 10;
        var json = {};
        json["code"] = 400;
        json["descripcion"] = "No tines los permisos para modificar";
        res.send(json)
    }
});


/**
 * regresa la data de los reportes
 */

router.post('/reportes', function (req, res, next) {
    const firm = "[Router::reportes] ";
    //console.log(firm + JSON.stringify(req.body.a));
    //var evento = JSON.parse(req.body.a)
    console.log(firm, req.body);
    //console.log(req.session.mail);
    if (req.session.mail) {
        let tmp = JSON.parse(req.body.query);

        // regres el nombre y satus dependiendo quien tiene login
        controladorUser.getEventos(new Date(tmp.fechaInicio), new Date(tmp.fechaFin), tmp.auditorio, tmp.status, function (err, dato) {
            console.log("Respuesta " + err, dato)
            if (err) {
                res.send(dato);
            } else {
                res.send(dato);
            }
        });
    } else {
        res.send({ code: 200, mensaje: "no tienes sesion" });
        console.log("no hay session - profesor");

    }
});

router.post('/reportesIndicadores', function (req, res, next) {
    const firm = "[Router::reportesIndicadores] ";
    //console.log(firm + JSON.stringify(req.body.a));
    //var evento = JSON.parse(req.body.a)
    console.log(firm, req.body);
    //console.log(req.session.mail);
    if (req.session.mail) {
        let tmp = JSON.parse(req.body.query);
        // regres el nombre y satus dependiendo quien tiene login        
        controladorUser.getReportesIndicadores(new Date(tmp.fechaInicio), new Date(tmp.fechaFin), tmp.auditorio, function (err, dato) {
            //console.log("Respuesta "+err, dato)
            if (err) {
                res.send(dato);
            } else {
                res.send(dato);
            }
        });
    } else {
        res.send({ code: 200, mensaje: "no tienes sesion" });
        console.log("no hay session - profesor");

    }
});

/**
 * regresa todos los auditorios 
 */
router.post('/auditorioss', function (req, res, next) {
    //console.log("hola mundo");
    controladorGeneral.getAuditorios(function (err, dato) {
        if (err) {
            res.send(dato);
        } else {
            res.send(dato);
        }
    });
});

/**
 * Obitine el auditorio  con sus propiedades 
 * 
 */
router.post('/get/auditorio', function (req, res, next) {
    const firm = "[Router::firma]"
    console.log(firm + JSON.stringify(req.body.id));
    controladorGeneral.getAuditorio(req.body.id, function (err, dato) {
        if (err) {
            res.send(dato);
        } else {
            res.send(dato);
        }
    });
});

/**********************************
 ** metodos 
 **********************************/

/**
 * 
 */
router.post('/eventos', function (req, res, next) {
    const firm = "[post:eventos] ";
    //console.log(firm + JSON.stringify(req.body.query));
    var tmp = JSON.parse(req.body.query);
    if (req.session.mail != undefined) {
        controladorUser.existeCorreo(req.session.mail, function (err, data) {
            if (err) {
                res.send(data);
            } else {

                //console.log(firm + " : " + JSON.stringify(data));
                if (data.tipo == 0) { // admææin
                    var status = (tmp.status == 1 ? [20] : [15]);
                    //console.log("usuario admin");
                    controladorUser.getEventos(new Date(tmp.fechaInicio), new Date(tmp.fechaFin), tmp.auditorio, status, function (err, dato) {
                        if (err) {
                            res.send(dato);
                        } else {
                            res.send(dato);
                        }
                    });
                }
                if (data.tipo == 1) { // user
                    var status = (tmp.status == 1 ? [15] : [10, 11, 12]);
                    console.log("usuario user:: " + new Date(tmp.fechaInicio) + " :  " + new Date(tmp.fechaFin));
                    controladorUser.getEventos(new Date(tmp.fechaInicio), new Date(tmp.fechaFin), tmp.auditorio, status, function (err, dato) {
                        if (err) {
                            res.send(dato);
                        } else {
                            res.send(dato);
                        }
                    });
                }
            }
        });
    } else {
        var json = {
            status: 400,
            descripcion: "inicia session o recarga la pagina, o recarga tu pagina"
        };
        res.send(json);
    }
});


/**
 * Es un borrado logico cambia el estatus 
 */
router.post('/evento/delete', function (req, res, next) {
    const firm = "[post:evento-delete] ";
    console.log(firm + JSON.stringify(req.body.id));
    //var tmp = JSON.parse(req.body.query);
    if (req.session.mail != undefined) {
        controladorUser.existeCorreo(req.session.mail, function (err, data) {
            if (err) {
                res.send(data);
            } else {

                //console.log(firm + " : " + JSON.stringify(data));
                controladorUser.deleteEvento(req.body.id, function (err, data) {
                    if (err) {
                        res.send(data);
                    } else {
                        //console.log("exito " + JSON.stringify(data));
                        res.send(data);
                    }
                });
            }
        });
    } else {
        var json = {
            status: 400,
            descripcion: "no tienes permiso para realizar esta opcion"
        };
        res.send(json);
    }
});

/**
 * 
 */
router.post('/evento/deleteDB', function (req, res, next) {
    const firm = "[post:evento-delete] ";
    console.log(firm + JSON.stringify(req.body.id));
    //var tmp = JSON.parse(req.body.query);
    if (req.session.mail != undefined) {
        controladorUser.existeCorreo(req.session.mail, function (err, data) {
            if (err) {
                res.send(data);
            } else {

                //console.log(firm + " : " + JSON.stringify(data));
                controladorUser.deleteEvento(req.body.id, function (err, data) {
                    if (err) {
                        res.send(data);
                    } else {
                        //console.log("exito " + JSON.stringify(data));
                        res.send(data);
                    }
                });
            }
        });
    } else {
        var json = {
            status: 400,
            descripcion: "no tienes permiso para realizar esta opcion"
        };
        res.send(json);
    }
});

/**
 * solo el admin puede hacer esta consulta 
 */
router.post('/consultas', function (req, res, next) {
    const firm = "[Router::consultas]"
    //console.log(firm + JSON.stringify(req.body.fecha));

    //var tmp = JSON.parse(req.body.user);
    if (req.session.mail != undefined) {
        controladorUser.existeCorreo(req.session.mail, function (err, data) {
            if (err) {
                res.send(data);
            } else {
                console.log(firm + " inicio session  " + JSON.stringify(data));
                if (data.tipo == 0) { // admin
                    var fechas = JSON.parse(req.body.fecha);
                    console.log(Object.keys(fechas));
                    console.log(fechas.fechaI + "::::" + fechas.fechaF)
                    controladorUser.reporte(fechas.fechaI, fechas.fechaF, function (err, data) {
                        if (err) {
                            console.log(firm + data);
                        } else {
                            console.log(firm + data);
                            res.send(data);
                        }
                    });
                }
            }
        });
    } else {
        var json = {
            status: 400,
            descripcion: "no tienes permiso para realizar esta opcion"
        };
        res.send(json);
    }

});

/**************************************************
 *********CRUD usuariarios 
 *************************************************/
/**
 * usuario create
 */

router.post('/usuario/crear', function (req, res, next) {
    const firm = "[post:usuario-crear] ";
    //console.log(firm + JSON.stringify(req.body.id));
    var tmp = JSON.parse(req.body.user);
    if (req.session.mail != undefined) {
        controladorUser.existeCorreo(req.session.mail, function (err, data) {
            if (err) {
                res.send(data);
            } else {
                console.log(firm + " inicio session  " + JSON.stringify(data));
                if (data.tipo == 0) { // admin
                    console.log(firm + "revisar el usuario " + JSON.stringify(tmp));
                    controladorLogin.userCrear(tmp, function (err, respuesta) {
                        if (err) {
                            res.send(respuesta);
                        } else {
                            res.send(respuesta);
                        }
                    });
                }
            }
        });
    } else {
        var json = {
            status: 400,
            descripcion: "no tienes permiso para realizar esta opcion"
        };
        res.send(json);
    }
});
/**
 * usuario Reade
 */

router.post('/usuario/reade', function (req, res, next) {
    const firm = "[post:usuario-reade] ";
    //console.log(firm + JSON.stringify(req.body.id));
    //var tmp = JSON.parse(req.body.query);
    if (req.session.mail != undefined) {
        controladorUser.existeCorreo(req.session.mail, function (err, data) {
            if (err) {
                res.send(data);
            } else {
                console.log(firm + " : " + JSON.stringify(data));
                if (data.tipo == 0) { // admin
                    console.log(firm + "validar _id= " + req.body.user);

                    controladorLogin.userShow(req.body.user, function (err, respuesta) {
                        if (err) {
                            res.send(respuesta);
                        } else {
                            res.send(respuesta);
                        }
                    });
                }
            }
        });
    } else {
        var json = {
            status: 400,
            descripcion: "no tienes permiso para realizar esta opcion"
        };
        res.send(json);
    }
});


/**
 * usurio update
 */

router.post('/usuario/update', function (req, res, next) {
    const firm = "[post:usuario-update] ";
    //console.log(firm + JSON.stringify(req.body.id));
    //var tmp = JSON.parse(req.body.user);
    if (req.session.mail != undefined) {
        controladorUser.existeCorreo(req.session.mail, function (err, data) {
            if (err) {
                res.send(data);
            } else {
                console.log(firm + " : " + JSON.stringify(data));
                if (data.tipo == 0) { // admin
                    console.log("valiar _id  y user: " + req.body.user);
                    console.log("valiar _id  y user: " + req.body._id);
                    // console.log(JSON.parse(req.body.user));
                    // console.log(JSON.parse(req.body._id));
                    controladorLogin.userUpdate(req.body._id, JSON.parse(req.body.user), function (err, respuesta) {
                        if (err) {
                            res.send(respuesta);
                        } else {
                            res.send(respuesta);
                        }
                    });
                }
            }
        });
    } else {
        var json = {
            status: 400,
            descripcion: "no tienes permiso para realizar esta opcion"
        };
        res.send(json);
    }
});
/**
 * usuario  Delete 
 */
router.post('/usuario/delete', function (req, res, next) {
    const firm = "[post:usuario-delete] ";
    //console.log(firm + JSON.stringify(req.body.id));
    //var tmp = JSON.parse(req.body.query);
    if (req.session.mail != undefined) {
        controladorUser.existeCorreo(req.session.mail, function (err, data) {
            if (err) {
                res.send(data);
            } else {
                console.log(firm + " : " + JSON.stringify(data));
                if (data.tipo == 0) { // admin
                    console.log("validar _id= " + req.body.evento);
                    controladorLogin.userDelete(req.body.evento, function (err, respuesta) {
                        if (err) {
                            res.send(respuesta);
                        } else {
                            res.send(respuesta);
                        }
                    });
                }
            }
        });
    } else {
        var json = {
            status: 400,
            descripcion: "no tienes permiso para realizar esta opcion"
        };
        res.send(json);
    }
});
/**
 * usuario getAll
 */

router.post('/usuario/getAll', function (req, res, next) {
    const firm = "[post:usuario-getAll] ";
    //console.log(firm + JSON.stringify(req.body.id));
    //var tmp = JSON.parse(req.body.query);
    if (req.session.mail != undefined) {
        controladorUser.existeCorreo(req.session.mail, function (err, data) {
            if (err) {
                res.send(data);
            } else {
                console.log(firm + " : " + JSON.stringify(data));
                if (data.tipo == 0) { // admin
                    controladorLogin.userShowAll(function (err, respuesta) {
                        if (err) {
                            res.send(respuesta);
                        } else {
                            res.send(respuesta);
                        }
                    });
                }
            }
        });
    } else {
        var json = {
            status: 400,
            descripcion: "no tienes permiso para realizar esta opcion"
        };
        res.send(json);
    }
});

/**********************************
 ** Tecnico  
 **********************************/

router.post('/get/material', function (req, res, next) {
    const firm = "[post:get-material] ";
    console.log(firm + JSON.stringify(req.body));
    var tmp = JSON.parse(req.body.query);
    if (req.session.mail != undefined) {
        controladorUser.existeCorreo(req.session.mail, function (err, data) {
            if (err) {
                res.send(data);
            } else {
                //console.log(firm + " : " + JSON.stringify(data));
                if (true) { // admin
                    //console.log(firm + "validar _id= " + JSON.stringify(req.body.query));
                    var temp = JSON.parse(req.body.query);
                    // console.log("qwerty " + Object.keys(temp));
                    // console.log("qwerty " + temp.fechaFin);
                    // console.log("qwerty " + temp.fechaInicio);
                    controladorTecnico.getMaterial(temp.auditorio, temp.fechaInicio, temp.fechaFin, function (err, resul) {
                        if (err) {
                            //console.log(firm + " Error " + JSON.stringify(data));
                            res.send(resul);
                        } else {
                            //console.log(firm + " exito " + resul.lengt + JSON.stringify(resul));
                            res.send(resul);
                        }
                    });
                }
            }
        });
    } else {
        var json = {
            status: 400,
            descripcion: "no tienes permiso para realizar esta opcion"
        };
        res.send(json);
    }
});

router.post('/horario', function (req, res, next) {
    console.log("buscar horario")
    console.log("buscar horario", req.body.datos)
    try {
        let evento = JSON.parse(req.body.datos);
        console.log(evento)
        //moment().isoWeekday(); // Number
        switch (evento.tipo) {
            case '1':
                // normal 
                console.log("Entro a  una vez")
                controladorGeneral.soloUnaVez(evento, res);
                break;
            case '2':// algunos dias 
                console.log("recurrente")
                controladorGeneral.recurrente(evento, res);
                break;
            case '3'://diario
                controladorGeneral.diario(evento, res);
                // normal 
                break;
        }
    } catch (error) {
        console.log("log ", error)
        res.status(500).send("ocurrio un errro desconocido ", error)
    }

});


router.post('/insertar', function (req, res, next) {
    console.log("entre")


    var evento = JSON.parse(req.body.data)

    if (req.session.mail) {
        // regres el nombre y satus dependiendo quien tiene login
        controladorLogin.getTipoUser(req.session.mail, function (err, data) {
            if (err) {
                console.log(firm + JSON.stringify(data));
                res.send(data);
            } else {
                evento.registro.nombre = data.nombre;
                evento.registro.status = data.status;
                
                switch (evento.tipo) {
                    case '1':
                        controladorGeneral.agregaUnaVez(evento, res);
                        break;
                    case '2':// algunos dias 
                        controladorGeneral.agregarRecurrente(evento, res);
                        break;
                    case '3'://diario
                    cono
                        controladorGeneral.diario(evento, res);
                        // normal 
                        break;
                    default:
                        console.log("error ")
                        res.status(500).send("ocurrio un errro desconocido ")
                        break;
                }
            }
        });
    } else {
        console.log("no hay session - profesor");
        evento.registro.nombre = "Profesor";
        evento.registro.status = 10;
        switch (evento.tipo) {
            case '1':
                controladorGeneral.agregaUnaVez(evento, res);
                break;
            case '2':// algunos dias 
                controladorGeneral.agregarRecurrente(evento, res);
                break;
            case '3'://diario
                controladorGeneral.agregarDiario(evento, res);
                // normal 
                break;
            default:
                console.log("error ")
                res.status(500).send("ocurrio un errro desconocido ")
                break;
        }
    }

});

module.exports = router;