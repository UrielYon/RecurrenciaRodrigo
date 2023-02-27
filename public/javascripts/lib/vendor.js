/*******************************
 * inicio codigo limpio 
 *******************************/

import { data } from "jquery";

let auditorioNombre;
let idAuditorio;


export function auditorio_(callback) {
    const firm = "[auditorio_] ";
    $.ajax({
        url: "/auditorioss",
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            //console.log("datos" + json);            
            callback(false, json)
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema');
        },
    });
}
/**
 * guarda el nombre de el auditorio que selecciono
 */
$("#select-auditorioN").change(function changedSelect() {
    auditorioNombre = $(this).children("option:selected").attr("name");
    idAuditorio = $("#select-auditorioN").val()
    $("#fecha_buscar").attr("disabled", false);
});

$("#select-auditorioD").change(function changedSelect() {
    auditorioNombre = $(this).children("option:selected").attr("name");
    idAuditorio = $("#select-auditorioD").val()
    $("#buscar_diario").attr("disabled", false);
});

$("#select-auditorioR").change(function changedSelect() {
    auditorioNombre = $(this).children("option:selected").attr("name");
    idAuditorio = $("#select-auditorioR").val()
    $("#buscar_recurrente").attr("disabled", false);
});

/**
 * Recolecta los valores de el html para llenar el envento
 * y guardarlo 
 */
