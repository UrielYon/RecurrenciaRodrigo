var nombre = ["Rodrigo Rivera Paz", "Valeria Rivera Paz", "Santigo rivera Paz", "karim  rivera Paz", "Karina rivera Paz"]

var horios = [
    [9, 10, 11], 9, [9, 10][10, 11],
    [11, 12, 13], 16, 18, [13, 14],
    [15, 16], 16
];
for (let i = 0; i < 20; i++) {

    var agregar_evento = {

        registro: {
            nombre: "profesor " + i,
            fecha: new Date(),
            status: parseInt(Math.random() * (14 - 10) + 10)
        },
        datos_profesores: {
            nombre: nombre[parseInt(Math.random() * (nombre.length))],
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
            fecha: new Date(2019, 07, parseInt(Math.random() * (29 - 10) + 10)),
            hora: horios[parseInt(Math.random() * (horios.length))],
            //hora: [13,14],
            asisitentes: 25,
            tipo: "publico",
            pagina: "www.saniiago.com.mx",
        },
        servicios: { // numero 
            "Microfono Inalambrico": parseInt(Math.random() * (4 - 1) + 1), // depende 
            "Microfono Alambrico": parseInt(Math.random() * (4 - 1) + 1), // depende 
            "Presidium": parseInt(Math.random() * (4 - 1) + 1),
            "Mamparas": parseInt(Math.random() * (4 - 1) + 1),
            "Sillas": parseInt(Math.random() * (4 - 1) + 1)
        },
        serviciosCheck: {
            "Podium": true,
            "Proyector de video": true,
            "Computadora": false,
            "Promoción": false,
            "Grabación en video": true,
            "Diseño póster": true,
            "Coffeebreak": true
        }

    }
    console.log(JSON.stringify(agregar_evento) + ",\n")

}