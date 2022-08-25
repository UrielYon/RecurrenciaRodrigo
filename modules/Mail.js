var nodemailer = require('nodemailer');
var Config = require('../config/config').home;


/**
 * 
 * @param {*} receptor 
 * @param {*} mensaje 
 * @param {*} asunto 
 * @param {*} callback 
 */
function enviar(receptor, mensaje, asunto, callback) {
  const firm = "[Enviar Correo] "

  var mailOptions = {
    from: Config.correo.correo,
    to: receptor,
    subject: asunto,
    html: mensaje
  };
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: "true",
    port: "465",
    auth: {
      user: Config.correo.correo,
      pass: Config.correo.passoword
    }
  });
  // console.log("entro")
  // console.log(mensaje+'');
  transporter.sendMail(mailOptions, function (error, info) {
    transporter.close();
    if (error) {
      console.log(firm + "Error ", error);
      transporter.close();
      callback(true, false);
    } else {
      //console.log('Email sent: ', info);
      console.log(firm + "Correo enviado " + receptor)
      callback(false, true)
    }
  });
}

// enviar("rodrigo.rivera@ciencias.unam.mx", ConfigCorreo.generarHTML(
//   {
//     registro: { nombre: 'Profesor', fecha: "2020-08-21T05:25:51.138Z", status: 10 },
//     datos_profesores: {
//       nombre: 'dw',
//       cargo: ', data',
//       area: ', data',
//       institucion: ', data',
//       telefono: '5547711176',
//       correo: 'rodrigo.rivera@ciencias.unam.mx'
//     },
//     evento_tipo: { tipo: '8', nombre: 'Videoconferencia' },
//     evento_datos: {
//       id_espacio: 1,
//       auditorio: 'Auditorio Alberto Barajas',
//       nombre: ', data',
//       fecha: "2020-08-26T00:00:00.000Z",
//       hora: [ '9', '10' ],
//       asisitentes: '12',
//       tipo: '1',
//       pagina: ', data, data, data, data'
//     },
//     servicios: {
//       cantidad: {
//         microfono_inalambrico: '',
//         microfono_alambrico: '',
//         presidium: '',
//         mamparas: '',
//         sillas: ''
//       },
//       check: []
//     },
//     diseno: {
//       tipo: null,
//       resumen: null,
//       nombreCompleto: null,
//       objetivoEvento: null,
//       departamento: null,
//       difusion: null
//     }
//   }
// ), "asunto", function (err, data) {
//   console.log(data);
// })

module.exports.enviar = enviar;