export function validar() {
    var tipo = $('.tipo:checked').val();
    /***
     * datos personales
     */
    var datoNombre = $("#nombre").val();
    var datoCargo = $("#cargo").val();
    var datoArea = $("#area").val();
    var datoInstitucion = $("#institucion").val();
    var datoTelefono = $("#telefono").val();
    var datoCorreo = $("#correo").val();
    /**
     * tipo evento 
     */
    //alert($('input:radio[name=tipo]:checked').val());
    var datoTipoEvento = $('.radio-tipo-evento:checked').val();
    var datoNombreTipoEvento = $('.radio-tipo-evento:checked').attr("text");
    var datoNombreTipoEventoCategoria = $('.radio-tipo-evento:checked').attr("categoria");

    /**
     * evento_datos
     */
    var datoNombreEvento = $("#nombreEvento").val();
    var datoId_espacio = idAuditorio;
    var datoFecha = $("#fecha").val();
    var datoHora = [];
    const $checkHora = $('.check-hora:checked');
    $.each($checkHora, function () {
        if (this.checked && !this.disabled) { //solo lo que no es bloqueados 
            //console.log($(this).val());
            datoHora.push($(this).val());
        }
    });
    //console.log(datoHora)
    var datoAsisitentes = $("#asistentes").val();
    var $radioTipoEvento = $('.datos-generales:checked');
    var datoTipo = $radioTipoEvento.val();
    var datoPagina = $("#pagina").val();
    var datoServicios = [];
    var $checkServicios = $(".check-servicios:checked");
    $.each($checkServicios, function () {
        datoServicios.push($(this).val());
    });
    var tempService = {};
    const $inputServiciosCantidad = $('.input-servicios-cantidad');
    $.each($inputServiciosCantidad, function () {
        tempService[$(this).attr("id")] = $(this).val()
    });
    var tempOtroTexto = null;
    console.log("otro ", datoTipoEvento == 12)
    if (datoTipoEvento == 12) {
        tempOtroTexto = $("#otro_texto").val();
    }
    //console.log(tempService)
    var datos = null;
    if (tipo == 1) {
        console.log("solo una vez")
        datos = {
            "tipo": tipo,
            "registro": {
                "nombre": "profesor",
                "fecha": new Date(),
                "status": -1
            },
            "datos_profesores": {
                "nombre": datoNombre,
                "cargo": datoCargo,
                "area": datoArea,
                "institucion": datoInstitucion,
                "telefono": datoTelefono,
                "correo": datoCorreo
            },
            "evento_tipo": {
                "tipo": datoTipoEvento,
                "nombre": datoNombreTipoEvento,
                "texto": tempOtroTexto,
                "categoria": datoNombreTipoEventoCategoria
            },
            "evento_datos": {
                "id_espacio": datoId_espacio,
                "auditorio": auditorioNombre,
                "nombre": datoNombreEvento,
                "fecha": datoFecha,
                "hora": datoHora,
                "asisitentes": datoAsisitentes,
                "tipo": datoTipo,
                "pagina": datoPagina,
            },
            "servicios": {
                "cantidad": tempService,
                "check": datoServicios
            },
            "diseno": {
                "tipo": null,
                "resumen": null,
                "nombreCompleto": null,
                "objetivoEvento": null,
                "departamento": null,
                "difusion": null,
            }


        }
    }
    if (tipo == 2) {
        console.log("alguna")
        var temp = [];
        const $checkDias = $('.radioRecurrente:checked');
        $.each($checkDias, function () {

            console.log("dia ", $(this).val());
            temp.push(Number.parseInt($(this).val()));

        });
        var datoHora = [];
        const $checkHora = $('.check-hora-recurrente:checked');
        $.each($checkHora, function () {
            if (this.checked && !this.disabled) { //solo lo que no es bloqueados 
                //console.log($(this).val());
                Number.parseInt(datoHora.push($(this).val()), 10);
            }
        });

        datos = {
            "fechaInicio": $("#fechaInicioRecurrente_inicio").val(),
            "fechaFin": $("#fechaFinRecurrente_fin").val(),
            "dias": temp,
            "tipo": tipo,
            "horario": datoHora,
            "idAuditorio": Number.parseInt(datoId_espacio),
            "registro": {
                "nombre": "profesor",
                "fecha": new Date(),
                "status": -1
            },
            "datos_profesores": {
                "nombre": datoNombre,
                "cargo": datoCargo,
                "area": datoArea,
                "institucion": datoInstitucion,
                "telefono": datoTelefono,
                "correo": datoCorreo
            },
            "evento_tipo": {
                "tipo": datoTipoEvento,
                "nombre": datoNombreTipoEvento,
                "texto": tempOtroTexto,
                "categoria": datoNombreTipoEventoCategoria
            },
            "evento_datos": {
                "id_espacio": datoId_espacio,
                "auditorio": auditorioNombre,
                "nombre": datoNombreEvento,
                "fecha": datoFecha,
                "hora": datoHora,
                "asisitentes": datoAsisitentes,
                "tipo": datoTipo,
                "pagina": datoPagina,
            },
            "servicios": {
                "cantidad": tempService,
                "check": datoServicios
            },
            "diseno": {
                "tipo": null,
                "resumen": null,
                "nombreCompleto": null,
                "objetivoEvento": null,
                "departamento": null,
                "difusion": null,
            }


        }
    }
    if (tipo == 3) {
        var datoHora = [];
        const $checkHora = $('.check-diario:checked');
        $.each($checkHora, function () {
            //console.log($(this).val());
            Number.parseInt(datoHora.push($(this).val()), 10);
        });
        console.log("diario")
        datos = {
            "idAuditorio": Number.parseInt(datoId_espacio),
            "fechaInicio": $("#fechaInicio_Diario").val(),
            "fechaFin": $("#fechaFin_Diario").val(),
            "tipo": tipo,
            "registro": {
                "nombre": "profesor",
                "fecha": new Date(),
                "status": -1
            },
            "datos_profesores": {
                "nombre": datoNombre,
                "cargo": datoCargo,
                "area": datoArea,
                "institucion": datoInstitucion,
                "telefono": datoTelefono,
                "correo": datoCorreo
            },
            "evento_tipo": {
                "tipo": datoTipoEvento,
                "nombre": datoNombreTipoEvento,
                "texto": tempOtroTexto,
                "categoria": datoNombreTipoEventoCategoria
            },
            "evento_datos": {
                "id_espacio": datoId_espacio,
                "auditorio": auditorioNombre,
                "nombre": datoNombreEvento,
                "fecha": datoFecha,
                "hora": datoHora,
                "asisitentes": datoAsisitentes,
                "tipo": datoTipo,
                "pagina": datoPagina,
            },
            "servicios": {
                "cantidad": tempService,
                "check": datoServicios
            },
            "diseno": {
                "tipo": null,
                "resumen": null,
                "nombreCompleto": null,
                "objetivoEvento": null,
                "departamento": null,
                "difusion": null,
            }
        }
    }

    /**
     * validar si selecciono diseño  
     * obtine datos 
     */
    if (datos.servicios.check.find(e => e == "Diseño_póster")) {



        datos.diseno.tipo = null;
        datos.diseno.resumen = $("#resumen").val();
        datos.diseno.nombreCompleto = $("#ponentes").val();
        datos.diseno.objetivoEvento = $("#objetvo_del_evento").val();
        datos.diseno.departamento = $("#departamento_o_dependencias").val();
        datos.diseno.difusion = {
            check: null
        }

        var dataServicios = [];
        let tempServiciosDiseno = $('.check-serviciosDiseño:checked');
        $.each(tempServiciosDiseno, function () {
            if (this.checked && !this.disabled) { //solo lo que no es bloqueados 
                //console.log($(this).val());
                dataServicios.push($(this).val());
            }
        });
        datos.diseno.tipo = dataServicios;

        // se agrega los que esta seleccionados 
        if ($('.difusion').is(':checked') && $(".checkDifusion:checked").length > 0) {
            let dataDifusion = [];
            let tempDifucion = $('.checkDifusion:checked');
            console.log("hola paso la lista de difusion ")

            $.each(tempDifucion, function () {
                if (this.checked && !this.disabled) { //solo lo que no es bloqueados 
                    //console.log($(this).val());
                    if ($(this).val() === "difusion_otro") {

                        dataDifusion.push({ "otro": $("#otro_difusion").val() })
                    } else {

                        dataDifusion.push($(this).val());
                    }
                }
                //console.log(Object.keys(datos.diseno));
                //console.log(Object.keys(datos.difusion))            
            });
            datos.diseno.difusion.check = dataDifusion;

            console.log(dataDifusion)

        }

    }


    console.log("data:", datos)


    console.log("cambio el otro", $('#aceptarTerminosYcondiciones').is(':checked'));
    if ($('#aceptarTerminosYcondiciones').is(':checked')) {
        $(".guarda").prop('disabled', false);

        // habilito boton 

        insert(datos, function (err, mensaje) {
            // $("#mesaje-exito").append('<div class="modal fade" id="mensaje" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Confirmar</h5> <button id = "aceptar"  type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-ocultar"> <div class="modal-body"> ' +
            //         JSON.stringify(mensaje.descripcion) + '</div> <div class="modal-footer"> <button id ="aceptar" type="button" class="btn btn-secondary" data-dismiss="modal">Aceptar</button> </div> </div> </div> </div> </div>')
            //     //alert(JSON.stringify(mensaje.descripcion));

            // $(".modal-ocultar-aceptar").hide();
            // $(".modal-mensaje").show();
            // $("#mensajeGuardar").text(JSON.stringify(mensaje.descripcion))                    
            if (err) {
                console.log("respueta enviar", mensaje)
                $(".modal-body").text("Ocurrio un error En el servidor");
            } else {
                if (mensaje.code === 500) { // erro al insertar  o correo 
                    $(".modal-body").text("Ocurrio un error En el servidor");

                } else {// se guardo con exito
                    $(".cierra-modal").hide();
                    $(".guarda").hide();
                    $(".respuestaModal").show();
                    $(".modal-body").text(mensaje.descripcion);

                    $('#modalMensjae').modal("show");// modal de admin 
                    //$(".modal-body").text(mensaje.descripcion);// modal de admin 
                }
            }

        });
    } else {
        console.log("Acepta Teminos ")
        $(".guarda").prop('disabled', true);

    }

}

