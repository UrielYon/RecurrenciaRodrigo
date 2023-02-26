let DBManager = require('../modules/DBManager.js');
const { enviar } = require('../modules/Mail.js');
const { generarHTML, asunto } = require('../config/correo.js');
var moment = require('moment');
const Db = require('mongodb/lib/db');
const { body } = require('express-validator');
const { map } = require('jquery');


/**
 * Obtiene todos los auditorios 
 */
function getAuditorios(callback) {
    const firm = "[Controlador:generales::getAuditorios] ";
    DBManager.getAuditorioAll(function (err, data) {
        if (err) {
            console.log(firm + "erro=" + JSON.stringify(data));
            callback(true, data);
        } else {
            //console.log(firm + JSON.stringify(data));
            callback(false, data);
        }
    });
}

/**
 * inserta un evento 
 * @param {*} evento json con los datos de el evento
 * @param {*} callback 
 */
function insertarEvento(evento, res) {
    const firm = "[Controlador:generales::insertarEvento] ";
    //   console.log(firm + Object.keys(evento.servicios));
    //console.log(firm , evento)
    //console.log(firm, evento)
    let json = {};
    let datos = {
        tipo: evento.tipo,
        FechaInicio: evento.FechaInicio,
        FechaFin: evento.FechaFin,
        registro: {
            nombre: evento.registro.nombre,
            fecha: new Date(evento.registro.fecha),
            status: parseInt(evento.registro.status)
        },
        datos_profesores: {
            nombre: evento.datos_profesores.nombre,
            cargo: evento.datos_profesores.cargo,
            area: evento.datos_profesores.area,
            institucion: evento.datos_profesores.institucion,
            telefono: evento.datos_profesores.telefono,
            correo: evento.datos_profesores.correo
        },
        evento_tipo: {
            tipo: evento.evento_tipo.tipo,
            nombre: evento.evento_tipo.nombre,
            categoria: evento.evento_tipo.categoria,
            texto: evento.evento_tipo.texto
        },
        evento_datos: {
            id_espacio: parseInt(evento.evento_datos.id_espacio),
            auditorio: evento.evento_datos.auditorio,
            nombre: evento.evento_datos.nombre,
            fecha: new Date(evento.evento_datos.fecha),
            hora: evento.evento_datos.hora,
            asisitentes: parseInt(evento.evento_datos.asisitentes),
            tipo: evento.evento_datos.tipo,
            pagina: evento.evento_datos.pagina,
        },
        servicios: {
            cantidad: evento.servicios.cantidad,
            check: evento.servicios.check
        },
        diseno: {
            tipo: evento.diseno.tipo,
            resumen: evento.diseno.resumen,
            nombreCompleto: evento.diseno.nombreCompleto,
            objetivoEvento: evento.diseno.objetivoEvento,
            departamento: evento.diseno.departamento,
            difusion: evento.diseno.difusion,
        }
    }
    console.log("datos: ", datos)
    let html = generarHTML(datos, asunto[0].mensaje)

    // DBManager.insertSolicitud("solicitudes", datos, function (err, mensaje) {
    //     if (err) {
    //         json["code"] = 500;
    //         json["descripcion"] = "Error al guardar";
    //         callback(true, json);
    //     } else {
    //         json["code"] = 200;
    //         json["descripcion"] = "Se Guardo con Exito";
    //         //mail.seend(datos.datos_profesores.datos_profesores.correo)
    //         callback(false, json);
    //     }
    // });

    enviar(evento.datos_profesores.correo, html, asunto[0].asunto, function (err, respuesta) {
        if (err) {
            json["code"] = 500;
            json["descripcion"] = "Error al Enviar el correo no se guardo el Registro";
            res.status(500).send({ code: 30, descripcion: "error servicio enviar correo" })
        } else {

            //console.log(firm + "----" + JSON.stringify(datos));

            DBManager.insertSolicitud("solicitudes", datos, function (err, mensaje) {
                if (err) {
                    json["code"] = 500;
                    json["descripcion"] = "Error al guardar";
                    //callback(true, json);
                    res.status(500).send({ code: 20, descripcion: "Error al guardar" })
                } else {
                    json["code"] = 200;
                    json["descripcion"] = "Se guardó con Éxito";
                    //mail.seend(datos.datos_profesores.datos_profesores.correo)
                    res.status(200).send({ code: 0, descripcion: "Se guardó con Éxito" })
                    //callback(false, json);
                }
            });
        }
    });
}

