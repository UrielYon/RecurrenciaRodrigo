var coleccionAuditorios = [
    {
        _id: 1,
        nombre: "Auditorio Alberto Barajas Celis",
        descripcion: "(Cap. 420 butacas)",
        capacidad: 420,
        servicios: {
            cantidad: [
                "Micrófono_Inalámbrico", // depende 
                "Micrófono_Alámbrico", // depende 
                "Presidium"
            ],
            check: [
                "Podium",
                "Proyector_de_video",
                "Computadora",
                "Promoción",
                "Grabación_en_video", // depende 
                "Diseño_póster",
                "Coffeebreak"
            ],
        },
        horario: {
            entreSemana: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
            viernes: [9, 10, 11, 12, 13, 14, 15, 16, 17]
        }
    }, {
        _id: 2,
        nombre: "Auditorio del Edificio Yelizcalli",
        descripcion: "(Cap. 169 butacas)",
        capacidad: 169,
        servicios: {
            cantidad: [ //con cantidad 
                "Micrófono_Inalámbrico", // depende 
                "Micrófono_Alámbrico", // depende 
                "Presidium"
            ],
            check: [
                "Podium",
                "Proyector_de_video",
                "Computadora",
                "Promoción",
                "Grabación_en_video", // depende 
                "Diseño_póster",
                "Coffeebreak"
            ],
        },
        horario: {
            entreSemana: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19],
            viernes: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19]
        },
        grabra: "grabar",
        difundir: "difundir"
    }, {
        _id: 3,
        nombre: "Auditorio Carlos Graef",
        descripcion: "(Cap. 192 butacas)",
        capacidad: 192,
        servicios: {

            cantidad: [ //con cantidad 
                "Micrófono_Inalámbrico", // depende 
                "Micrófono_Alámbrico", // depende 
                "Presidium"
            ],
            check: [
                "Podium",
                "Proyector_de_video",
                "Computadora",
                "Promoción",
                "Grabación_en_video", // depende 
                "Diseño_póster",
                "Coffeebreak"
            ]
        },
        horario: {
            entreSemana: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19],
            viernes: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19]
        },
    }, {
        _id: 4,
        nombre: "Anfiteatro Alfredo Barrera",
        descripcion: "(Cap. 87 butacas)",
        capacidad: 87,
        servicios: {
            cantidad: [ //con cantidad 
                "Presidium",
                "Mamparas"
            ],
            check: [

                "Proyector de video",
                "Computadora",
                "Promoción",
                "Grabación_en_video", // depende 
                "Diseño_póster",
                "Coffeebreak"
            ]
        },
        horario: {
            entreSemana: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19],
            viernes: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19]
        }

    }, {
        _id: 5,
        nombre: "Aula Magna Leonila Vázquez",
        descripcion: "(Cap. 50 butacas)",
        capacidad: 50,
        servicios: {
            cantidad: [ //con cantidad 
                "Presidium",
                "Mamparas"
            ],
            check: [

                "Proyector_de_video",
                "Computadora",
                "Promoción",
                "Diseño_póster",
                "Coffeebreak"
            ],
        },
        horario: {
            entreSemana: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19],
            viernes: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19]
        }

    }, {
        _id: 6,
        nombre: "Sala Sotero Prieto 1",
        descripcion: "(Cap. 34 butacas)",
        capacidad: 34,
        servicios: {
            cantidad: [ //con cantidad 
                "Presidium",
                "Mamparas"
            ],
            check: [

                "Proyector_de_video",
                "Computadora",
                "Promoción",
                "Grabación_en_video", // depende 
                "Diseño_póster",
                "Coffeebreak"
            ],
        },
        horario: {
            entreSemana: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19],
            viernes: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19]
        }
    }, {
        _id: 7,
        nombre: "Sala Sotero Prieto 2",
        descripcion: "(Cap. 34 butacas)",
        capacidad: 34,
        servicios: {
            cantidad: [ //con cantidad             
                "Presidium",
                "Mamparas"
            ],
            check: [
                "Proyector_de_video",
                "Computadora",
                "Promoción",
                "Grabación_en_video", // depende 
                "Diseño_póster",
                "Coffeebreak"
            ]
        },
        horario: {
            entreSemana: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19],
            viernes: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19]
        }
    }, {
        _id: 8,
        nombre: "Sala Sotero Prieto 3",
        descripcion: "(Cap. 34 butacas)",
        capacidad: 34,
        servicios: {
            cantidad: [ //con cantidad             
                "Presidium",
                "Mamparas"
            ],
            check: [
                "Proyector_de_video",
                "Computadora",
                "Promoción",
                "Grabación_en_video", // depende 
                "Diseño_póster",
                "Coffeebreak"
            ],
        },
        horario: {
            entreSemana: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19],
            viernes: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19]
        }
    }, {
        _id: 9,
        nombre: "Vestíbulo del Amoxcalli",
        descripcion: "",
        capacidad: 34,
        servicios: {
            cantidad: [ //con cantidad                 
                "Sillas", 
                "Mesas",
                "Mamparas"
            ],
            serviciosCheck: [
                "Micrófono",
                "Proyector_de_video",
                "Computadora",
                "Promoción",
                "Grabación_en_video", // depende 
                "Diseño_póster",
                "Coffeebreak"
            ],
        },
        horario: {
            entreSemana: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19],
            viernes: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19]
        }
    }, {
        _id: 10,
        nombre: "Explanada de la fuente de Prometeo",
        descripcion: "",
        capacidad: 50,
        servicios: {
            cantidad: [ //con cantidad 
                "Mesas",
                "Sillas"
            ],
          
        },
        horario: {
            entreSemana: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19],
            viernes: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19]
        }
    }



]