$("#aceptar").click(function () {
    location.reload();
})

$('#recargar').click(function () {
    console.log("entro ");
    location.reload();
    //window.location.reload(true);
});

/**
 * limpiar div dinamicos 
 */
export function limpiar() {
    $("#horas").empty();
    $("#serviciosNumber").empty();
    $("#serviciosCheck").empty();
}
/**
 *  inserta  un evento
 * @param {*} datos 
 * @param {*} callback 
 */
export function insert(datos, callback) {
    const firm = "[insert] ";
    console.log(datos);
    // activa el sppiner 
    $("#spinnerLoading").addClass("is-active");
    $.ajax({
        url: "/insertar",
        type: 'POST',
        data: { data: JSON.stringify(datos) },
        success: function (json) {

            //alert("se guardo con exito");
             $(".modal-body").text(json.descripcion);
            // $("#exampleModalLongTitle").text("Exito");
            $('#modalMensjae').modal("show");
            $("#spinnerLoading").removeClass("is-active")
            callback(false, json);
        },
        error: function (json) {
            console.log("error ")
            // activa el sppiner 
            $("#spinnerLoading").removeClass("is-active")
            callback(true, json);
        }
    });
}

/**
 * genera un tabla con las fechas rellena los cuadros
 * de color si esta ocupados 
 * @param {*} fecha 
 * @param {*} auditorio 
 */