function insertarEventoDia(evento, ultimo, res) {
    console.log("insertar")
    const firm = "[Controlador:generales::insertarEvento] ";
    console.log(firm, evento);

    //console.log(firm, evento)
    let json = {};
    let datos = {
        tipo: evento.tipo,
        "fechaInicio": evento.fechaInicio,
        "fechaFin": evento.fechaFin,
        "dias": evento.dias,
        registro: {
            nombre: evento.registro.nombre,
            fecha: new Date(evento.registro.fecha),
            status: parseInt(evento.registro.status)
        },
        datos_profesores: {
            nombre: evento.datos_profesores.nombre,
            cargo: evento.datos_profesores.cargo,
            area: evento.datos_profesores.area,
            institucion: evento.datos_profesores.institucion,
            telefono: evento.datos_profesores.telefono,
            correo: evento.datos_profesores.correo
        },
        evento_tipo: {
            tipo: evento.evento_tipo.tipo,
            nombre: evento.evento_tipo.nombre,
            categoria: evento.evento_tipo.categoria,
            texto: evento.evento_tipo.texto
        },
        evento_datos: {
            id_espacio: parseInt(evento.evento_datos.id_espacio),
            auditorio: evento.evento_datos.auditorio,
            nombre: evento.evento_datos.nombre,
            fecha: new Date(evento.evento_datos.fecha),
            hora: evento.evento_datos.hora,
            asisitentes: parseInt(evento.evento_datos.asisitentes),
            tipo: evento.evento_datos.tipo,
            pagina: evento.evento_datos.pagina,
        },
        servicios: {
            cantidad: evento.servicios.cantidad,
            check: evento.servicios.check
        },
        diseno: {
            tipo: evento.diseno.tipo,
            resumen: evento.diseno.resumen,
            nombreCompleto: evento.diseno.nombreCompleto,
            objetivoEvento: evento.diseno.objetivoEvento,
            departamento: evento.diseno.departamento,
            difusion: evento.diseno.difusion,
        }
    }
    console.log("para guardar : ", datos)

    if (ultimo) {
        res.status(200).send({ code: 0, descripcion: "Se guardó con Éxito" })
        // enviar(evento.datos_profesores.correo, html, asunto[0].asunto, function (err, respuesta) {
        //     res.status(200).send({ code: 0, descripcion: "Se guardó con Éxito" })
        // });
    } else {
        console.log("se va guardar ")
        DBManager.insertSolicitud("solicitudes", datos, function (err, mensaje) {
            if (err) {
                json["code"] = 500;
                json["descripcion"] = "Error al guardar";
                //callback(true, json);
                res.status(500).send({ code: 20, descripcion: "Error al guardar" })
            } else {
                console.log("mensaje Guardar ", mensaje)

                //callback(false, json);
            }
        });
    }
}

/**
 * Obtiene un auditorio
 * @param {*} id 
 * @param {*} callback 
 */
function getAuditorio(id, callback) {
    const firm = "[Controlador::generales:getAuditorio] ";
    //console.log(firm + id);
    let query = { _id: parseInt(id) };
    DBManager.queryFind("auditorios", query, {}, function (err, data) {
        if (err) {
            callback(true, data);
        } else {
            //console.log(firm + JSON.stringify(data));
            callback(false, data);
        }
    });
}

/**
 * 
 * @param {*} id 
 * @param {*} fechaI 
 * @param {*} FechaF 
 * @param {*} status 
 * @param {*} callback   regresa un json  
 * json = {
 * id = {horas de el auditorio}
 * d1:horas
 * ....
 * d5:horas
 * }
 */
