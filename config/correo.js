let Conf = require('./config').home;


let asunto = [
    {
        "asunto": "Registro Exitoso",
        "mensaje": "Se agregó correctamente tu evento. Te enviaremos un correo Sobre tu estatus en un plazo de 2 días hábiles"
    },
    {
        "asunto": "Registro Editado",
        "mensaje": "Hicimos correcciones en el evento"
    },
    {
        "asunto": "Registro Rechazado",
        "mensaje": "Lo sentimos no fue aceptado tu evento"
    },
    {
        "asunto": "asunto 04",
        "mensaje": "Se agrego correctamente tu "
    },
    {
        "asunto": "asunto 05",
        "mensaje": "Se agrego correctamente tu "
    }
]




function generarHTML(data, mensaje) {
    //console.log("se recibe ,",mensaje, data)
    let html = `<!DOCTYPE html>
    <html>
    
    <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    
    <style>
            table {
                width: 100%;
            }
            .img-fluid {
                max-width: 100%;
                height: auto;
            }
    
            h1,.h1 {
                font-size: 35px;
                color: #003D64;
            }
    
            table,
            th,
            td {
    
                border-collapse: collapse;
            }
    
            th,
            td {
                padding: 15px;
                text-align: center;
            }
    
            #t01 tr:nth-child(even) {
                background-color: #DFE3E5;
            }
    
            #t01 tr:nth-child(odd) {
                background-color: #F6F7F7;
            }
    
            #t01 th {
                background-color: #003D64;
                color: white;
            }
            .espacio{
                height: auto;
                width: 500px;
                position: absolute;
            }
        </style>
    </head>
    
    <body class="container espacio">
            
        <div class="container">
            <div class="img-fluid">
                <img src="${Conf.servidor.header}" alt="Registro Auditorio"
                    class="img-fluid">
            </div>
        </div>
        <div>${mensaje}</div>

        <h1>Datos Evento: ${data.evento_datos.nombre}</h1>
    
        <table id="t01">
            <tr>
                <th colspan="2">Datos Personales </th>
                
            </tr>
            <tr>
                <td>Fecha</td>
                <td>${formatoFecha(data.evento_datos.fecha)}</td>
    
            </tr>
            <tr>
                <td>Auditorio</td>
                <td>${data.evento_datos.auditorio}</td>
    
            </tr>
            <tr>
                <td>Nombre Completo</td>
                <td>${data.datos_profesores.nombre}</td>
    
            </tr>
            <tr>
                <td>Cargo</td>
                <td>${data.datos_profesores.cargo}</td>
    
            </tr>
            <tr>
                <td>Área de adscripción(institución)</td>
                <td>${data.datos_profesores.area}</td>
    
            </tr>
            <tr>
                <td>Institución</td>
                <td>${data.datos_profesores.institucion}</td>
    
            </tr>
            <tr>
                <td>Teléfono(s)</td>
                <td>${data.datos_profesores.telefono}</td>
    
            </tr>
            <tr>
                <td>Correo electrónico</td>
                <td>${data.datos_profesores.correo}</td>
    
            </tr>
            <tr>
                <th colspan="2">Tipo Evento </th>
                
            </tr>
            <!-- 
                Seccion de tipo evento 
            -->
            <tr>
                <td>Tipo Evento </td>
                <td>${formatoOtro(data.evento_tipo)}</td>
    
            </tr>
            <tr>
                <td>Nombre</td>
                <td>${data.evento_datos.nombre}</td>
    
            </tr>
            <tr>
                <th colspan="2">Datos generales del Evento </th>
                
    
            </tr>
            <tr>
                <td>Nombre del Evento</td>
                <td>${data.evento_datos.nombre}</td>
    
            </tr>
            <tr>
                <td>Número de Asistentes</td>
                <td>${data.evento_datos.asisitentes}</td>
    
            </tr>
            <tr>
                <td>Tipo de Evento </td>
                <td>${formatoTipoEvento(data.evento_datos.tipo)}</td>
    
            </tr>
            <tr>
                <td>Página web del evento o correo electrónico (de ser el caso)</td>
                <td>${data.evento_datos.pagina}</td>
    
            </tr>
            <tr>
                <th colspan="2">Servicios adicionales </th>
                
    
            </tr>
            <tr>
                <td>Horario</td>
                <td>${data.evento_datos.hora}</td>
    
            </tr>
            <tr>
                <th colspan="2">Servicios adicionales </th>
                
    
            </tr>
            <tr>
                <td>Podium</td>
                <td>${buscarElemento(data.servicios.check, "Podium")}</td>
    
            </tr>
            <tr>
                <td>Proyector de video</td>
                <td>${buscarElemento(data.servicios.check, "Proyector_de_video")}</td>
    
            </tr>
            <tr>
                <td>Computadora </td>
                <td>${buscarElemento(data.servicios.check, "Computadora")}</td>
    
            </tr>
            <tr>
                <td>Promoción</td>
                <td>${buscarElemento(data.servicios.check, "Promoción")}</td>
    
            </tr>
            <tr>
                <td>Grabación en video
                </td>
                <td>${buscarElemento(data.servicios.check, "Grabación_en_video")}</td>
    
            </tr>
            <tr>
                <td>Diseño póster</td>
                <td>${buscarElemento(data.servicios.check, "Diseño_póster")}</td>
    
            </tr>
            <tr>
                <td>Coffee Break </td>
                <td>${buscarElemento(data.servicios.check, "Coffeebreak")}</td>
    
            </tr>
            <tr>
                <th colspan="2">Servicios adicionales </th>
                
    
            </tr>
            <tr>
                <td>Micrófono Inalámbrico</td>
                <td>${data.servicios.cantidad.microfono_inalambrico != undefined ? data.servicios.cantidad.microfono_inalambrico : "0"}</td>
            </tr>
            <tr>
                <td>Micrófono Alámbrico </td>
                <td>${data.servicios.cantidad.microfono_alambrico != undefined ? data.servicios.cantidad.microfono_alambrico : "0"}</td>
            </tr>
            <tr>
                <td>Presidium </td>
                <td>${data.servicios.cantidad.presidium != undefined ? data.servicios.cantidad.presidium : "0"}</td>
            </tr>
            <tr>
                <td>Mamparas </td>
                <td>${data.servicios.cantidad.mamparas != undefined ? data.servicios.cantidad.mamparas : "0"}</td>
            </tr>
            <tr>
                <td>Sillas </td>
                <td>${data.servicios.cantidad.sillas != undefined ? data.servicios.cantidad.sillas : "0"}</td>
            </tr>
           
           ${buscarElemento(data.servicios.check, "Diseño_póster") === "Si" ? addDiseno(data) : ""}
            
           ${data.diseno.difusion != null && data.diseno.difusion.check != null ? addDdifucion(data) : ""}      
            
            
        </table>
    
        <div class="container">
            <div class="img-fluid">
                <img src="${Conf.servidor.footer}" alt="Registro Auditorio"
                    class="img-fluid">
            </div>
        </div>
    </body>
    
    </html>
    `
    //
    return html;
    //return null;
};

