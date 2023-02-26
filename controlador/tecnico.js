var DBManager = require('../modules/DBManager.js');


/**
 * Obtine los datos y le da formato para (mostrar Tabla )
 * @param {*} data  fecha incio, fecha fin, auditorios
 * @param {*} callback 
 */
function getMaterial(auditorios, fecha_inicio, fecha_fin, callback) {
    const firm = "[Tecnico:getMaterial] ";
    var json = {};
    var proyection = { "evento_datos.nombre": 1, "evento_datos.auditorio": 1, "evento_datos.hora": 1, "evento_datos.fecha": 1, servicios: 1 , "datos_profesores.nombre":1};
    var query = {
            $and: [{ "evento_datos.fecha": { $gte: new Date(fecha_inicio) } },
                { "evento_datos.fecha": { $lte: new Date(fecha_fin) } },
                { "registro.status": 20 }
            ]
        }
        //agrega a el query  los auditorios 
    var tempAuditorios = { $or: [] };
    for (let i = 0; i < auditorios.length; i++) {
        //console.log(auditorios[i] + "");
        var t = { "evento_datos.id_espacio": auditorios[i] }
        tempAuditorios.$or.push(t);
    }
    query.$and.push(tempAuditorios);
    console.log(firm + "query: " + JSON.stringify(query));
    DBManager.queryFind('solicitudes', query, proyection, function(err, data) {
        if (err) {
            console.log(firm + " erro: " + JSON.stringify(data));
            json["code"] = 400;
            json["descripcion"] = "Erro conexion de base de datos ";
        } else {
            console.log(firm + " exito: ", data);
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

/**
 * 
 * @param {*} eventos la coleccion eventos  
 */
function formato(eventos) {
    var lista = [];
    eventos.forEach(element => {
        //console.log(element.evento_datos.fecha);
        var temp = {
            recid: element._id,
            auditorio: element.evento_datos.auditorio,
            nombre_evento: element.evento_datos.nombre,
            horas: formatoHoras(element.evento_datos.hora),
            fecha: formatoFechas(element.evento_datos.fecha),
            material: formatoServicios(element.servicios.check, element.servicios.cantidad),
            materialCatidad: formatoServiciosCantidad(element.servicios.cantidad),

        };
        lista.push(temp);
    });
    return lista;
}

function formatoHoras(horas) {
    var temp = ""
    horas.forEach(element => {
        temp += element + ", ";
    });

    return temp.substring(0, temp.length - 2);

}


/**
 * auxuliar formato 
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
function formatoServicios(check) {
    var serviciosCheck = "";
    for (var i in check) {
        //console.log(i + "--" + check[i]);
        serviciosCheck += (check[i].replace("_", " ").replace("_", " ") + ", ");
    }
    serviciosCheck = serviciosCheck.substring(0, serviciosCheck.length - 2);
    return serviciosCheck;
}

function formatoServiciosCantidad(cantidad) {
    var servicios = "";
    for (var i in cantidad) {
        if (cantidad[i] > 0) {
            console.log(i + "--" + cantidad[i])
            servicios += (i.replace("_", " ") + " = " + cantidad[i] + ", ");
        }
    }
    servicios = servicios.substring(0, servicios.length - 2);
    return servicios;
}

exports.getMaterial = getMaterial;