export function tabla(fecha, auditorio) {
    $("#spinnerLoading").addClass("is-active");
    console.log("mostrar",fecha, "Formato del auditorio", $("#select-auditorio").val());
    getFechas(fecha, function (err, f1, f2) {
        if (err) {
            console.log("error con la fecha");
        } else {
            console.log(f1 + ":" + f2 + " auditorio " + JSON.stringify(auditorio))
            var json = {
                fechaI: f1,
                fechaF: f2,
                auditorio: auditorio
            };

            $.ajax({
                type: 'POST',
                url: '/get/horario/',
                dataType: 'json',
                //contentType: 'application/json; charset=utf-8',
                data: {
                    js: JSON.stringify(json)
                },
                success: function (json) {
                    console.log("horas ajax[" + JSON.stringify(json) + "]");
                    //console.log(fecha);
                    checkHoras(json.admin, fecha);
                    generaHorario(json);
                    $("#tabla-footer").show();
                },
                error: function (xhr, status) {
                    $("#spinnerLoading").removeClass("is-active")
                    alert('Disculpe, existió un problema');
                },
            });
        }
    });
}

export function buscarDisponibilidad(request, callback) {

    console.log("Request ", request)
    $("#spinnerLoading").addClass("is-active");
    $.ajax({
        url: "/horario",
        type: 'POST',
        data: { datos: JSON.stringify(request) },
        success: function (json) {
            console.log("exito ", json.mensaje)
            //alert("se guardo con exito");
            $("#spinnerLoading").removeClass("is-active")
            callback(json.mensaje);
        },
        error: function (json) {
            console.log("error ");
            //callback (json.mensaje);
        }
    });
}

/**
 * genera el html de la tabla
 * @param {*} data 
 */
export function generaHorario(data) {
    //$("#horario").empty();
    const firm = "[generaHorario] ";

    var dias = ["Horario", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes",]
    var temp = 1;
    for (let j in data.admin) {
        dias[temp] += " " + j.split("-")[1];
        temp++;
        // if (("horario" != j)) {
        // }
    }
    var table_body = '<table class="table table-hover table-bordered">';
    var hora = 9;
    for (let i = 0; i < 11; i++) {
        table_body += '<thead><tr class="table-secondary">';
        for (let j = 0; j < dias.length; j++) {
            if (i == 0) { // titulo 
                table_body += '<td>';
                table_body += dias[j];
                table_body += '</td>';
            } else if (j == 0) { // llena horas 
                table_body += '<td>';
                table_body += hora + " a " + (++hora);
                table_body += '</td>';
            } else {
                table_body += `<td class="${(dias[j].toLowerCase().replace(" ", "-")) + "-" + (--hora)}">`;
                table_body += "";
                hora++;
                table_body += '</td>';
            }
        }
        table_body += '</tr></thead>';
    }
    table_body += '</table>';
    //console.log(fecha.getDate());

    $(".horario").empty().append(table_body);
    insertaDatosHorario(data.admin);
    $("#fecha_buscar").attr("disabled", false);
    $("#spinnerLoading").removeClass("is-active")
}

/**
 * marca las horas dependiendo 
 * @param {*} data 
 * @param {*} fecha 
 */
export function checkHoras(data, fecha) {
    if (data["d-" + (fecha.getDate() + 1)] != null) {

        data["d-" + (fecha.getDate() + 1)].forEach(element => {
            var hora = "#" + element;
            //console.log("---" + hora);
            $(hora).prop("checked", true);
            $(hora).attr("disabled", true);
        });
    }
}

/**
 * axiliar de generaHorario
 * colorea la tabla dependiendo el horario
 * @param {*} data 
 */
export function insertaDatosHorario(data) {
    //console.log("esto es lo que regres< = " + JSON.stringify(data));
    const dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];
    var i = 0;
    for (let j in data) {
        //console.log(dias[i])
        if (data[j] != null) {
            data[j].forEach(element => {

                $(`.${dias[i]}-${(j.split("-")[1])}-${element}`).css("background-color", "#E8442A");
                // color azul:#2AA198
                // color rojo #B58900
            });
        }
        i++;
    }
    $('.progress').hide();
    $('#validar').attr('disabled', false);
}

/**
 * auxiliar 
 * verificar si la fecha es de lunes a viernes 
 
 * ejemplo : 25 abril 2019 =25-04-19 es dia juevez 
 * regresa una coleccion de de el lunes 22 abril 2019 a viernes 26 abril 
 *
 * @param {*} fecha fecha 
 * @param {*} callback regresa una coleccion de reservaciones entre lunes a viernes de la fecha data
 */
export function getFechas(fecha, callback) {
    const firm = "[getFechas] ";
    var numDia = fecha.getDay();
    var fechaInicio = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - (numDia - 1));
    var fechaFin = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + (5 - numDia));
    // console.log(firm + "fecha inicio:" + fechaInicio);
    // console.log(firm + "fecha fin:" + fechaFin);
    callback(false, fechaInicio, fechaFin);
}

/*******************************
 *  fin de codigo limpio
 *******************************/