/**
 * configuracion para ejecutar 
 */
var home = {
    base_datos:{
        url:  "mongodb+srv://fciencias:fciencias@cluster0.oeoaf06.mongodb.net/?retryWrites=true&w=majority",
        port: 27017,
        nameDB: "aulas",
        collectionUsers: "user",
        collectionAuditorios: "salones",
        solicitudes: "solicitudes",
        auditorios: "auditorios",
    },
    correo_:{
        correo: "ciencias07rodrigo@gmail.com" ,
        passoword:"ajzqsygeaxqpxuoj",        
    },
    correo:{
        correo: "actividades.academicas@ciencias.unam.mx" ,
        passoword:"frxtdollwnvgxpiz",
    },
    servidor:{
        puerto:7777,
        header :"https://fciecnias-scdc.herokuapp.com/public/images/cabecera.png",
        footer :"https://fciecnias-scdc.herokuapp.com/public/images/footer.png"

    }

}

var home_ = {

    base_datos:{
        url: "mongodb://localhost:27017",
        port: 27017,
        nameDB: "aulas",
        collectionUsers: "user",
        collectionAuditorios: "salones",
        solicitudes: "solicitudes",
        auditorios: "auditorios",
    },
    correo:{
        correo: "ciencias07rodrigo@gmail.com" ,
        passoword:"ejemplo12345",
    },
    servidor:{
        puerto:7777
    }
}

//var llave = 'SCSDC';
module.exports = {
    
    home: home,
    
};