/**
 * agrega la estrucrua de el html  si esta habilitado  el check de diseño 
 * @param {*} data 
 */

function addDiseno(data) {
    //console.log("entro a llenar diseno")

    return `
            <tr>
                <th colspan="2">Diseño póster </th>             
            </tr>
            <tr>
                <td>Póster </td>
                <td>${buscarElemento(data.diseno.tipo, "Póster")}</td>
    
            </tr>
            <tr>
                <td>Constancia o Diploma electrónico</td>
                <td>${buscarElemento(data.diseno.tipo, "Constancia_o_Diploma_electrónico")}</td>
    
            </tr>
            <tr>
                <td>Logotipo</td>
                <td>${buscarElemento(data.diseno.tipo, "Logotipo")}</td>
    
            </tr>
            <tr>
                <td>Flyer</td>
                <td>${buscarElemento(data.diseno.tipo, "Flyer")}</td>
    
            </tr>
            <tr>
                <td>Banner RRSS</td>
                <td>${buscarElemento(data.diseno.tipo, "Banner_RRSS")}</td>
    
            </tr>                        
            <tr>
                <td>Resumen del evento</td>
                <td>${data.diseno.resumen}</td>
    
            </tr>
            <tr>
                <td>Nombre (s) completo (s) del (os) ponente(s) / Lugar de procedencia </td>
                <td>${data.diseno.nombreCompleto}</td>
    
            </tr>
            <tr>
                <td>Objetivo del evento </td>
                <td>${data.diseno.objetivoEvento}</td>
    
            </tr>
            <tr>
                <td>Departamento o dependencias que organizan</td>
                <td>${data.diseno.departamento}</td>
    
            </tr>   
    `
}

