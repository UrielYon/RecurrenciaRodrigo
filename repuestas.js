/**********************************************
 * Profesor
 *********************************************/

/**
 * respuesta si fue exitoso 
 */

var response_evento = {
    status: 200,
    mensage: "Se te informa que fue exitoso "
}

/**
 * agregar evento 
 */

var agregar_evento = {

    registro: {
        nombre: "profesor 1",
        fecha: new Date(),
        status: parseInt(Math.random() * (14 - 10) + 10)
    },
    datos_profesores: {
        nombre: "santiago rivera paz",
        cargo: "estudiante",
        area: " computer since",
        institucion: "UNAM",
        telefono: "55 47 71 11 76",
        correo: "santiago@ciencias.unam.mx"
    },
    evento_tipo: {
        tipo: 1,
        //otro: "",
        descripcion: "temporarl vmaos hacer algo "
    },
    evento_datos: {
        id_espacio: 1,
        espacio: "Auditorio Alberto Barajas",
        nombre: "ejemplo1",
        //fecha: new Date(),
        fecha: new Date(2019, 07, 16),
        hora: [9, 10, 11],
        //hora: [13,14],
        asisitentes: 25,
        tipo: "publico",
        pagina: "www.saniiago.com.mx",
    },
    servicios: {
        cantidad: { //con cantidad 
            "Microfono Inalambrico": 10, // depende 
            "Microfono Alambrico": 10, // depende 
            "Presidium": 1,
            "Mamparas": 1,
            "Sillas": 20
        },
        check: ["Podium",
            "Proyector de video",
            "Computadora",
            "Promoción"
        ]
    }
}



/**
 * 
 * regresa un arreglo de todas las horas ocupadas 
 *  teniendo en cuneta los estatus de insertar 
 * 10,11,12
 */
var getAuditorioHoras = {
    id: 1,
    fecha: "",
    stutus: 32
}

var respuesta = {
    id: 1,
    ocupadas: [],
    horario: []
}

/**********************************************
 * respuestas Jonathan 
 * 
 *********************************************/

var obtener_eventos_horario = {
    fecha_inicio: "",
    fecha_fin: "",
    status: [10, 11, 12],
    auditorios: [1, 2, 4]
}

var cambiar_satatus = {
    id_evento: 2,
    satus: 2
}

var evento_rechazar = {
    id: 2,
    nombre_usuario: "valeria",
    status: 10
}

var agregar_evento_jonathan = {
    _id: 3,
    registro: {
        nombre: "jonatan",
        fecha: new Date(),
        status: 11
    },
    datos_profesores: {
        nombre: "santiago rivera paz",
        cargo: "estudiante",
        area: " computer since",
        institucion: "UNAM",
        telefono: "55 47 71 11 76",
        correo: "santiago@ciencias.unam.mx"

    },
    evento_tipo: {
        tipo: 1,
        //otro: "",
        descripcion: "temporarl vmaos hacer algo "
    },
    evento_datos: {
        id_espacio: "1",
        espacio: "Auditorio Alberto Barajas",
        nombre: "ejemplo1",
        fecha: new Date(),
        hora: [9, 10, 11],
        asisitentes: 25,
        tipo: "publico",
        pagina: "www.saniiago.com.mx",
    },
    evento_servicios: {
        microfono_Inalambrico: 1,
        microfono_Alambrico: 2,
        solapa: 1,
        proyetor_Video: 1,
        computadora: 1,
        internet: 1,
        internet_Alambrico: 1,
        videoconferencia: 1,
        pódium: 1,
        camaras: 3,
        dvd: 1,
        bocinas: 1,
        lugares_dicapacitados: 3,
        grabra: true,
        difundir: false,
        coffeebreak: true
    }
}



/********************************************
 * respuestas jefa
 *********************************************/

var obtener_eventos = {
    fecha_inicio: "",
    fecha_fin: "",
    status: [10, 11],
    auditorios: [1, 2, 4]
}
var evento_rechazarJ = {
    id: 2,
    nombre_usuario: "valeria",
    status: 22
}

var evento_eliminar = {
    id: 3,
    nombre: "rodrigo"
}


var agregar_evento_gefa = {
    _id: 3,
    registro: {
        nombre: "jefa",
        fecha: new Date(),
        status: 12
    },
    datos_profesores: {
        nombre: "santiago rivera paz",
        cargo: "estudiante",
        area: " computer since",
        institucion: "UNAM",
        telefono: "55 47 71 11 76",
        correo: "santiago@ciencias.unam.mx"

    },
    evento_tipo: {
        tipo: 1,
        //otro: "",
        descripcion: "temporarl vmaos hacer algo "
    },
    evento_datos: {
        id_espacio: "1",
        espacio: "Auditorio Alberto Barajas",
        nombre: "ejemplo1",
        fecha: new Date(),
        hora: [9, 10, 11],
        asisitentes: 25,
        tipo: "publico",
        pagina: "www.saniiago.com.mx",
    },
    evento_servicios: {
        microfono_Inalambrico: 1,
        microfono_Alambrico: 2,
        solapa: 1,
        proyetor_Video: 1,
        computadora: 1,
        internet: 1,
        internet_Alambrico: 1,
        videoconferencia: 1,
        pódium: 1,
        camaras: 3,
        dvd: 1,
        bocinas: 1,
        lugares_dicapacitados: 3,
        grabra: true,
        difundir: false,
        coffeebreak: true
    }
}