function getHorario(auditorio, fechaI, status, callback) {
    const firm = new Date() + "[Generales::getHorario ]";
    let fechaT = new Date(fechaI);
    json = {}
    //console.log(firm + auditorio + " fechaI:" + fechaT)
    //console.log(fechaT);
    //fechaT.setDate(fechaT.getDate() + 1)
    //console.log(firm + auditorio + " fechaI:" + "***" + status)
    horario(auditorio, fechaI, status, json, 0, function (err, data) {
        if (err) {
            json = {
                code: 400,
                descripcion: "erro conexion DB"
            }
            callback(true, json);
        } else {
            //console.log(firm + "--" + Object.keys(data));
            //console.log(firm + JSON.stringify(data));
            callback(false, data);
            //console.log("horario " + JSON.stringify(data))
        }
    })
}

/**
 * obtine el  hoario
 * @param {*} auditorio 
 * @param {*} fecha 
 * @param {*} status 
 */
function horario(auditorio, fecha, status, json, i, callback) {
    const firm = "[Generales::horario] ";
    if (i == 5) { // caso base 
        callback(false, json);
    } else {
        let tem = new Date(fecha);
        tem.setDate(tem.getDate() - 1);
        let temSatus = { $or: [] };
        let query = {
            $and: [{ "evento_datos.fecha": { $lte: new Date(fecha) } },
            { "evento_datos.fecha": { $gte: tem } },
            { "evento_datos.id_espacio": parseInt(auditorio) },
                //{ "registro.status": status }
            ]
        }

        for (let i = 0; i < status.length; i++) {
            let t = { "registro.status": status[i] }
            temSatus.$or.push(t);
        }
        query.$and.push(temSatus);
        //console.log(firm + JSON.stringify(query));
        DBManager.queryFind("solicitudes", query, { 'evento_datos.hora': 1 }, function (err, data) {
            if (err) {
                console.log("existio un error " + data);
                callback(true, data);
            } else {
                let fechaT = new Date(fecha);
                let array = [];
                if (data[0] === undefined) {
                    json[`d-${fechaT.getDate()}`] = null;
                } else {
                    //console.log(firm + (data[1].evento_datos.hora) + "::" + JSON.stringify(query));
                    data.forEach(element => {
                        //console.log(element.evento_datos.hora)
                        element.evento_datos.hora.forEach(element => {
                            //  console.log(element)
                            array.push(element);
                        });
                    });
                    //console.log("-------------")
                    json[`d-${fechaT.getDate()}`] = array;
                }
                fechaT.setDate(fechaT.getDate() + 1);
                horario(auditorio, fechaT, status, json, i + 1, callback); // llamada recursiva 
            }
        });
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function diario(req, res) {
    diarioAuxiliar(req.auditorio, new Date(req.fechaInicio), new Date(req.fechaFin), req.horario, false, { disponible: true, mensaje: "disponible" }, res);
}

/**
 * 
 * @param {*} idAuditorio 
 * @param {*} fechaInicio 
 * @param {*} fechaFin 
 * @param {*} horario 
 * @param {*} fin 
 * @param {*} mensaje 
 * @param {*} res 
 */
function diarioAuxiliar(idAuditorio, fechaInicio, fechaFin, horario, fin, mensaje, res) {
    // console.log("----------------idAuditorio", idAuditorio,
    //     "  fechaInicio: ", fechaInicio,
    //     "  fechaFin: ", fechaFin,
    //     "  horario: ", horario,
    //     "  fin: ", fin,
    //     "  mensaje: ", mensaje)

    if (moment(fechaInicio).isSame(moment(fechaFin)) || fin) {
        // se termina la recusion regresa un mensajw
        console.log("se termina el proceso ")
        res.send({ mensaje })
    } else {
        console.log("paso 2")
        if (!esFinSemana(fechaInicio)) {
            let tempF = new Date(fechaInicio);
            //console.log("???",fechaInicio, " vs ", tempF)
            let query = {
                "$and":
                    [
                        { "evento_datos.id_espacio": idAuditorio },
                        { "registro.status": 20 },//solo aceptados
                        { "evento_datos.fecha": { "$gte": tempF } },
                        { "evento_datos.fecha": { "$lte": tempF } }
                    ]
            }
            console.log("[query]", query);
            DBManager.queryFind("solicitudes", query, { _id: 1, evento_datos: 1 }, function (err, data) {
                if (err) {
                    fin = true;
                    diarioAuxiliar(idAuditorio, fechaInicio, fechaFin, horario, fin, { code: 1, disponible: false, mensaje: "Error base de datos" }, res);
                } else {
                    console.log("datos", data.length, " data ")
                    if (data.length > 0) {
                        let exite = false;
                        data.forEach(element => {
                            console.log(element.evento_datos.hora, "  vs ", horario)
                            element.evento_datos.hora.forEach(k => {
                                horario.forEach(j => {
                                    if (k == j) {
                                        if (!exite) {
                                            exite = true;
                                            fin = true;
                                            diarioAuxiliar(idAuditorio, fechaInicio, fechaFin, horario, fin, { code: 2, disponible: false, mensaje: "no disponible" }, res);
                                        }

                                    }
                                })

                            })
                        });
                    } else {
                        //LLamada recursiava 
                        fechaInicio = aumentaUnDia(fechaInicio);
                        console.log("no hay eventos ", fechaInicio)
                        diarioAuxiliar(idAuditorio, fechaInicio, fechaFin, horario, fin, mensaje, res);
                    }
                }
            });
        } else {
            //LLamada recursiava             
            fechaInicio = aumentaUnDia(fechaInicio);
            console.log("fin de semana llamada recursiva ", fechaInicio)
            diarioAuxiliar(idAuditorio, fechaInicio, fechaFin, horario, fin, mensaje, res);
        }
    }
}

/**
 * Busca disponiblidad 1 dia hasta 5 dias 
 * @param {*} req 
 * @param {*} res 
 */
function recurrente(req, res) {
    console.log("principal")
    recurrenteAux(req.auditorio, new Date(req.fechaInicio), new Date(req.fechaFin), req.dias, req.horario, false, { disponible: true, mensaje: "disponible" }, res);
}

/**
 * Obtine disponibilidad 
 * @param {*} fechaInicio 
 * @param {*} fechaFin 
 * @param {*} dia 
 * @param {*} fecha 
 */
function soloUnaVez(req, res) {
    console.log("----------------idAuditorio", idAuditorio,
        "  fechaInicio: ", fechaInicio,
        "  fechaFin: ", fechaFin,
        "  horario: ", horario,
        "  fin: ", fin,
        "  mensaje: ", mensaje)
    if (!esFinSemana(req.fecha)) {
        console.log("paso 3 ",)
        //console.log("???", tempF)
        let query = {
            "$and":
                [
                    { "evento_datos.id_espacio": req.auditorio },
                    { "registro.status": 20 },
                    { "evento_datos.fecha": new Date(req.fecha) },
                ]
        }
        console.log("[query]", query);
        DBManager.queryFind("solicitudes", query, { _id: 1, evento_datos: 1 }, function (err, data) {
            if (err) {
                exite = true;
                res.send({ code: 1, disponible: false, mensaje: "Error base de datos " });
            } else {
                console.log("datos", data.length)
                if (data.length > 0) {
                    let exite = false;
                    data.map(element => {
                        console.log(element.evento_datos.hora, "  vs ", req.body.horario)
                        element.evento_datos.hora.forEach(k => {
                            req.body.horario.forEach(j => {
                                if (k == j) {
                                    if (!exite) {
                                        fin = true;
                                        exite = true;
                                        res.send({ code: 2, disponible: false, mensaje: "no se pude " });
                                    }
                                }
                            });
                        });
                    });
                    if (!exite) {
                        res.send({ code: 2, disponible: false, mensaje: "no se pude " });
                    }
                } else {
                    //LLamada recursiava 
                    console.log("no hay datos")
                    res.send({ code: 2, disponible: true, mensaje: "se pude " });
                }
            }
        });
    } else {
        //LLamada recursiava     
        res.send({ code: 2, disponible: false, mensaje: "no se pude " })
    }
}

/**
 * 
 * @param {*} idAuditorio 
 * @param {*} fechaInicio 
 * @param {*} fechaFin 
 * @param {*} horario 
 * @param {*} fin 
 * @param {*} mensaje 
 * @param {*} res 
 */
function recurrenteAux(idAuditorio, fechaInicio, fechaFin, dias, horario, fin, mensaje, res) {
    console.log("----------------\nidAuditorio  ", idAuditorio,
        "  fechaInicio: ", fechaInicio,
        "  fechaFin: ", fechaFin,
        "  dias: ", dias,
        "  horario: ", horario,
        "  fin: ", fin,
        "  mensaje: ", mensaje)


    if (moment(fechaInicio).isSameOrAfter(moment(fechaFin)) || fin) {
        // se termina la recusion regresa un mensajw
        console.log("============se termina el proceso ")
        res.send({ mensaje });
    } else {
        let exite = validarFechaDia(fechaInicio, dias)
        console.log("paso 2 ", exite)
        if (!esFinSemana(fechaInicio) && exite) {
            console.log("paso 3 ",)

            let tempF = new Date(fechaInicio);
            console.log("???", tempF)
            let query = {
                "$and":
                    [
                        { "evento_datos.id_espacio": idAuditorio },
                        { "registro.status": 20 },
                        { "evento_datos.fecha": { "$gte": tempF } },
                        { "evento_datos.fecha": { "$lte": tempF } }
                    ]
            }
            console.log("[query]", JSON.stringify(query));
            DBManager.queryFind("solicitudes", query, { _id: 1, evento_datos: 1 }, function (err, data) {
                if (err) {
                    exite = true;
                    recurrenteAux(idAuditorio, fechaInicio, fechaFin, dias, horario, fin, { code: 1, disponible: false, mensaje: "Error base de datos " }, res);
                } else {
                    console.log("datos", data.length)
                    if (data.length > 0) {
                        let exite = false;
                        data.map(element => {
                            //console.log(element.evento_datos.hora, "  vs ", horario)
                            element.evento_datos.hora.map(k => {
                                horario.forEach(j => {
                                    if (k == j) {
                                        if (!exite) {
                                            fin = true;
                                            exite = true;
                                            recurrenteAux(idAuditorio, fechaInicio, fechaFin, dias, horario, fin, { code: 2, disponible: false, mensaje: "no se pude " }, res);
                                        }
                                    }
                                })
                            })
                        });

                        if (!exite) {
                            res.send({ code: 2, disponible: false, mensaje: "no se pude " });
                        }
                    } else {
                        //LLamada recursiava 
                        fechaInicio = aumentaUnDia(fechaInicio);
                        console.log("no hay eventos ", fechaInicio)
                        recurrenteAux(idAuditorio, fechaInicio, fechaFin, dias, horario, fin, mensaje, res);
                    }
                }
            });
        } else {
            //LLamada recursiava             
            fechaInicio = aumentaUnDia(fechaInicio);
            console.log("fin de semana llamada recursiva ", fechaInicio)
            recurrenteAux(idAuditorio, fechaInicio, fechaFin, dias, horario, fin, mensaje, res);
        }
    }
}


function agregarDiario(evento, res) {


    agregarDiarioAux(evento.idAuditorio, evento.fechaInicio, evento.fechaFin, evento.evento_datos.hora, evento, false, { disponible: true, mensaje: "disponible" }, res)
}

function agregarDiarioAux(idAuditorio, fechaInicio, fechaFin, horario, evento, fin, mensaje, res) {
    console.log("----------------\nidAuditorio  ", idAuditorio,
        "  fechaInicio: ", fechaInicio,
        "  fechaFin: ", fechaFin,
        "  horario: ", horario,
        "  evento: ", evento,
        "  fin: ", fin,
        "  mensaje: ", mensaje);

    if (moment(fechaInicio).isSameOrAfter(moment(fechaFin)) || fin) {
        // se termina la recusion regresa un mensajw
        console.log("============Se termina el proceso============")
        insertarEventoDia(evento, true, res);

    } else {


        if (!esFinSemana(fechaInicio)) {
            console.log("paso 3 ",)

            let tempF = new Date(fechaInicio);
            console.log("???", tempF)
            let query = {
                "$and":
                    [
                        { "evento_datos.id_espacio": idAuditorio },
                        { "registro.status": 20 },
                        { "evento_datos.fecha": { "$gte": tempF } },
                        { "evento_datos.fecha": { "$lte": tempF } }
                    ]
            }
            console.log("[query diario]", query);
            DBManager.queryFind("solicitudes", query, { _id: 1, evento_datos: 1 }, function (err, data) {
                if (err) {
                    exite = true;
                    agregarDiarioAux(idAuditorio, fechaInicio, fechaFin, horario, evento, fin, { code: 1, disponible: false, mensaje: "Error base de datos " }, res);
                } else {
                    console.log("datos", data.length)
                    if (data.length > 0) {
                        let exite = false;
                        data.map(element => {
                            //console.log(element.evento_datos.hora, "  vs ", horario)
                            element.evento_datos.hora.forEach(k => {
                                horario.forEach(j => {
                                    if (k == j) {
                                        if (!exite) {
                                            fin = true;
                                            exite = true;
                                            agregarDiarioAux(idAuditorio, fechaInicio, fechaFin, horario, fin, { code: 2, disponible: false, mensaje: "no se pude " }, res);
                                        }
                                    }
                                })

                            })
                        });
                        if (!exite) {
                            res.send({ code: 2, disponible: false, mensaje: "no se pude " });
                        } else {
                            evento.evento_datos.fecha = fechaInicio;
                            insertarEventoDia(evento, false, res);
                            agregarDiarioAux(idAuditorio, fechaInicio, fechaFin, horario, evento, fin, mensaje, res);
                        }
                    } else {
                        //LLamada recursiava 
                        evento.evento_datos.fecha = fechaInicio;
                        insertarEventoDia(evento, false, res);
                        fechaInicio = aumentaUnDia(fechaInicio);

                        agregarDiarioAux(idAuditorio, fechaInicio, fechaFin, horario, evento, fin, mensaje, res);
                    }
                }
            });
        } else {
            //LLamada recursiava             
            fechaInicio = aumentaUnDia(fechaInicio);
            console.log("fin de semana llamada recursiva ", fechaInicio)
            agregarDiarioAux(idAuditorio, fechaInicio, fechaFin, horario, evento, fin, mensaje, res);
        }
    }
}

function agregarRecurrente(evento, res) {

    agregaRecurrenteAuxiliar(evento.idAuditorio, evento.fechaInicio, evento.fechaFin, evento.dias, evento.evento_datos.hora, evento, false, { disponible: true, mensaje: "disponible" }, res);
}

function agregaRecurrenteAuxiliar(idAuditorio, fechaInicio, fechaFin, dias, horario, evento, fin, mensaje, res) {
    console.log("----------------\nidAuditorio  ", idAuditorio,
        "  fechaInicio: ", fechaInicio,
        "  fechaFin: ", fechaFin,
        "  dias: ", dias,
        "  horario: ", horario,
        "  evento: ", evento,
        "  fin: ", fin,
        "  mensaje: ", mensaje);

    if (moment(fechaInicio).isSameOrAfter(moment(fechaFin)) || fin) {
        // se termina la recusion regresa un mensajw
        console.log("============Se termina el proceso============")
        insertarEventoDia(evento, true, res);

    } else {
        let exite = validarFechaDia(fechaInicio, dias)
        console.log("paso 2 ", exite)
        if (!esFinSemana(fechaInicio) && exite) {
            console.log("paso 3 ",)

            let tempF = new Date(fechaInicio);
            console.log("???", tempF)
            let query = {
                "$and":
                    [
                        { "evento_datos.id_espacio": idAuditorio },
                        { "registro.status": 20 },
                        { "evento_datos.fecha": { "$gte": tempF } },
                        { "evento_datos.fecha": { "$lte": tempF } }
                    ]
            }
            console.log("[query]", query);
            DBManager.queryFind("solicitudes", query, { _id: 1, evento_datos: 1 }, function (err, data) {
                if (err) {
                    exite = true;

                    agregaRecurrenteAuxiliar(idAuditorio, fechaInicio, fechaFin, dias, horario, evento, fin, { code: 1, disponible: false, mensaje: "Error base de datos " }, res);
                } else {
                    console.log("datos", data.length)
                    if (data.length > 0) {
                        let exite = false;
                        data.map(element => {
                            //console.log(element.evento_datos.hora, "  vs ", horario)
                            element.evento_datos.hora.forEach(k => {
                                horario.forEach(j => {
                                    if (k == j) {
                                        if (!exite) {
                                            fin = true;
                                            exite = true;
                                            recurrenteAux(idAuditorio, fechaInicio, fechaFin, dias, horario, fin, { code: 2, disponible: false, mensaje: "no se pude " }, res);
                                        }
                                    }
                                })

                            })
                        });
                        if (!exite) {
                            res.send({ code: 2, disponible: false, mensaje: "no se pude " });
                        } else {
                            evento.evento_datos.fecha = fechaInicio;
                            insertarEventoDia(evento, false, res);
                            fechaInicio = aumentaUnDia(fechaInicio);
                            agregaRecurrenteAuxiliar(idAuditorio, fechaInicio, fechaFin, dias, horario, evento, fin, mensaje, res);
                        }
                    } else {
                        //LLamada recursiava 

                        evento.evento_datos.fecha = fechaInicio;
                        insertarEventoDia(evento, false, res);
                        fechaInicio = aumentaUnDia(fechaInicio);
                        agregaRecurrenteAuxiliar(idAuditorio, fechaInicio, fechaFin, dias, horario, evento, fin, mensaje, res);
                    }
                }
            });
        } else {
            //LLamada recursiava             
            fechaInicio = aumentaUnDia(fechaInicio);
            console.log("fin de semana llamada recursiva ", fechaInicio)
            agregaRecurrenteAuxiliar(idAuditorio, fechaInicio, fechaFin, dias, horario, evento, fin, mensaje, res);
        }
    }
}

function agregaUnaVez(req, res) {
    axuliarUnaVez(req, res);
}

function axuliarUnaVez(req, res) {
    console.log("agregar Una vez  ");

    if (!esFinSemana(req.evento_datos.fecha)) {
        console.log("paso 3 ",)
        //console.log("???", tempF)
        let query = {
            "$and":
                [
                    { "evento_datos.id_espacio": req.evento_datos.id_espacio },
                    { "registro.status": 20 },
                    { "evento_datos.fecha": new Date(req.evento_datos.fecha) },

                ]
        }
        console.log("[query]", query);
        DBManager.queryFind("solicitudes", query, { _id: 1, evento_datos: 1 }, function (err, data) {
            if (err) {
                exite = true;
                res.send({ code: 1, disponible: false, mensaje: "Error base de datos " });
            } else {
                console.log("datos", data.length)
                if (data.length > 0) {
                    let exite = false;
                    data.map(element => {
                        console.log(element.evento_datos.hora, "  vs ", req.horario)
                        element.evento_datos.hora.forEach(k => {
                            req.evento_datos.hora.forEach(j => {
                                if (k == j) {
                                    if (!exite) {
                                        fin = true;
                                        exite = true;
                                        res.send({ code: 2, disponible: false, mensaje: "no se pude " });
                                    }
                                }
                            });
                        });
                    });
                    if (!exite) {
                        res.send({ code: 2, disponible: false, mensaje: "no se pude " });
                    }
                } else {
                    //LLamada recursiava 
                    console.log("se inserta")
                    insertarEvento(req, res);
                }
            }
        });
    } else {
        //LLamada recursiava     
        res.send({ code: 2, disponible: false, mensaje: "no se pude " })
    }
}


/**
 * Valida que la fecha sea igual que el dia 
 * @param {*} fecha new Date
 * @param {*} dia arreglo
 */
function validarFechaDia(fecha, dias) {
    let fechaTemo = new Date(fecha);
    let exite = "";
    dias.map(i => {
        //console.log("[validarFechaDia] ", fechaTemo, " | ", fechaTemo.getDay(), " === ", i)
        if (fechaTemo.getDay() === i) {
            exite = true;
        }
    })
    return exite;
}

function esFinSemana(fecha) {
    let dia = moment(fecha, "YYYY-MM-DD").day();

    if (dia == 0 || dia == 6) {
        return true;
    } else {
        return false;
    }
}

function aumentaUnDia(fecha) {
    return moment(fecha).add(1, 'days');

}

module.exports.agregarDiario = agregarDiario;
module.exports.agregarRecurrente = agregarRecurrente
module.exports.agregaUnaVez = agregaUnaVez;
module.exports.soloUnaVez = soloUnaVez;
module.exports.recurrente = recurrente;
module.exports.diario = diario;
module.exports.getAuditorio = getAuditorio;
module.exports.getAuditorios = getAuditorios;
module.exports.insertarEvento = insertarEvento;
module.exports.getHorario = getHorario;