/**
 * agrega la estrucrua de el html  si esta habilitado  el check de diseño y difusion  
 * @param {*} data 
 */
function addDdifucion(data) {

    return `
    <tr>
    <th colspan="2">Difusión </th>
    
    </tr>
    <tr>
        <td>Vía Correo</td>
        <td>${buscarElemento(data.diseno.difusion.check, "viaCorreo")}</td>

    </tr>
    <tr>
        <td>Página web</td>
        <td>${buscarElemento(data.diseno.difusion.check, "pagina_web")}</td>

    </tr>
    <tr>
        <td>Twitter</td>
        <td>${buscarElemento(data.diseno.difusion.check, "twitter")}</td>

    </tr>
    <tr>
        <td>Facebook</td>
        <td>${buscarElemento(data.diseno.difusion.check, "facebook")}</td>

    </tr>
    <tr>
        <td>Instagram</td>
        <td>${buscarElemento(data.diseno.difusion.check, "instagram")}</td>

    </tr>
    <tr>
        <td>YouTube</td>
        <td>${buscarElemento(data.diseno.difusion.check, "youtube")}</td>

    </tr>
    <tr>
        <td>Impresión de cartel </td>
        <td>${buscarElemento(data.diseno.difusion.check, "impresion_cartel")}</td>
    </tr>
    <tr>
        <td>Formato banner digital</td>
        <td>${buscarElemento(data.diseno.difusion.check, "baner_digital")}</td>
    </tr>
    <tr>
        <td>Otro</td>
        <td>${buscarElementoKey(data.diseno.difusion.check, "otro")}</td>

    </tr>`;

}

/**
 * Busca si  esta el elemento  esta en el arreglo
 * @param {*} data 
 */
function buscarElemento(array, exprecion) {
    //console.log(" la exprecion regular ",exprecion,  "posicion ",array.indexOf(exprecion))
    let index = array.indexOf(exprecion);

    return index !== -1 ? "Si" : "No"
}

function formatoOtro(data) {
    //console.log("que es data, ", data)

    return data.tipo == 12 ? "Otro: " + data.texto : data.nombre

}
function formatoTipoEvento(evento) {
    console.log("que es ", evento)
    switch (evento) {
        case "0":
            return "Solo para estudiantes y/o comunidad Facultad";
        case "1":
            return "Es un evento abierto al público";
        case "2":
            return "Privado";
        default:
            return "Error";
    }

}
function buscarElementoKey(array, key) {
    //console.log("el arreglo: ", array)
    const temp = array.find(e => e["" + key] != undefined)
    return temp != undefined ? "Otro: " + temp.otro : "No";
}

function formatoFecha(fecha) {


    if (fecha != undefined && fecha != null) {
        tempFecha = new Date(fecha);
        let ano = tempFecha.getFullYear();
        let mes = tempFecha.getMonth() + 1;
        let dia = tempFecha.getDate();

        return `${dia < 10 ? "0" + dia : dia}/${mes < 10 ? "0" + mes : mes}/${ano}`;
    }

    return "";
}

module.exports = {

    generarHTML: generarHTML,
    asunto: asunto

};

