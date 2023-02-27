import bootstrap from 'bootstrap';
import '../js/datepicker/bootstrap-datepicker';
import '../js/datepicker/locales/bootstrap-datepicker.es';
import '../css/datepicker/datepicker.css';
import '../css/bootstrap/bootstrap-blanco.css';
import '../stylesheets/w2ui-1.5.rc1.css';
import '../stylesheets/style.css';
import {
    validar,
    buscarDisponibilidad,
    tabla
} from './lib/vendor'
import '../js/validate/jquery.validate.js'
import {
    data
} from 'jquery';


// $(document).ready(function() {
// });
$("#otro_texto").hide();
$('.check-diseño').hide();
$('.check-difusion').hide();
$('.check-difusion-editar').hide();
$('.rectangleOcupado').hide(); // rectangulo rojo crear evento 
$('.rectangleTexto').hide();
$('#otro_texto-editar').hide();
$("#otro_difusion").hide(); // input otro en la seccion de difusion 
$('#otro_difusion-editar').hide();
$('#modalAceptarCerrar').hide();


var auditorios;
var auditorio;
var status;
let fechaInicio = new Date();
var iterador2grip = 0;
var id_evento;
var nombreExel = "";
var dataExel = "";

fechaInicio.setDate(fechaInicio.getDate() - 1);
const columnasGrip = [{
    field: 'nombre',
    caption: 'Nombre',
    sortable: true,
    size: '14%'
}, {
    field: 'correo',
    caption: 'Correo',
    sortable: true,
    size: '12%'
}, {
    field: 'telefono',
    caption: 'Teléfono',
    sortable: true,
    size: '10%'
}, // datos evento
{
    field: 'fecha',
    caption: 'Fecha',
    sortable: true,
    size: '8%'
}, {
    field: 'nombre_evento',
    caption: 'Nombre Evento',
    sortable: true,
    size: '12%'
}, {
    field: 'auditorio',
    caption: 'Nombre Auditorio',
    sortable: true,
    size: '15%'
}, {
    field: 'nombre_Registro',
    caption: 'Nombre Registro',
    sortable: true,
    size: '15%'
}, {
    field: 'tipo',
    caption: 'Tipo Evento',
    sortable: true,
    size: '12%'
},
{
    field: 'horas',
    caption: 'Horas',
    sortable: true,
    size: '12%'
}
];

/*
 **************************************************
 **************************************************
 *         funciones pestaña Home 
 **************************************************
 **************************************************
 */
$(".datepicker").datepicker({
    format: 'yyyy-mm-dd',
    //todayHighlight: true,
    autoclose: true,
    daysOfWeekDisabled: [0, 6],
    language: 'es',
}).on('changeDate', function onChangedDate(e) {
    $("#fechaI").attr("disabled", false);
    $("#fechaF").attr("disabled", false);
});
/**
 * otiene el valor de el stusus en HOME
 */
$("#status").change(function () {
    status = $(this).val();
});
/**
 * Pestaña home
 * muestra los auditorios para buscarlos 
 */
auditorio_(function (err, data) {
    if (err) {
        console.log("Error servicio auditorio ", err);
    }
    if (data.status == 400) {
        //console.log("error")
    } else {
        //console.log("entras a buscar los aufitorios")
        data.forEach(element => {
            let checkbox = `<div class="custom-control custom-checkbox">
                                <input id="checkbox-auditorios-${element._id}" type="checkbox" name="auditorios" class="custom-control-input" value="${element._id}">
                                <label class="custom-control-label" for="checkbox-auditorios-${element._id}" >${element.nombre}</label>
                            </div>`;
            $("#auditorios").append(checkbox).hide().fadeIn(400);
            // $("#auditorios-reportes").append(checkbox).hide().fadeIn(400);
        });

        data.forEach(element => {
            let checkbox = `<div class="custom-control custom-checkbox">
                                <input id="checkbox-auditorios-reporte-${element._id}" type="checkbox" name="auditorios" class="custom-control-input" value="${element._id}">
                                <label class="custom-control-label" for="checkbox-auditorios-reporte-${element._id}" >${element.nombre}</label>
                            </div>`;
            //$("#auditorios").append(checkbox).hide().fadeIn(400);
            $("#auditorios-reportes").append(checkbox).hide().fadeIn(400);
        });
        auditorios = data;
        data.forEach(evento => {
            $("#select-auditorioN").append($('<option />', {
                value: evento._id,
                name: evento.nombre,
                text: evento.nombre + " - " + evento.descripcion,
            }));
            $("#select-auditorioD").append($('<option />', {
                value: evento._id,
                name: evento.nombre,
                text: evento.nombre + " - " + evento.descripcion,
            }));
            $("#select-auditorioR").append($('<option />', {
                value: evento._id,
                name: evento.nombre,
                text: evento.nombre + " - " + evento.descripcion,
            }));
        });
    }
});

$("#fecha").datepicker({
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    autoclose: true,
    daysOfWeekDisabled: [0, 6],
    //daysOfWeekDisabled: '0,6',
    startDate: fechaInicio,
    language: 'es',
}).on('changeDate', function onChangedDate(e) {
    console.log("tempral ", fechaInicio)
    $("#select-auditorioN").attr("disabled", false);

});

let fechaInicioRecurrente = new Date();
// selecciono la fecha  recurrente 
$("#fechaInicioRecurrente_inicio").datepicker({
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    autoclose: true,
    daysOfWeekDisabled: [0, 6],
    //daysOfWeekDisabled: '0,6',
    startDate: fechaInicioRecurrente,
    language: 'es',
}).on('changeDate', function onChangedDate(e) {
    fechaInicioRecurrente.setDate(fechaInicioRecurrente.getDate() + 5);
    $("#fechaFinRecurrente_fin").attr("disabled", false);
});

$("#fechaFinRecurrente_fin").datepicker({
    format: 'yyyy-mm-dd',

    autoclose: true,

    language: 'es',
}).on('changeDate', function onChangedDate(e) {
    console.log("eseteel s")
    $("#select-auditorioR").attr("disabled", false);
    //$("#fechaFinRecurrente_fin").attr("disabled", false);

});


let fechaInicioDiario = new Date();

$("#fechaInicio_Diario").datepicker({
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    autoclose: true,
    daysOfWeekDisabled: [0, 6],
    //daysOfWeekDisabled: '0,6',
    startDate: fechaInicioDiario,
    language: 'es',
}).on('changeDate', function onChangedDate(e) {

    fechaInicioDiario.setDate(fechaInicioDiario.getDate() + 5);

    console.log("La fecha inicio recuerente  ", fechaInicioDiario)

    $("#fechaFin_Diario").attr("disabled", false);


});

$("#fechaFin_Diario").datepicker({
    format: 'yyyy-mm-dd',

    autoclose: true,

    language: 'es',
}).on('changeDate', function onChangedDate(e) {
    console.log("eseteel s")
    $("#select-auditorioD").attr("disabled", false);
    //$("#fechaFinRecurrente_fin").attr("disabled", false);

});

/**
 *  Busca eventos y genera datos aleatorios 
 */
$("#fecha_buscar").click(function () {
    let $fecha = $("#fecha");
    var fecha = new Date($fecha.val());
    $('.ocultar').show();
    $('.progress').show();
    console.log("mostrar", fecha, "Formato del auditorio", $("#select-auditorioN").val());
    gneraHTML();
    tabla(fecha, $("#select-auditorioN").val());


});

/**
 * radio button  crear recurrente 
 */
$("#solo_una_vez").click(function () {
    console.log("radio solo una vez")
    $('.recurrente').hide();
    $('.diario').hide();
    $('.normal').show();
    $('.ocultar').hide();
    $('.calendario').hide();
    $('#select-auditorioD').val($('#select-auditorioD > option:first').val());
    $('#select-auditorioR').val($('#select-auditorioR > option:first').val());
    $("#buscar_diario").attr("disabled", true);
    $("#buscar_recurrente").attr("disabled", true);
})

/**
 * radio button  crear recurrente 
 */
$("#diario").click(function () {
    console.log("radio diario")
    $('.recurrente').hide();
    $('.diario').show();
    $('.normal').hide();
    $('.ocultar').hide();
    $('.calendario').hide();

    $('#select-auditorioR').val($('#select-auditorioR > option:first').val());
    $('#select-auditorioN').val($('#select-auditorioN > option:first').val());
    $("#buscar_recurrente").attr("disabled", true);
    $("#fecha_buscar").attr("disabled", true);
})
/**
 * radio button  crear recurrente 
 */

$("#recurrente").click(function () {
    console.log("radio recurrente")
    $('.recurrente').show();
    $('.diario').hide();
    $('.normal').hide();
    $('.ocultar').hide();
    $('.calendario').hide();

    $('#select-auditorioD').val($('#select-auditorioD > option:first').val());
    $('#select-auditorioN').val($('#select-auditorioN > option:first').val());
    $("#fecha_buscar").attr("disabled", true);
    $("#select-auditorioD").attr("disabled", true);
})
/**
 * pestaña home 
 * al precionar el boton de buscar 
 */
$("#buscar").click(function () {
    $("#spinnerLoading").addClass("is-active");
    $("#buscar").attr("disabled", true);
    iterador2grip++;
    $("#grid").remove();

    /**
     * obtecion de datos para la busquesda 
     */
    $("#tabla").append('<div id="grid" style="width: 100%; height: 400px;"></div>');
    var fechaI = $("#fechaI").val();
    var fechaF = $("#fechaF").val();
    var auditorios = [];
    $.each($("input[name='auditorios']:checked"), function () {
        auditorios.push(parseInt($(this).val()));
    });
    $("#mostrar").hide();
    $(".datosEvento").hide();

    const auditorioAll = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var queryTemp = {
        fechaInicio: new Date(fechaI),
        fechaFin: new Date(fechaF),
        auditorio: auditorios.length == 0 ? auditorioAll : auditorios,
        status: [parseInt(status)]
    };
    var queryTemp_ = {
        fechaInicio: new Date(2000, 11, 1),
        fechaFin: new Date(2019, 12, 12),
        auditorio: [1, 2, 3, 4],
        status: [parseInt(status)]
    };
    eventos(queryTemp, function (data) {
        //console.log(data);
        if (data.code == 200) {
            $("#spinnerLoading").removeClass("is-active")
            $('#grid').w2grid({
                name: 'temp' + iterador2grip,

                show: {
                    header: true,
                    lineNumbers: true,
                    show: {
                        lineNumbers: true
                    },
                    toolbar: true,
                    footer: true,
                    toolbarDelete: true,
                    //toolbarDelete: true
                },
                //sortData: [{ field: 'recid', direction: 'asc' }],
                columns: columnasGrip, //columnasGrip,
                records: data.descripcion,
                onClick: function (event) {
                    var grid = this;
                    event.onComplete = function () {
                        id_evento = grid.getSelection()[0];
                        //console.log("evento seleccionar " + id_evento);
                        if (id_evento != undefined) {
                            $("#mostrar").show();
                            var posicion = $("#mostrar").offset().top;
                            $("html, body").animate({
                                scrollTop: posicion
                            }, 2000);
                            $("#mostrar").click(function () {
                                $("#evento-cambiar-status").show();
                                $("#Editar-editar").show();
                                $('.rectangleOcupado').hide(); // rectangulo rojo crear evento 
                                $('.rectangleTexto').hide();
                                $(".progress").show();
                                getDatosEvento(id_evento);
                                var posicion = $("#fecha-editar").offset().top;
                                $("body").animate({
                                    scrollTop: posicion
                                }, 2000);
                                $(".datosEvento").show();
                                $("#guardar-nuevo-editar").hide();
                            });
                        } else {
                            $("#mostrar").hide();
                            $(".datosEvento").hide();
                        }
                    }
                },
                onDelete: function (event) {
                    var grid = this;
                    var id_evento = grid.getSelection()[0];
                    event.onComplete = function () {
                        console.log("Se elimina el elemento", id_evento);
                        eliminarBDEvento(id_evento);
                        //eventoDelete(id_evento)// cancela 
                    }
                },
            });
            $("#grid").w2grid().refresh();
            $("#buscar").attr("disabled", false);
        } else {
            //alert(data.descripcion);
            $("#spinnerLoading").removeClass("is-active")
            $("#buscar").attr("disabled", false);
        }
    });


});


/**
 *  Busca eventos y genera datos aleatorios 
 */

$("#buscar_recurrente").click(function () {
    const dias = $('.radioRecurrente:checked');
    console.log("dias ", dias)
    const horas = $('.check-hora-recurrente:checked');
    if (dias.length == 0 || horas.length == 0) {
        $('.modalError').show()
    } else {
        var datoHora = [];
        const $checkHora = $('.check-hora-recurrente:checked');
        $.each($checkHora, function () {
            if (this.checked && !this.disabled) { //solo lo que no es bloqueados 
                //console.log($(this).val());
                Number.parseInt(datoHora.push($(this).val()), 10);
            }
        });
        var datoDia = [];
        const $checkDias = $('.radioRecurrente:checked');
        $.each($checkDias, function () {
            if (this.checked && !this.disabled) { //solo lo que no es bloqueados 
                //console.log($(this).val());
                Number.parseInt(datoDia.push($(this).val()), 10);
            }
        });
        let tmp = {
            "tipo": "2",
            "fechaInicio": $("#fechaInicioRecurrente_inicio").val(),
            "fechaFin": $("#fechaFinRecurrente_fin").val(),
            "dias": datoDia,
            "auditorio": Number.parseInt(auditorio, 10),
            "horario": datoHora
        }
        let $fecha = $("#fechaInicioRecurrente_inicio");
        var fechaI = new Date($fecha.val());
        console.log("fecha", fechaI);
        console.log("mostrar", fecha, "Formato del auditorio", $("#select-auditorioR").val());
        console.log("antes de enviar");
        //tabla(fecha, $("#select-auditorioR").val());
        buscarDisponibilidad(tmp, function (resultado) {
            //modalInicio

            if (resultado.disponible) {
                console.log("se puede  ", auditorios)
                // muestra el formulario
                tabla(fechaI, $("#select-auditorio").val());
                $(".ocultar").show();
                auditorios.forEach(element => {
                    if (element._id == auditorio) {
                        auditorio = element;
                    }
                });
                let codeNumber = '<div class=row> <div>';
                var iteradorCantidad = 0;
                console.log("servico cantidad ", auditorio.servicios);
                if (auditorio.servicios != undefined && auditorio.servicios.cantidad != undefined) {

                    auditorio.servicios.cantidad.forEach(element => {
                        // var input = '<br> ' + element + ':<br> <input type="" name="services" value=0 id=' + element + '>';        
                        codeNumber += iteradorCantidad % 2 == 0 ? '</div><div class="col-lg-6">' : '';
                        let placeholderText = getPlaceholderServiciosAdicionales(element.toString().toLowerCase());


                        console.log("placeholderText! ", placeholderText)
                        codeNumber += `<div class="form-group">
                       <a  data-toggle="tooltip" data-placement="right" title="Favor de indicar con número ordinal">
                       <label class="col-form-label" for="input-servicios-cantidad-${element.toString().toLowerCase()}">${element.replace("_", " ")}</label>
                       <img src="../public/images/exclamacion1.svg"  width="20" height="20">
                       </a>            
                           <input id="${element.toString().toLowerCase()}" name="serviciosNumber" type="number" class="form-control input-servicios-cantidad" placeholder="${placeholderText}" autocomplete="off">
                       
                                   </div>`
                        iteradorCantidad++;
                        if (auditorio.servicios.cantidad.length == iteradorCantidad) {
                            codeNumber += '</div> </div>';
                            $("#serviciosNumber").append(codeNumber);
                        }

                    });

                }

                //console.log("servicios check ", auditorio.servicios.check)
                if (auditorio.servicios != undefined && auditorio.servicios.check != undefined) {
                    let codeCheck = '<div class=row> <div>';
                    var iteradorCheck = 0;
                    auditorio.servicios.check.forEach(element => {
                        // var input = '<input type="checkbox" name="servicios" value =' + element + ' > ' + element + ' <br>';
                        codeCheck += iteradorCheck % 2 == 0 ? '</div><div class="col-lg-3">' : '';
                        codeCheck += `<div class="custom-control custom-checkbox">
                                       <input type="checkbox" class="custom-control-input check-servicios" value="${element}" id="check-servicios-${element.toString().toLowerCase()}">
                                       <label class="custom-control-label" for="check-servicios-${element.toString().toLowerCase()}">${element.replace("_", " ").replace("_", " ")}</label>
                                   </div>`;
                        iteradorCheck++;
                        if (auditorio.servicios.check.length == iteradorCheck) {
                            codeCheck += '</div> </div>';
                            $("#serviciosCheck").append(codeCheck);
                        }

                    });


                }
                const guardar = $('#validar');
                guardar.attr("disabled", false);

                $("#check-servicios-diseño_póster").change(function () {

                    if ($('#check-servicios-diseño_póster').is(':checked')) {
                        //alert("hubo cambio");
                        $('.check-diseño').show();
                        checkDiseno = true;
                    } else {
                        $('.check-diseño').hide();
                        checkDiseno = false;
                    }
                })
            } else {
                console.log("error ", resultado.mensaje)

                $('#errorPeticion').modal("show");

            }
        });
        $('.calendario').show();
    }
});


/**
 *  Busca eventos y genera datos aleatorios 
 */
$("#buscar_diario").click(function () {

    var datoHora = [];
    const $checkHora = $('.check-diario:checked');
    $.each($checkHora, function () {
        //console.log($(this).val());
        Number.parseInt(datoHora.push($(this).val()), 10);
    });
    if ($checkHora.length == 0) {
        $('.modalErrorDiario').show()

    } else {

        let tmp = {
            "tipo": "3",
            "fechaInicio": $("#fechaInicio_Diario").val(),
            "fechaFin": $("#fechaFin_Diario").val(),
            "auditorio": Number.parseInt(auditorio, 10),
            "horario": datoHora
        }
        console.log("antes de enviar", tmp)
        buscarDisponibilidad(tmp, function (resultado) {
            //modalInicio

            if (resultado.disponible) {
                console.log("se puede  ", auditorios)
                // muestra el formulario
                console.log("mostrar", fecha, "Formato del auditorio", $("#select-auditorioR").val());
                let $fecha = $("#fechaInicio_Diario");
                var fecha = new Date($fecha.val());
                tabla(fecha, $("#select-auditorio").val());

                console.log("fechaInicioDiario", fecha);

                $(".ocultar").show();
                auditorios.forEach(element => {
                    if (element._id == auditorio) {
                        auditorio = element;
                    }
                });
                let codeNumber = '<div class=row> <div>';
                var iteradorCantidad = 0;
                console.log("servico cantidad ", auditorio.servicios);
                if (auditorio.servicios != undefined && auditorio.servicios.cantidad != undefined) {

                    auditorio.servicios.cantidad.forEach(element => {
                        // var input = '<br> ' + element + ':<br> <input type="" name="services" value=0 id=' + element + '>';        
                        codeNumber += iteradorCantidad % 2 == 0 ? '</div><div class="col-lg-6">' : '';
                        let placeholderText = getPlaceholderServiciosAdicionales(element.toString().toLowerCase());


                        console.log("placeholderText! ", placeholderText)
                        codeNumber += `<div class="form-group">
                        <a  data-toggle="tooltip" data-placement="right" title="Favor de indicar con número ordinal">
                        <label class="col-form-label" for="input-servicios-cantidad-${element.toString().toLowerCase()}">${element.replace("_", " ")}</label>
                        <img src="../public/images/exclamacion1.svg"  width="20" height="20">
                        </a>            
                            <input id="${element.toString().toLowerCase()}" name="serviciosNumber" type="number" class="form-control input-servicios-cantidad" placeholder="${placeholderText}" autocomplete="off">

                                    </div>`
                        iteradorCantidad++;
                        if (auditorio.servicios.cantidad.length == iteradorCantidad) {
                            codeNumber += '</div> </div>';
                            $("#serviciosNumber").append(codeNumber);
                        }

                    });

                }

                //console.log("servicios check ", auditorio.servicios.check)
                if (auditorio.servicios != undefined && auditorio.servicios.check != undefined) {
                    let codeCheck = '<div class=row> <div>';
                    var iteradorCheck = 0;
                    auditorio.servicios.check.forEach(element => {
                        // var input = '<input type="checkbox" name="servicios" value =' + element + ' > ' + element + ' <br>';
                        codeCheck += iteradorCheck % 2 == 0 ? '</div><div class="col-lg-3">' : '';
                        codeCheck += `<div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input check-servicios" value="${element}" id="check-servicios-${element.toString().toLowerCase()}">
                                        <label class="custom-control-label" for="check-servicios-${element.toString().toLowerCase()}">${element.replace("_", " ").replace("_", " ")}</label>
                                    </div>`;
                        iteradorCheck++;
                        if (auditorio.servicios.check.length == iteradorCheck) {
                            codeCheck += '</div> </div>';
                            $("#serviciosCheck").append(codeCheck);
                        }

                    });


                }
                const guardar = $('#validar');
                guardar.attr("disabled", false);

                $("#check-servicios-diseño_póster").change(function () {

                    if ($('#check-servicios-diseño_póster').is(':checked')) {
                        //alert("hubo cambio");
                        $('.check-diseño').show();
                        checkDiseno = true;
                    } else {
                        $('.check-diseño').hide();
                        checkDiseno = false;
                    }
                })
            } else {
                console.log("error ", resultado.mensaje)

                $('#errorPeticion').modal("show");
            }
        });
        $('.calendario').show();
    }

});

$("#eliminar-nuevo-editar").click(function () {
    console.log("Se va a eliminar el elemtno  " + id_evento)
    eventoDelete(id_evento);
});

/**
 * eliminar por completo el reten 
 * @param {*} data 
 * @param {*} callback 
 */
function eliminarBDEvento(folio) {
    const firm = "[eventoDelete ]"
    console.log(firm + folio)
    $("#spinnerLoading").addClass("is-active");
    $.ajax({
        url: "/evento/deleteDB",
        type: "POST",
        dataType: "json",
        data: {
            id: folio
        },
        success: function (data) {
            $("#spinnerLoading").removeClass("is-active")
            console.log("exito")
            console.log(data)
            //alert(firm,data.descripcion);
            $(".modal-body").text(data.descripcion);
            $("#exampleModalLongTitle").text("Exito");
            $('#modalMensjae').modal("show");
            $("#modalAceptar").click(function () {
                $('#modalMensjae').modal("hide");
                //location.reload();
            });
            //location.reload();
        },
        error: function (data) {
            //alert(firm,data.descripcion);
            $("#spinnerLoading").removeClass("is-active")
            $(".modal-body").text(data.descripcion);
            $("#exampleModalLongTitle").text("Error");
            $('#modalMensjae').modal("show");
            $("#modalAceptar").click(function () {
                //$('#modalMensjae').modal("hide");
                location.reload();
            });
            //location.reload();
        }
    });


}
/**
 ************** Cambiar el estatus para eidtar
 */


/**
 * pestaña home  editar evento 
 * al presionar el boton de aceptar 
 */
$('#evento-cambiar-status').click(function () {
    aceptar(id_evento);
});
/**
 * oculata los datos de el evento 
 */
$("#cancelar-nuevo-editar").click(function () {
    limpiarDatosEditar();
    $("#guardar-nuevo-editar").hide();
    $(".datosEvento").hide();
    // fecha evento
    $("#fechaI").attr("disabled", true);
    $('#fecha-editar').attr("disabled", true);
    $('#select-auditorio-editar').attr("disabled", true);
    // Datos perosnales
    $('#nombre-editar').attr("disabled", true);
    $('#cargo-editar').attr("disabled", true);
    $('#area-editar').attr("disabled", true);
    $('#institucion-editar').attr("disabled", true);
    $('#telefono-editar').attr("disabled", true);
    $('#correo-editar').attr("disabled", true);
    // tipo evento y fatoa genera
    $('#nombreEvento-editar').attr("disabled", true);
    $('#asistentes-editar').attr("disabled", true);
    $('#pagina-editar').attr("disabled", true);

});



/**
 * cambia los imputs a enable de mostart y 
 */
$("#Editar-editar").click(function () {
    $("#Editar-editar").hide();
    $("#evento-cambiar-status").hide();
    $("#guardar-nuevo-editar").show();
    // $("#fechaI").attr("disabled", false);
    // $('#fecha-editar').attr("disabled", false);
    // $('#select-auditorio-editar').attr("disabled", false);
    // // Datos Peronales
    // $('#nombre-editar').attr("disabled", false);
    // $('#cargo-editar').attr("disabled", false);
    // $('#area-editar').attr("disabled", false);
    // $('#institucion-editar').attr("disabled", false);
    // $('#telefono-editar').attr("disabled", false);
    // $('#correo-editar').attr("disabled", false);
    // // tipo evento y fatoa genrea evento
    // $('#nombreEvento-editar').attr("disabled", false);
    // $('#asistentes-editar').attr("disabled", false);
    // $('#pagina-editar').attr("disabled", false);

    // //*tipo dieseño 
    // $('#resumen-editar').attr("disabled", false);
    // $('#ponentes-editar').attr("disabled", false);
    $('.editar').attr("disabled", false);
    $('.input-servicios-cantidad-editar').attr("disabled", false);

});

/**
 * pestaña home 
 * cambia de status el folio 
 * @param {*} folio 
 */
function aceptar(folio) {
    const firm = "[acptar ]"
    console.log(firm + folio)
    $("#spinnerLoading").addClass("is-active");
    $.ajax({
        url: "/change/status",
        type: "POST",
        dataType: "json",
        data: {
            id: folio
        },
        success: function (data) {
            $("#spinnerLoading").removeClass("is-active");
            //console.log(Object.keys(data))
            //            alert(data.descripcion);
            console.log("ejemplo de el error ", data)
            if (data.code == 400) { // no se c
                $("#modalAceptarCerrar").show();
                $("#modalAceptar").hide();
            }
            $(".modal-body").text(data.descripcion);
            $("#exampleModalLongTitle").text("Exito");
            $('#modalMensjae').modal("show");
            $("#modalAceptar").click(function () {

                location.reload();
            });
        },
        error: function (data) {
            //alert(data.descripcion);
            //location.reload();
            $("#spinnerLoading").removeClass("is-active")
            $(".modal-body").text(data.descripcion);
            $("#exampleModalLongTitle").text("Error");
            $('#modalMensjae').modal("show");
            $("#modalAceptar").click(function () {

                location.reload();
            });
        }
    });
}

$('#evento-delete').click(function () {
    console.log("valor " + id_evento);
    eventoDelete(id_evento);
});


/*
 **************************************************
 **************************************************
 *               funciones pestaña Crear evento 
 **************************************************
 **************************************************
 */

/**
 * obtien el el valor de el id de el auditorio 
 */
$(".datepicker.calendario-nuevo").datepicker({
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    autoclose: true,
    daysOfWeekDisabled: [0, 6],
    startDate: fechaInicio,
    language: 'es',
}).on('changeDate', function onChangedDate(e) {
    $("#select-auditorio").attr("disabled", false);
});
$("#select-auditorioN").change(function changedSelect() {
    auditorio = $(this).val();
});
/**
 *  Home, Busca eventos y genera datos dinamicamente
 */
$("#fecha_buscar").click(function () {
    $('.progress').show();
    let $fecha = $("#fecha");
    //console.log($("#fecha").val())
    var fecha = new Date($("#fecha").val());
    $('.ocultar').show();

    generaHTML();
    tabla(fecha, $("#select-auditorio").val());

});

/**
 * Crear Evento 
 * genera el html y lo muestra para crear eventos 
*/
function generaHTML() {
    //console.log("..." + auditorios)
    limpiar();
    auditorios.forEach(element => {
        if (element._id == auditorio) {
            auditorio = element;
        }
    });
    let $fecha = $("#fecha");
    let date = new Date($fecha.val());
    // Revisa si el dia que escojio es entre semana o virnes //tiene restricion por el dia 
    if (date.getDay() == 4 && auditorio.horario.viernes != undefined) {
        let h = '<div class=row> <div>';
        var iterador = 0;
        auditorio.horario.viernes.forEach(element => {
            // var h = element + '<input type="checkbox" name="horas" value="' + element + '" class= hora-' + element + '>'
            h += iterador % 2 == 0 ? '</div><div class="col-lg-2">' : '';
            h += `<div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input check-hora" value="${element}" id="${element}" name="horas" >
                        <label class="custom-control-label" for="${element}" >${element} horas</label>
                    </div>`;
            iterador++;
            if (auditorio.horario.viernes.length == iterador) {
                h += '</div> </div>';
                //console.log("-------------" + h)
                $("#horas").append(h);
            }
        });
    } else { // si es entre semana 
        let h = '<div class=row> <div>';
        var iterador = 0;
        if (auditorio.horario.entreSemana != undefined) {

            auditorio.horario.entreSemana.forEach(element => {
                // var h = element + '<input type="checkbox" name="horas" value="' + element + '" class= hora-' + element + '>'
                //console.log(i + "-" + h)
                h += iterador % 2 == 0 ? '</div><div class="col-lg-2">' : '';
                h += `<div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input check-hora" value="${element}" id="${element}" name="horas">
                            <label class="custom-control-label" for="${element}" >${element} horas</label>
                        </div>`;
                iterador++;
                if (auditorio.horario.entreSemana.length == iterador) {
                    h += '</div> </div>';
                    //console.log("-------------" + h)
                    $("#horas").append(h);
                }
            });

        }
    }
    /**
     * acomoda los servicios dinamicos en columnas 
     */
    let codeNumber = '<div class=row> <div>';
    var iteradorCantidad = 0;
    if (auditorio.servicios != undefined && auditorio.servicios.cantidad != undefined) {
        auditorio.servicios.cantidad.forEach(element => {
            // var input = '<br> ' + element + ':<br> <input type="" name="services" value=0 id=' + element + '>';
            codeNumber += iteradorCantidad % 2 == 0 ? '</div><div class="col-lg-6">' : '';
            codeNumber += `<div class="form-group">
            <a  data-toggle="tooltip" data-placement="right" title="Favor de indicar con número ordinal">
            <label class="col-form-label" for="input-servicios-cantidad-${element.toString().toLowerCase()}">${element.replace("_", " ")}</label>
            <img src="../public/images/exclamacion1.svg"  width="20" height="20">
            </a>
                            <input id="${element.toString().toLowerCase()}" name="serviciosNumber" type="number" class="form-control input-servicios-cantidad" placeholder="" autocomplete="off">
                        </div>`
            iteradorCantidad++;
            if (auditorio.servicios.cantidad.length == iteradorCantidad) {
                codeNumber += '</div> </div>';
                $("#serviciosNumber").append(codeNumber);
            }

        });


    }
    let codeCheck = '<div class=row> <div>';
    var iteradorCheck = 0;
    console.log("Los datos check " + auditorio.servicios.check);
    if (auditorio.servicios != undefined && auditorio.servicios.check != undefined) {

        auditorio.servicios.check.forEach(element => {
            // var input = '<input type="checkbox" name="servicios" value =' + element + ' > ' + element + ' <br>';
            codeCheck += iteradorCheck % 2 == 0 ? '</div><div class="col-lg-3">' : '';
            codeCheck += `<div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input check-servicios" value="${element}" id="check-servicios-${element.toString().toLowerCase()}">
                            <label class="custom-control-label" for="check-servicios-${element.toString().toLowerCase()}">${element.replace("_", " ").replace("_", " ")}</label>
                        </div>`;
            iteradorCheck++;
            if (auditorio.servicios.check.length == iteradorCheck) {
                codeCheck += '</div> </div>';
                $("#serviciosCheck").append(codeCheck);
            }
        });

    }
    $('#guardar-nuevo').attr("disabled", false);
    $("#check-servicios-diseño_póster").change(function () {

        if ($('#check-servicios-diseño_póster').is(':checked')) {
            //alert("hubo cambio");
            $('.check-diseño').show();
            checkDiseno = true;
        } else {
            $('.check-diseño').hide();
            checkDiseno = false;
        }
    })
    $('.rectangleTexto').show(); // muestra el recuadro rojo de ocupado
    $('.rectangleOcupado').show(); // muestra el recuadro rojo de ocupado
}

function getPlaceholderServiciosAdicionales(temp) {
    switch (temp) {
        case 'presidium':
            return "Número de participantes en el presidium";
        case 'mamparas':
            return "Número de mamparas";


        default:
            return "";
    }
}

$.validator.addMethod('correoEXP', function (value) {
    console.log("entro a exprecion regular")
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@ciencias.unam.mx/.test(value);
}, 'El correo debe de ser el institucional');

$('#commentForm').validate({
    rules: {
        nombre: {
            required: true,
            minlength: 2,
            maxlength: 40,
        },
        cargo: {
            required: true,
            minlength: 2,
            maxlength: 40,
        },
        area: {
            required: true,
            minlength: 2,
            maxlength: 40,
        },
        insitutucion: {
            required: true,
            minlength: 2,
            maxlength: 40,
        },
        telefono: {
            required: true,
            minlength: 10,
            maxlength: 10,
        },
        correo: {
            required: true,
            correoEXP: "El email es requerido"
        },
        nombre_evento: {
            required: true,
            minlength: 2,
            maxlength: 250,
        },
        asistentes: {
            required: true,
            range: [1, 420]
        },
        pagina: {
            required: false,
            minlength: 7,
            maxlength: 80,
        },
        horas: {
            required: true,
            minlength: 1
        },
        serviciosNumber: {
            range: [0, 30]
        },
        resumen: { // <- NAME attribute of the input
            required: {
                depends: function () {
                    return $('#check-servicios-diseño_póster').is(':checked');
                }
            }
        },
        ponentes: { // <- NAME attribute of the input
            required: {
                depends: function () {
                    return $('#check-servicios-diseño_póster').is(':checked');
                }
            }
        },
        objetvo_del_evento: { // <- NAME attribute of the input
            required: {
                depends: function () {
                    return $('#check-servicios-diseño_póster').is(':checked');
                }
            }
        },
        departamento_o_dependencias: { // <- NAME attribute of the input
            required: {
                depends: function () {
                    return $('#check-servicios-diseño_póster').is(':checked');
                }
            }
        },
        departamento_o_dependencias: { // <- NAME attribute of the input
            required: {
                depends: function () {
                    return $('#check-servicios-diseño_póster').is(':checked');
                }
            }
        },
        tipoDiseno: {
            required: true,
            minlength: 1
        },
        "difucion-check": {
            required: {
                depends: function () {
                    return $('#Difusion').is(':checked');
                }
            },

            minlength: 1
        },
        otro_texto: {
            required: {
                depends: function () {
                    return $('#customRadio12').is(':checked');
                }
            },
            minlength: 2,
            maxlength: 50
        },
        otro_difusion: {
            required: {
                depends: function () {
                    return $('#difusion_otro').is(':checked');
                },
                minlength: 2,
                maxlength: 50
            }
        }
    },
    messages: {
        nombre: {
            required: "Nombre es requerido",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 41 ",
        },
        cargo: {
            required: "El Cargo es requerido",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 41 ",
        },
        area: {
            required: "El area de adscripcion es requerido",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 41 ",
        },
        insitutucion: {
            required: "La insitutución es requerida",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 41 ",
        },
        telefono: {
            required: "El teléfono es requerido",
            minlength: "La longitud debe de ser 10",
            maxlength: "La longitud debe de ser 10",
        },
        correo: {
            required: "El correo es requerido",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 41 ",
        },
        nombre_evento: {
            required: "Campo requerido ",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 250 ",
        },
        asistentes: {
            required: "Campo requerido ",
            range: "el numero de asistentes de 1 persona a 420"
        },
        pagina: {
            minlength: "La longitud debe de ser mayor a 7",
            maxlength: "La longitud debe de ser menor a 80 ",
        },
        horas: {

            required: "debes de elegir una hora ",
            minlength: "erro"
        },
        serviciosNumber: {
            range: "el rango es entre 1 y 30"
        },
        resumen: {
            required: "Este campo debe de ser obligatorio",
        },
        ponentes: {
            required: "Este campo debe de ser obligatorio",
        },
        objetvo_del_evento: {
            required: "Este campo debe de ser obligatorio",
        },
        departamento_o_dependencias: {
            required: "Este campo debe de ser obligatorio",
        },
        tipoDiseno: {
            required: "Este campo debe de ser obligatorio",
        },
        "difucion-check": {
            required: "Este campo debe de ser obligatorio",
        },
        otro_texto: {
            required: "Este campo debe de ser obligatorio",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 40 ",

        },
        otro_difusion: {
            required: "Este campo debe de ser obligatorio",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 40 ",

        }


    },
    submitHandler: function (form, event) {

        event.preventDefault();
        //form.submit();

        console.log("exito");

        guardarNuevo();;
    }
});

function guardarNuevo() {
    /***
     * datos personales
     */
    var auditorioNombre = $('#select-auditorio').find(":selected").attr('name');
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
    var datoNombreEvento = $("#nombre_evento").val();
    var datoId_espacio = $("#select-auditorio").val();
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
    //console.log(tempService)
    var tempOtroTexto = null;
    if (datoTipoEvento == 12) {
        tempOtroTexto = $("#otro_texto").val();
    }
    var datos = {
        registro: {
            nombre: "Operador",
            fecha: new Date(),
            status: -1
        },
        datos_profesores: {
            nombre: datoNombre,
            cargo: datoCargo,
            area: datoArea,
            institucion: datoInstitucion,
            telefono: datoTelefono,
            correo: datoCorreo
        },
        evento_tipo: {
            tipo: datoTipoEvento,
            nombre: datoNombreTipoEvento,
            texto: tempOtroTexto,
            categoria: datoNombreTipoEventoCategoria
        },
        evento_datos: {
            id_espacio: datoId_espacio,
            auditorio: auditorioNombre,
            nombre: datoNombreEvento,
            fecha: datoFecha,
            hora: datoHora,
            asisitentes: datoAsisitentes,
            tipo: datoTipo,
            pagina: datoPagina,
        },
        servicios: {
            cantidad: tempService,
            check: datoServicios
        },
        diseno: {
            tipo: null,
            resumen: null,
            nombreCompleto: null,
            objetivoEvento: null,
            departamento: null,
            difusion: null,
        }


    }
    console.log(datos);
    /**
     * validar si selecciono diseño  
     * obtine datos 
     */
    if (datos.servicios.check.find(e => e == "Diseño_póster")) {


        datos["diseno"] = {
            tipo: null,
            resumen: $("#resumen").val(),
            nombreCompleto: $("#ponentes").val(),
            objetivoEvento: $("#objetvo_del_evento").val(),
            departamento: $("#departamento_o_dependencias").val(),
            difusion: {
                check: null
            }
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
            var dataDifusion = [];
            let tempDifucion = $('.checkDifusion:checked');
            console.log("hola paso ")

            $.each(tempDifucion, function () {
                if (this.checked && !this.disabled) { //solo lo que no es bloqueados 
                    //console.log($(this).val());
                    if ($(this).val() === "difusion_otro") {

                        dataDifusion.push({
                            "otro": $("#otro_difusion").val()
                        })
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
    console.log("se va a guardar ", datos)

    insert(datos);
}

/**
 * En  la seccion de tipo evento  muestra el campo para insertar un texto
 */
$(".radio-tipo-evento").change(function () {
    console.log("cambio el otro", $('#customRadio12').is(':checked'));
    if ($('#customRadio12').is(':checked')) {

        $('#otro_texto').show();
    } else {
        $('#otro_texto').hide();
    }
});
/**
 * En la seccion de servicios adicionales  muestra campos faltantes
 */
$("#Difusion").change(function () {

    if ($('#Difusion').is(':checked')) {

        $('.check-difusion').show();
    } else {
        $('.check-difusion').hide();
    }
})

/**
 * auxuliar de guardar
 * @param {*} datos 
 * @param {*} callback 
 */
function insert(datos, callback) {
    const firm = "[insert] ";
    //console.log(firm + datos.registro.nombre)
    $("#spinnerLoading").addClass("is-active");
    $.ajax({
        url: "/insert",
        type: 'POST',
        dataType: 'json',
        data: {
            a: JSON.stringify(datos)
        },
        success: function (json) {
            $("#spinnerLoading").removeClass("is-active")
            $(".modal-body").text(json.descripcion);
            $("#exampleModalLongTitle").text("Exito");
            $('#modalMensjae').modal("show");
            //callback(false, json);
            $("#modalAceptar").click(function () {

                location.reload();
            });
        },
        error: function (json) {
            $("#spinnerLoading").removeClass("is-active")
            $(".modal-body").text(json.descripcion);
            $("#exampleModalLongTitle").text("Error");
            $('#modalMensjae').modal("show");
            $("#modalAceptar").click(function () {

                location.reload();
            });
            //callback(true, json);
        }
    });
}
/**
 * pestaña Crear evento
 * auxiliar de gneraHTML
 * limpia los campos 
 */
function limpiar() {
    $("#horas").empty();
    $("#serviciosCheck").empty();
    $("#serviciosNumber").empty();
    //$("#services").append('<div id="serviciosNumber"></div><div id="serviciosCheck"></div>');
}

function gneraHTML() {
    //console.log("..." + auditorios)
    $("#fecha_buscar").attr("disabled", false);
    limpiar();
    console.log("auditorio.horario, ", auditorio)
    auditorios.forEach(element => {
        if (element._id == auditorio) {
            auditorio = element;
        }
    });
    let $fecha = $("#fecha");
    let date = new Date($fecha.val());
    // Revisa si el dia que escojio es entre semana o virnes //tiene restricion por el dia 
    if (date.getDay() == 4 && auditorio.horario.viernes != undefined) {
        let h = '<div class=row> <div>';
        var iterador = 0;
        auditorio.horario.viernes.forEach(element => {
            // var h = element + '<input type="checkbox" name="horas" value="' + element + '" class= hora-' + element + '>'

            let tempHora = element;
            h += iterador % 2 == 0 ? '</div><div class="col-lg-2">' : '';
            h += `<div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input check-hora" value="${element}" id="${element}" name= "horas">
                        <label class="custom-control-label" for="${element}" >${element}:00 - ${++tempHora}:00 </label>
                    </div>`;
            iterador++;
            if (auditorio.horario.viernes.length == iterador) {
                h += '</div> </div>';
                console.log("-------------" + h)
                $("#horas").append(h);
            }
        });
    } else { // si es entre semana 
        let h = '<div class=row> <div>';
        var iterador = 0;
        console.log("auditorio.horario, ", auditorio)
        if (auditorio!= undefined || auditorio.horario.entreSemana != undefined) {

            auditorio.horario.entreSemana.forEach(element => {
                // var h = element + '<input type="checkbox" name="horas" value="' + element + '" class= hora-' + element + '>'
                //console.log(i + "-" + h)
                let tempHora = element;
                h += iterador % 2 == 0 ? '</div><div class="col-lg-2">' : '';
                h += `<div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input check-hora" value="${element}" id="${element}" name= "horas">
                            <label class="custom-control-label" for="${element}" >${element}:00 - ${++tempHora}:00 </label>
                        </div>`;
                iterador++;
                if (auditorio.horario.entreSemana.length == iterador) {
                    h += '</div> </div>';
                    //console.log("-------------" + h)
                    $("#horas").append(h);
                }
            });

        }
        $('.calendario').show();
        //console.log("calendario",calendario);
    }
    /**
     * acomoda los servicios dinamicos en columnas 
     */
    let codeNumber = '<div class=row> <div>';
    console.log("codeNumber", codeNumber);
    var iteradorCantidad = 0;
    console.log("servico cantidad ", auditorio.servicios);

    if (auditorio.servicios != undefined && auditorio.servicios.cantidad != undefined) {

        auditorio.servicios.cantidad.forEach(element => {
            // var input = '<br> ' + element + ':<br> <input type="" name="services" value=0 id=' + element + '>';        


            codeNumber += iteradorCantidad % 2 == 0 ? '</div><div class="col-lg-6">' : '';

            let placeholderText = getPlaceholderServiciosAdicionales(element.toString().toLowerCase());


            console.log("placeholderText! ", placeholderText)
            codeNumber += `<div class="form-group">
            <a  data-toggle="tooltip" data-placement="right" title="Favor de indicar con número ordinal">
            <label class="col-form-label" for="input-servicios-cantidad-${element.toString().toLowerCase()}">${element.replace("_", " ")}</label>
            <img src="../public/images/exclamacion1.svg"  width="20" height="20">
            </a>            
                <input id="${element.toString().toLowerCase()}" name="serviciosNumber" type="number" class="form-control input-servicios-cantidad" placeholder="${placeholderText}" autocomplete="off">
            
                        </div>`
            iteradorCantidad++;
            if (auditorio.servicios.cantidad.length == iteradorCantidad) {
                codeNumber += '</div> </div>';
                $("#serviciosNumber").append(codeNumber);
            }

        });

    }

    //console.log("servicios check ", auditorio.servicios.check)
    if (auditorio.servicios != undefined && auditorio.servicios.check != undefined) {
        let codeCheck = '<div class=row> <div>';
        var iteradorCheck = 0;
        auditorio.servicios.check.forEach(element => {
            // var input = '<input type="checkbox" name="servicios" value =' + element + ' > ' + element + ' <br>';
            codeCheck += iteradorCheck % 2 == 0 ? '</div><div class="col-lg-3">' : '';
            codeCheck += `<div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input check-servicios" value="${element}" id="check-servicios-${element.toString().toLowerCase()}">
                            <label class="custom-control-label" for="check-servicios-${element.toString().toLowerCase()}">${element.replace("_", " ").replace("_", " ")}</label>
                        </div>`;
            iteradorCheck++;
            if (auditorio.servicios.check.length == iteradorCheck) {
                codeCheck += '</div> </div>';
                $("#serviciosCheck").append(codeCheck);
            }

        });


    }
    const guardar = $('#validar');
    guardar.attr("disabled", false);

    $("#check-servicios-diseño_póster").change(function () {

        if ($('#check-servicios-diseño_póster').is(':checked')) {
            //alert("hubo cambio");
            $('.check-diseño').show();
            checkDiseno = true;
        } else {
            $('.check-diseño').hide();
            checkDiseno = false;
        }
    })
}
/**
 * muestra el input cuando selecciona otro en la seccion de difusion 
 */

$("#difusion_otro").change(function () {
    console.log("cambio el otro", $('#difusion_otro').is(':checked'));
    if ($('#difusion_otro').is(':checked')) {

        $('#otro_difusion').show();
    } else {
        $('#otro_difusion').hide();
    }
});


/***************************************************
 * **************************************************
 * **************************************************
 * EDITAR
 * **************************************************
 ***************************************************/


var auditoriosEditar;
var auditorioEditar;
var auditorioNombreEditar;

$(".fecha-editar-calendario").datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
    daysOfWeekDisabled: [0, 6],
    //startDate: new Date('2019-12-12'),
    language: 'es',
}).on('changeDate', function onChangedDate(e) {
    $("#fecha-editar").attr("disabled", false);
    console.log("entraste");
    tablaEditar(new Date($("#fecha-editar").val()), $('#select-auditorio-editar').find(":selected").val());
});


/**
 * 
 * llena el formulario con el id que se selecciono en la tabla 
 * @param {*} id 
 */
function getDatosEvento(id) {
    $("#spinnerLoading").addClass("is-active");
    $.ajax({
        url: "/get/evento",
        type: "POST",
        dataType: "json",
        data: {
            evento: id
        },
        success: function (json) {
            //console.log(JSON.stringify(json));
            llenarDatos(json[0]);
            //getAuditorio(json[0].evento_datos.id_espacio, function() {
            // });
        },
        error: function (json) {
            console.log("ocurrio un error ");
        }
    });
}

/**
 * pestaña  home 
 * Llena el formulario  para poder editar 
 * @param {*} datos 
 */
function llenarDatos(datos) {
    const firm = "[Operador-llenarDatos] ";

    // datos auditorio 
    // var fechaRealizarse = datos.evento_datos.fecha.split("T")[0].split("-");
    //console.log(firm, datos)
    //$('#fecha-editar').val(fechaRealizarse[0] + "-" + fechaRealizarse[1] + "-" + fechaRealizarse[2]);
    var tempFecha = new Date(datos.evento_datos.fecha);


    //var fechaInicio = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - (numDia - 1));
    $(".fecha-editar-calendario").datepicker('setDate', new Date(tempFecha.setDate((tempFecha.getDate() + 1))));
    $('#select-auditorio-editar').val(datos.evento_datos.id_espacio);
    generaHTMLEditar(datos.evento_datos.id_espacio);

    tablaEditar(new Date(datos.evento_datos.fecha), datos.evento_datos.id_espacio);
    // Datos Peronales
    $('#nombre-editar').val(datos.datos_profesores.nombre);
    $('#cargo-editar').val(datos.datos_profesores.cargo);
    $('#area-editar').val(datos.datos_profesores.area);
    $('#institucion-editar').val(datos.datos_profesores.institucion);
    $('#telefono-editar').val(datos.datos_profesores.telefono);
    $('#correo-editar').val(datos.datos_profesores.correo);
    // tipo evento y fatoa genrea evento
    name = "tipo-evento-editar"
    $('#nombreEvento-editar').val(datos.evento_datos.nombre);
    $('#asistentes-editar').val(datos.evento_datos.asisitentes);
    $('#pagina-editar').val(datos.evento_datos.pagina);
    var idTipo = "#customRadio" + datos.evento_tipo.tipo + "-editar";
    $(idTipo).prop("checked", true);
    console.log("radio del otro", idTipo)
    if (idTipo === "#customRadio12-editar") {
        $('#otro_texto-editar').show();
        console.log(datos.evento_tipo);

        $('#otro_texto-editar').val(datos.evento_tipo.texto);

    }
    var idTipoPublico = "#tipo-evento-" + datos.evento_datos.tipo + "-editar";
    $(idTipoPublico).prop("checked", true);
    checkMaterialCheck(datos.servicios.check);
    checkMaterialNumber(datos.servicios.cantidad);
    //console.log(datos.evento_datos.hora);
    checkHorasEditarEvento(datos.evento_datos.hora)

    if (datos.servicios.check.length > 0 && datos.servicios.check.findIndex(e => e == "Diseño_póster") >= 0) {
        //console.log("no pasa la validacion ", datos.servicios.check.findIndex(e => e == "Diseño_póster"))
        $(".check-diseño-editar").show();
        checkTipoDiseño(datos.diseno.tipo);

        $('#resumen-editar').val(datos.diseno.resumen);
        $('#ponentes-editar').val(datos.diseno.nombreCompleto);
        $('#objetvo_del_evento-editar').val(datos.diseno.objetivoEvento);
        $('#departamento_o_dependencias-editar').val(datos.diseno.departamento);

        //console.log(datos.diseno.difusion.check)
        if (datos.diseno.difusion.check != null) {

            $("#Difusion-editar").prop("checked", true);
            $('.check-difusion-editar').show();
            checkDisenoDifusion(datos.diseno.difusion.check)

        } else {
            //console.log("no esta el check")
        }

    } else {
        $(".check-diseño-editar").hide();
    }
}

/**
 * auxiliar 
 * chekear las horas de el evento 
 * @param {*} data 
 */
function checkHorasEditarEvento(data) {
    const firm = "[checkHorasEditar]";
    data.forEach(element => {
        var hora = "#" + element + "-editar";
        $(hora).prop("checked", true);
    });
}
/**
 *auxiliar 
 *  chekear el material
 */
function checkMaterialCheck(data) {
    const firm = "[checkMaterialCheck]";
    //console.log(firm + JSON.stringify(data));
    if (data.length > 0) {
        data.forEach(element => {
            //Proyector_de_video
            var temp = "#check-servicios-" + (element.toLowerCase()) + "-editar";
            //console.log(temp)
            $(temp).prop("checked", true);
        });
    }

}

/**
 *  llena los campos de servicios que tiene numero 
 */
function checkMaterialNumber(data) {
    const firm = "[checkMaterialNumber]";
    //console.log(firm + JSON.stringify(data));
    //microfono_alambrico-editar
    for (var i in data) {
        //console.log("llave :" + i + " [" + data[i] + "]")
        var temp = "#" + i + "-editar";
        $(temp).val(data[i] > 0 ? data[i] : 0);
    }
}

/**
 *auxiliar 
 *  chekear el material
 */
function checkTipoDiseño(data) {
    const firm = "[checkTipoDiseño] ";
    //console.log(firm, data);
    data.forEach(element => {
        var tipo = "#" + element + "-editar";
        $(tipo).prop("checked", true);
    });

}

/**
 *auxiliar 
 *  chekear el material de diseno y difusion 
 */
function checkDisenoDifusion(data) {
    const firm = "[checkDisenoDifusion] ";
    console.log(firm, data);

    data.forEach(element => {

        if (typeof element === 'string') {
            var tipo = "#" + element + "-editar";

            $(tipo).prop("checked", true);
        } else {
            console.log("data ", element)
            $('#otro_difusion-editar').show();
            $("#difusion_otro-editar").prop("checked", true);
            $("#otro_difusion-editar").val(element.otro);

        }
    });

}

/**
 * Genera hmtl dependiendo de el aduditorio que selecciono 
 * genera el html y lo muestra para crear eventos 
 */
var aduditorioEditar;

function limpiarEditar() {
    $("#horas-editar").empty();
    $("#serviciosCheck-editar").empty();
    $("#serviciosNumber-editar").empty();
    //$("#services").append('<div id="serviciosNumber"></div><div id="serviciosCheck"></div>');
}

function generaHTMLEditar(auditorio) {
    // console.log("..." + auditorios)
    // console.log("entro")
    limpiarEditar();
    auditorios.forEach(element => {
        if (element._id == auditorio) {
            aduditorioEditar = element;
        }
    });
    //console.log(aduditorioEditar);
    let $fecha = $("#fecha");
    let date = new Date($fecha.val());
    // Revisa si el dia que escojio es entre semana o virnes //tiene restricion por el dia 
    if (date.getDay() == 4 && aduditorioEditar.horario.viernes != undefined) {
        let h = '<div class=row> <div>';
        var iterador = 0;
        aduditorioEditar.horario.viernes.forEach(element => {
            // var h = element + '<input type="checkbox" name="horas" value="' + element + '" class= hora-' + element + '>'
            h += iterador % 2 == 0 ? '</div><div class="col-lg-2">' : '';
            h += `<div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input check-hora-editar editar" value="${element}" id="${element}-editar">
                        <label class="custom-control-label" for="${element}-editar" >${element} horas</label>
                    </div>`;
            iterador++;
            if (aduditorioEditar.horario.viernes.length == iterador) {
                h += '</div> </div>';
                //console.log("-------------" + h)
                $("#horas-editar").append(h);
            }
        });
    } else { // si es entre semana 
        let h = '<div class=row> <div>';
        var iterador = 0;
        if (aduditorioEditar.horario != undefined && aduditorioEditar.horario.entreSemana != undefined) {
            aduditorioEditar.horario.entreSemana.forEach(element => {
                // var h = element + '<input type="checkbox" name="horas" value="' + element + '" class= hora-' + element + '>'
                //console.log(i + "-" + h)
                h += iterador % 2 == 0 ? '</div><div class="col-lg-2">' : '';
                h += `<div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input check-hora-editar editar" value="${element}" id="${element}-editar">
                            <label class="custom-control-label" for="${element}-editar" >${element} horas</label>
                        </div>`;
                iterador++;
                if (aduditorioEditar.horario.entreSemana.length == iterador) {
                    h += '</div> </div>';
                    //console.log("-------------" + h)
                    $("#horas-editar").append(h);
                }
            });

        }

    }
    /**
     * acomoda los servicios dinamicos en columnas 
     */
    let codeNumber = '<div class=row> <div>';
    var iteradorCantidad = 0;
    if (aduditorioEditar.servicios != undefined && aduditorioEditar.servicios.cantidad != undefined) {

        aduditorioEditar.servicios.cantidad.forEach(element => {
            // var input = '<br> ' + element + ':<br> <input type="" name="services" value=0 id=' + element + '>';
            codeNumber += iteradorCantidad % 2 == 0 ? '</div><div class="col-lg-6">' : '';
            codeNumber += `<div class="form-group">
            <a  data-toggle="tooltip" data-placement="right" title="Favor de indicar con número ordinal">
            <label class="col-form-label" for="input-servicios-cantidad-${element.toString().toLowerCase()}-editar">${element.replace("_", " ")}</label>
            <img src="../public/images/exclamacion1.svg"  width="20" height="20">
            </a>
                            <input id="${element.toString().toLowerCase()}-editar" name="serviciosNumber-editar" type="number" class="form-control input-servicios-cantidad-editar editar" placeholder="" autocomplete="off">
                        </div>`
            iteradorCantidad++;
            if (aduditorioEditar.servicios.cantidad.length == iteradorCantidad) {
                codeNumber += '</div> </div>';
                $("#serviciosNumber-editar").append(codeNumber);
            }

        });
    }
    //console.log("Error servicoos ",aduditorioEditar.servicios)
    if (aduditorioEditar.servicios != undefined && aduditorioEditar.servicios.check != undefined) {
        let codeCheck = '<div class=row> <div>';
        //  console.log("longitud ",aduditorioEditar.servicios.check);
        var iteradorCheck = 0;
        aduditorioEditar.servicios.check.forEach(element => {
            // var input = '<input type="checkbox" name="servicios" value =' + element + ' > ' + element + ' <br>';
            codeCheck += iteradorCheck % 2 == 0 ? '</div><div class="col-lg-3">' : '';
            codeCheck += `<div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input check-servicios-editar editar" value="${element}-editar" id="check-servicios-${element.toString().toLowerCase()}-editar">
                            <label class="custom-control-label" for="check-servicios-${element.toString().toLowerCase()}-editar">${element.replace("_", " ").replace("_", " ")}</label>
                        </div>`;
            iteradorCheck++;
            if (aduditorioEditar.servicios.check.length == iteradorCheck) {
                codeCheck += '</div> </div>';
                $("#serviciosCheck-editar").append(codeCheck);
            }
        });

    }
    $('#guardar-nuevo-editar').attr("disabled", false);

    $("#check-servicios-diseño_póster-editar").change(function () {
        console.log("cambio")

        if ($('#check-servicios-diseño_póster-editar').is(':checked')) {
            //alert("hubo cambio");
            $('.check-diseño-editar').show();
            checkDiseno = true;
        } else {
            $('.check-diseño-editar').hide();
            checkDiseno = false;
        }
    })
    $('.rectangleOcupado').show(); // rectangulo rojo crear evento 
    $('.rectangleTexto').show();
    $('.editar').attr("disabled", true); // bloquea los input
    //$('.input-servicios-cantidad-editar').attr("disabled", true);
}
$('.ocultar-editar').show();


function getFechasEditar(fecha, callback) {
    const firm = "[getFechas] ";
    //console.log(fecha);
    var numDia = fecha.getDay();
    var fechaInicio = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - (numDia - 1));
    var fechaFin = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + (5 - numDia));
    // console.log(firm + "fecha inicio:" + fechaInicio);
    // console.log(firm + "fecha fin:" + fechaFin);
    callback(false, fechaInicio, fechaFin);
}

function tablaEditar(fecha, auditorio) {
    getFechasEditar(fecha, function (err, f1, f2) {
        if (err) {
            console.log("error con la fecha");
        } else {
            //console.log(f1 + ":" + f2 + " auditorio " + JSON.stringify(auditorio))
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
                    //console.log("horas ajax[" + JSON.stringify(json) + "]");
                    //console.log(fecha);
                    generaHorarioEditar(json);
                    checkHorasEditar(json.admin, fecha, "0");
                    $("#spinnerLoading").removeClass("is-active")
                },
                error: function (xhr, status) {
                    $("#spinnerLoading").removeClass("is-active")
                    alert('Disculpe, existió un problema');
                },
            });
        }
    });
}


/**
 * genera el html de la tabla
 * @param {*} data 
 */
function generaHorarioEditar(data) {
    const firm = "[generaHorarioEditar]";
    //console.log(firm + JSON.stringify(data));
    var dias = ["Horario", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
    var temp = 1;
    for (let j in data.user) {
        dias[temp] += " " + j.split("-")[1];
        temp++;
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
                //console.log(dias[j]);
                table_body += `<td class="${(dias[j].toLowerCase().replace(" ", "-")) + "-" + (--hora) + "-editar"}">`;
                table_body += "";
                hora++;
                table_body += '</td>';
            }
        }
        table_body += '</tr></thead>';
    }
    table_body += '</table>';
    //console.log(fecha.getDate());

    $(".horario-editar").empty().append(table_body);

    insertaDatosHorarioEditar(data.user, 1);
    insertaDatosHorarioEditar(data.admin, 0);
}
/**
 * axiliar de generaHorario
 * colorea la tabla dependiendo el horario
 * @param {*} data 
 */
function insertaDatosHorarioEditar(data, tipo) {
    //console.log("esto es lo que regres< = " + JSON.stringify(data));
    const dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];
    var i = 0;
    for (let j in data) {
        //console.log(dias[i])
        if (data[j] != null) {
            data[j].forEach(element => {

                $(`.${dias[i]}-${(j.split("-")[1])}-${element}-editar`).css("background-color", (tipo == 0 ? "#E8442A" : "#0897D5"));
                // color azul:#2AA198
                // color rojo #B58900
            });
        }
        i++;
    }
    $(".progress").hide();
}
/**
 * Generar reporte semanal 
 *  
 */
$("#generarReporte00").click(function () {
    console.log("generar reportes")
    var fechaI = $("#reporteFechaI").val();
    var fechaF = $("#reporteFechaF").val();
    var auditorios = [];
    $.each($("input[name='auditorios']:checked"), function () {
        auditorios.push(parseInt($(this).val()));
    });
    $("#mostrar").hide();
    $(".datosEvento").hide();

    const auditorioAll = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var queryTemp = {
        fechaInicio: new Date(fechaI),
        fechaFin: new Date(fechaF),
        auditorio: auditorios.length == 0 ? auditorioAll : auditorios,
        status: [20]
    };

    $("#tabla-reporte").empty();
    console.log("el query  reporte ", queryTemp);
    eventosReporte(queryTemp, function (data) {
        if (data.code == 200 && typeof (data.descripcion) === 'object') {
            generarTablaReporteSemanal(data.descripcion);

            $("#exportarReporte00").show();
        }
        //exportToExcel();
    });
});

/**
 * genera el reporte del tecnico 
 */
$("#generarReporte01").click(function () {
    console.log("generar reportes")
    var fechaI = $("#reporteFechaI").val();
    var fechaF = $("#reporteFechaF").val();
    var auditorios = [];
    $.each($("input[name='auditorios']:checked"), function () {
        auditorios.push(parseInt($(this).val()));
    });
    $("#mostrar").hide();
    $(".datosEvento").hide();

    const auditorioAll = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var queryTemp = {
        fechaInicio: new Date(fechaI),
        fechaFin: new Date(fechaF),
        auditorio: auditorios.length == 0 ? auditorioAll : auditorios,
        status: [20]
    };

    $("#tabla-reporte").empty();
    console.log("el query  reporte ", queryTemp);
    getMaterial(queryTemp, function (data) {
        console.log("Los datos reporte tecnico ", data)
        if (data.code == 200 && typeof (data.descripcion) === 'object') {
            generarTablaReporteTecnico(data.descripcion);
            $("#exportarReporte00").show();
        } else {

        }
    })
});

/**
 * genera Reporte de indicadores.
 */
$("#generarReporte02").click(function () {
    console.log("generar reportes")
    var fechaI = $("#reporteFechaI").val();
    var fechaF = $("#reporteFechaF").val();
    var auditorios = [];
    $.each($("input[name='auditorios']:checked"), function () {
        auditorios.push(parseInt($(this).val()));
    });
    $("#mostrar").hide();
    $(".datosEvento").hide();

    const auditorioAll = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var queryTemp = {
        fechaInicio: new Date(fechaI),
        fechaFin: new Date(fechaF),
        auditorio: auditorios.length == 0 ? auditorioAll : auditorioAll,
        status: [20]
    };

    $("#tabla-reporte").empty();
    console.log("el query  reporte ", queryTemp);
    getMaterialesIndicadores(queryTemp, function (data) {
        console.log("Los datos  ", data)
        if (data.code == 200 && typeof (data.descripcion) === 'object') {
            generarTablaReporteIndicadores(data.descripcion);
            //generarTablaReporteTecnico(data.descripcion);
            $("#exportarReporte00").show();
        } else {

        }
    })
});
$("#exportarReporte00").click(function () {
    if (dataExel.length > 0) {

        exportToExcel();
    }
});

function generarTablaReporteIndicadores(data) {
    console.log("la Data ", data)

    let i = 1;
    let table = "<table class = \"table table-hover table-bordered\" > <thead><tr class=\"table-secondary\">" +
        "<th>N°</th> <th>Actividad</th> <th>Categoría</th> <th>Actividad con temática de equidad de género y no discriminación </th> <th>Número de actividades realizadas</th>  <th>Asistentes</th>  </tr>" +
        " </thead>";

    data.forEach(temp => {
        table += "<thead><tr>";
        table += `<td>${i++}</td>`; // N 
        table += `<td>${temp._id.nombre == 'Otro' ? temp._id.texto : temp._id.nombre}</td>`; // Actividad 
        table += `<td>${temp._id.categoria}</td>`; // Categoría	
        table += `<td>${temp.tipo == undefined ? "" : ""}</td>`; //Actividad con temática de equidad de género y no discriminación	 
        table += `<td>${temp.count}</td>`; //numero
        table += `<td>${temp.suma}</td>`; // Asistentes	
        table += "</tr></thead>";
    });

    table += "</table>";

    $("#tabla-reporte").append(table);
    dataExel = table;
    nombreExel = "ReporteIndicadores" + formatoFechas(new Date().toISOString());
    return table;
}

function generarTablaReporteSemanal(data) {
    //
    let table = "<table class = \"table table-hover table-bordered\" > <thead><tr class=\"table-secondary\">  <th>Fecha</th> <th>Hora</th> <th>Título / Participante</th> <th>Tipo  de evento</th> <th>Sede</th> <th>Responsable</th> </tr> </thead>";

    data.forEach(temp => {
        table += "<thead><tr>";
        table += `<td>${temp.fecha}</td>`; // fecha 
        table += `<td>${temp.horas}</td>`; // hora 
        table += `<td>${temp.nombre_evento}</td>`; // titulo
        table += `<td>${temp.tipo}</td>`; //tipo evento 
        table += `<td>${temp.auditorio}</td>`; // sede 
        table += `<td>${temp.nombre}</td>`; // responsable
        table += "</tr></thead>";
    });

    table += "</table>";
    $("#tabla-reporte").append(table);
    dataExel = table;
    nombreExel = "ReporteSemanal" + formatoFechas(new Date().toISOString());
    return table;
}

function generarTablaReporteTecnico(data) {
    //
    let table = "<table class = \"table table-hover table-bordered\" > <thead><tr class=\"table-secondary\">  <th>Fecha</th> <th>Hora</th> <th>Título / Participante</th> <th>Sede</th> <th>Requerimientos</th></tr> </thead>";

    data.forEach(temp => {
        //console.log("for  ", temp)
        table += "<thead><tr>";
        table += `<td>${formatoFechas(temp.evento_datos.fecha)}</td>`; // fecha 
        table += `<td>${temp.evento_datos.hora}</td>`; // hora 
        table += `<td>${temp.evento_datos.nombre} / ${temp.datos_profesores.nombre} </td>`; // Título / Participante
        table += `<td>${temp.evento_datos.auditorio}</td>`; //Sede 
        table += `<td>${temp.servicios.cantidad.length != undefined ? "" : formatoObjeto(temp.servicios.cantidad)}  /  
             ${temp.servicios.check.length > 0 ? formatoArreglo(temp.servicios.check) : temp.servicios.check} </td>`; // Requerimientos 
        //console.log("cantidad ", temp.servicios.cantidad);
        table += "</tr></thead>";
    });

    table += "</table>";
    $("#tabla-reporte").append(table);
    dataExel = table;
    nombreExel = "ReporteTecnico" + formatoFechas(new Date().toISOString());
    return table;
}
// let a= {microfono_inalámbrico: "1", microfono_alámbrico: "2", presidium: "3", mamparas: "1", sillas: "1"}
function formatoObjeto(data) {
    //console.log("Entro formato ")

    let formato = "";
    var llaves = Object.keys(data);
    for (var i = 0; i < llaves.length; i++) {
        var llave = llaves[i];
        //console.log("llave ",llave)
        formato += llave.replace("_", " ").replace("_", " ") + " : ";

        formato += data[llave].length > 0 ? data[llave] + ", " : 0 + ", ";
        //console.log("ex ",data[llave]," longitud",data[llave].length);
    }
    return formato
}

function formatoArreglo(data) {
    return data.map(
        temp => {
            return temp.replace("_", " ").replace("_", " ")
        }
    )
}
/**
 * auxuliar formato 
 * Le formato de la fecha
 * @param {*} date fehca 
 */
function formatoFechas(date) {

    var temp = date.split("T")[0].split("-");
    var fecha = temp[2] + "-" + temp[1] + "-" + temp[0];
    return fecha;
}

function exportToExcel() {
    var htmls = "Rerte";
    var uri = 'data:application/vnd.ms-excel;charset=UTF-8;base64,'
    var template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>   ${dataExel} </body></html>`;
    var base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)))
    };

    var format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        })
    };

    htmls = "YOUR HTML AS TABLE"

    var ctx = {
        worksheet: 'Worksheet',
        table: htmls,
        type: "text/plain;charset=utf-8;"
    }


    var link = document.createElement("a");
    link.download = nombreExel + ".xls";
    link.href = uri + base64(format(template, ctx));
    link.click();
}

/**
 * marca las hora  cuando vas a editar un evento 
 * @param {*} data 
 * @param {*} fecha 
 */
function checkHorasEditar(data, fecha, tipo) {
    const firm = "[checkHorasEditar]";
    //console.log(firm + JSON.stringify(data));
    if (data["d-" + (fecha.getDate() + 1)] != null) {
        data["d-" + (fecha.getDate() + 1)].forEach(element => {
            var hora = "#" + element + "-editar";
            //console.log("---" + hora);
            $(hora).prop("checked", true);
            if (tipo == 0) {
                $(hora).attr("disabled", true);
            }
        });
    }
}



function limpiarDatosEditar() {
    limpiarEditar();

    $("#fechaI").val("");
    $('#fecha-editar').val("");
    $('#select-auditorio-editar').val("");
    // Datos Peronales
    $('#nombre-editar').val("");
    $('#cargo-editar').val("");
    $('#area-editar').val("");
    $('#institucion-editar').val("");
    $('#telefono-editar').val("");
    $('#correo-editar').val("");
    // tipo evento y fatoa genrea evento
    $('#nombreEvento-editar').val("");
    $('#asistentes-editar').val("");
    $('#pagina-editar').val("");
}



/**
 * guarda el nombre de el auditorio que selecciono
 */
$("#select-auditorio-editar").change(function changedSelect() {
    auditorioNombreEditar = $(this).children("option:selected").val();
    limpiar();
    console.log("seleccionaste : " + auditorioNombreEditar + "  id_ " + aduditorioEditar._id)
    tablaEditar(new Date($("#fecha-editar").val()), auditorioNombreEditar);
});


$("#formularioEditar").validate({

    rules: {
        "nombre-editar": {
            required: true,
            minlength: 2,
            maxlength: 40,
        },
        "cargo-editar": {
            required: true,
            minlength: 2,
            maxlength: 40,
        },
        "area-editar": {
            required: true,
            minlength: 2,
            maxlength: 40,
        },
        "insitutucion-editar": {
            required: true,
            minlength: 2,
            maxlength: 40,
        },
        "telefono-editar": {
            required: true,
            minlength: 2,
            maxlength: 40,
        },
        "correo-editar": {
            required: true,
            correoEXP: "El email es requerido"
        },
        "nombre_evento-editar": {
            required: true,
            minlength: 2,
            maxlength: 250,
        },
        "asistentes-editar": {
            required: true,
            range: [1, 420]
        },
        "pagina-editar": {
            required: false,
            minlength: 7,
            maxlength: 80,
        },
        "horas": {
            required: true,
            minlength: 1
        },
        "serviciosNumber-editar": {
            range: [0, 30]
        },
        "resumen-editar": { // <- NAME attribute of the input
            required: {
                depends: function () {
                    return $('#check-servicios-diseño_póster-editar').is(':checked');
                }
            }
        },
        "ponentes-editar": { // <- NAME attribute of the input
            required: {
                depends: function () {
                    return $('#check-servicios-diseño_póster-editar').is(':checked');
                }
            }
        },
        "objetvo_del_evento-editar": { // <- NAME attribute of the input
            required: {
                depends: function () {
                    return $('#check-servicios-diseño_póster-editar').is(':checked');
                }
            }
        },
        "departamento_o_dependencias-editar": { // <- NAME attribute of the input
            required: {
                depends: function () {
                    return $('#check-servicios-diseño_póster-editar').is(':checked');
                }
            }
        },
        "tipoDiseno-editar": {
            required: true,
            minlength: 1
        },
        "difucion-check-editar": {
            required: {
                depends: function () {
                    return $('#Difusion-editar').is(':checked');
                }
            },
            minlength: 1
        },
        "otro_texto-editar": {
            required: {
                depends: function () {
                    return $('#customRadio12-editar').is(':checked');
                }
            },
            minlength: 2,
            maxlength: 50
        },
        "otro_difusion-editar": {
            required: {
                depends: function () {
                    return $('#difusion_otro-editar').is(':checked');
                },
                minlength: 2,
                maxlength: 50
            }
        }

    },
    messages: {
        "nombre-editar": {
            required: "Nombre es requerido",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 41 ",
        },
        "cargo-editar": {
            required: "El Cargo es requerido",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 41 ",
        },
        "area-editar": {
            required: "El area de adscripcion es requerido",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 41 ",
        },
        "insitutucion-editar": {
            required: "La insitutución es requerida",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 41 ",
        },
        "telefono-editar": {
            required: "El teléfono es requerido",
            number: true,
        },
        "correo-editar": {
            required: "El email es requerido",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 41 ",
        },
        "nombre_evento-editar": {
            required: "Campo requerido ",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 250 ",
        },
        "asistentes-editar": {
            required: "Campo requerido ",
            range: "el numero de asistentes de 1 persona a 420"
        },
        "pagina-editar": {
            minlength: "La longitud debe de ser mayor a 7",
            maxlength: "La longitud debe de ser menor a 80 ",
        },
        "horas-editar": {

            required: "debes de elegir una hora ",
            minlength: "erro"
        },
        "serviciosNumber-editar": {
            range: "el rango es entre 1 y 30"
        },
        "resumen-editar": {
            required: "Este campo debe de ser obligatorio",
        },
        "ponentes-editar": {
            required: "Este campo debe de ser obligatorio",
        },
        "objetvo_del_evento-editar": {
            required: "Este campo debe de ser obligatorio",
        },
        "departamento_o_dependencias-editar": {
            required: "Este campo debe de ser obligatorio",
        },
        "tipoDiseno-editar": {
            required: "Este campo debe de ser obligatorio",
        },
        "difucion-check-editar": {
            required: "Este campo debe de ser obligatorio",
        },
        "otro_texto-editar": {
            required: "Este campo debe de ser obligatorio",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 40 ",

        },
        "otro_difusion-editar": {
            required: "Este campo debe de ser obligatorio",
            minlength: "La longitud debe de ser mayor a 2",
            maxlength: "La longitud debe de ser menor a 40 ",

        }


    },
    submitHandler: function (form, event) {

        event.preventDefault();
        //form.submit();

        //gconsole.log("exito");

        guardarEdita();
        $(".modal-ocultar").hide();
        $(".modal-ocultar-aceptar").show();


    }
});

/**
 * muestra el input cuando selecciona otro en la seccion de tipoEvento
 */
$(".custom-radio-editar").change(function () {
    //console.log("cambio el otro", $('#customRadio12-editar').is(':checked'));
    if ($('#customRadio12-editar').is(':checked')) {

        $('#otro_texto-editar').show();
    } else {
        $('#otro_texto-editar').hide();
    }
});

/**
 * muestra el input cuando selecciona otro en la seccion de difusion 
 */

$("#Difusion-editar").change(function () {
    console.log("cambio el otro", $('#Difusion-editar').is(':checked'));
    if ($('#Difusion-editar').is(':checked')) {
        $(".check-difusion-editar").show();
    } else {
        $(".check-difusion-editar").hide();

    }
});

function guardarEdita() {

    var datoAuditorio = $('#select-auditorio-editar').find(":selected").attr('name');

    // Datos Peronales
    var datoNombre = $('#nombre-editar').val();
    var datoCargo = $('#cargo-editar').val();
    var datoArea = $('#area-editar').val();
    var datoInstitucion = $('#institucion-editar').val();
    var datoTelefono = $('#telefono-editar').val();
    var datoCorreo = $('#correo-editar').val();
    // tipo evento y fatoa genrea evento
    var datoTipoEvento = $('.radio-tipo-evento-editar:checked').val();
    var datoNombreTipoEvento = $('.radio-tipo-evento-editar:checked').attr("text");
    var datoNombreTipoEventoCategoria = $('.radio-tipo-evento:checked').attr("categoria");
    /**
     * evento_datos
     */
    var datoNombreEvento = $("#nombreEvento-editar").val();
    var datoId_espacio = $("#select-auditorio-editar").val() + "";

    var datoFecha = new Date($("#fecha-editar").val());
    var datoHora = [];
    const $checkHora = $('.check-hora-editar:checked');
    $.each($checkHora, function () {
        if (this.checked && !this.disabled) { //solo lo que no es bloqueados 
            //console.log($(this).val());
            datoHora.push($(this).val());
        }
    });
    //console.log(datoHora)
    var datoAsisitentes = $("#asistentes-editar").val();
    var $radioTipoEvento = $('.datos-generales-editar:checked');
    var datoTipo = $radioTipoEvento.val();
    var datoPagina = $("#pagina-editar").val();
    var datoServicios = [];
    var $checkServicios = $(".check-servicios-editar:checked");
    $.each($checkServicios, function () {
        datoServicios.push($(this).val().split("-")[0]);
    });
    var tempService = {};
    const $inputServiciosCantidad = $('.input-servicios-cantidad-editar');
    $.each($inputServiciosCantidad, function () {
        tempService[$(this).attr("id").split("-")[0]] = $(this).val()
    });
    //console.log(tempService)
    var tempOtroTexto = null;
    console.log("tipo Evneto : ", datoTipoEvento, "", (datoTipoEvento == 12))
    if (datoTipoEvento == 12) {
        tempOtroTexto = $("#otro_texto-editar").val();
        console.log("Se va a guar en otro " + tempOtroTexto)
    }
    var datos = {
        datos_profesores: {
            nombre: datoNombre,
            cargo: datoCargo,
            area: datoArea,
            institucion: datoInstitucion,
            telefono: datoTelefono,
            correo: datoCorreo
        },
        evento_tipo: {
            tipo: datoTipoEvento,
            nombre: datoNombreTipoEvento,
            texto: tempOtroTexto,
            categoria: datoNombreTipoEventoCategoria
        },
        evento_datos: {
            id_espacio: datoId_espacio,
            auditorio: datoAuditorio,
            nombre: datoNombreEvento,
            fecha: datoFecha,
            hora: datoHora,
            asisitentes: parseInt(datoAsisitentes),
            tipo: datoTipo,
            pagina: datoPagina,
        },
        servicios: {
            cantidad: tempService,
            check: datoServicios
        },
        diseno: {
            tipo: null,
            resumen: null,
            nombreCompleto: null,
            objetivoEvento: null,
            departamento: null,
            difusion: null,
        }
    }

    if (datos.servicios.check.find(e => e == "Diseño_póster")) {

        datos.diseno.tipo = null;
        datos.diseno.resumen = $("#resumen-editar").val();
        datos.diseno.nombreCompleto = $("#ponentes-editar").val();
        datos.diseno.objetivoEvento = $("#objetvo_del_evento-editar").val();
        datos.diseno.departamento = $("#departamento_o_dependencias-editar").val();
        datos.diseno.difusion = {
            check: null
        }

        let dataServicios = [];
        let tempServiciosDiseno = $('.check-serviciosDiseño-editar:checked');

        $.each(tempServiciosDiseno, function () {
            if (this.checked && !this.disabled) { //solo lo que no es bloqueados 
                //console.log($(this).val());
                dataServicios.push($(this).val().split("-")[0]);
            }
        });
        datos.diseno.tipo = dataServicios;

        // se agrega los que esta seleccionados 
        if ($('.difusion-editar').is(':checked') && $(".checkDifusion-editar:checked").length > 0) {
            let dataDifusion = [];
            let tempDifucion = $('.checkDifusion-editar:checked');

            $.each(tempDifucion, function g() {
                if (this.checked && !this.disabled) { //solo lo que no es bloqueados 
                    //console.log($(this).val());
                    if ($(this).val() === "difusion_otro") {
                        dataDifusion.push({
                            "otro": $("#otro_difusion-editar").val()
                        })
                    } else {
                        dataDifusion.push($(this).val());
                    }
                }
                //console.log(Object.keys(datos.diseno));       
            });
            datos.diseno.difusion.check = dataDifusion;
            //console.log(dataDifusion)
        }
    }
    console.log("las modificacones: ", datos);
    eventoUpdate(id_evento, datos);
}


/**
 * muestra el input cuando selecciona otro en la seccion de difusion 
 */

$("#difusion_otro-editar").change(function () {
    console.log("cambio el otro", $('#difusion_otro-editar').is(':checked'));
    if ($('#difusion_otro-editar').is(':checked')) {

        $('#otro_difusion-editar').show();
    } else {
        $('#otro_difusion-editar').hide();
    }
});
//difusion_otro-editar

/***************************************************
 *  fin de editar 
 ***************************************************/

/**
 * obtiene los eventos con condiciones 
 * @param {*} data json que contiene condiciones 
 * @param {*} callback 
 */
function eventos(data, callback) {
    $.ajax({
        url: "/eventos",
        type: 'POST',
        dataType: 'json',
        data: {
            query: JSON.stringify(data)
        },
        success: function (json) {
            // console.log("exito "json);
            // console.log(Object.keys(json))
            if (json.code == 400) {
                $('#modalMensjae').modal("show");
                $(".modal-body").text(json.descripcion);
            }
            callback(json)
        },
        error: function (json) {
            $('#modalMensjae').modal("show");
            $(".modal-body").text("Ocurrio un erro con el servidor");

            //console.log("error " + JSON.stringify(json))
        }
    });
}

function eventosReporte(data, callback) {
    $("#spinnerLoading").addClass("is-active");
    $.ajax({
        url: "/reportes",
        type: 'POST',
        dataType: 'json',
        data: {
            query: JSON.stringify(data)
        },
        success: function (json) {
            $("#spinnerLoading").removeClass("is-active")
            // console.log("exito "json);
            // console.log(Object.keys(json))
            if (json.code == 400) {
                $('#modalMensjae').modal("show");
                $(".modal-body").text(json.descripcion);
            }
            callback(json)
        },
        error: function (json) {
            $("#spinnerLoading").removeClass("is-active")
            $('#modalMensjae').modal("show");
            $(".modal-body").text("Ocurrio un erro con el servidor");

            //console.log("error " + JSON.stringify(json))
        }
    });
}

/**
 * obtine los aditorios disponibles
 * para crear los checbok y el select 
 * @param {*} callback 
 */
function auditorio_(callback) {
    const firm = "[auditorio] ";
    $.ajax({
        url: "/auditorioss",
        type: 'POST',
        dataType: 'json',
        success: function (mensaje) {
            //console.log("datos" + mensaje);
            callback(false, mensaje)
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema');
            callback(true, mensaje)
        },
    });
}

/**
 * Obetiene el materia para generar el reporte 
 * @param {} data 
 * @param {*} callback 
 */
function getMaterial(data, callback) {
    $("#spinnerLoading").addClass("is-active");
    const firm = "[auditorio] ";
    $.ajax({
        url: "/get/material",
        type: 'POST',
        dataType: 'json',
        data: {
            query: JSON.stringify(data)
        },
        success: function (mensaje) {
            $("#spinnerLoading").removeClass("is-active");
            //console.log("datos: " + JSON.stringify(mensaje));
            callback(mensaje)
        },
        error: function (xhr, status) {
            $("#spinnerLoading").removeClass("is-active");
            //alert('Disculpe, existió un problema ');
            callback(true, mensaje)
        },
    });
}

/**
 * Obitne los datos 
 * @param {*} data 
 * @param {*} callback 
 */
function getMaterialesIndicadores(data, callback) {
    $("#spinnerLoading").addClass("is-active");
    const firm = "[auditorio] ";
    $.ajax({
        url: "/reportesIndicadores",
        type: 'POST',
        dataType: 'json',
        data: {
            query: JSON.stringify(data)
        },
        success: function (mensaje) {
            $("#spinnerLoading").removeClass("is-active");
            //console.log("datos: " + JSON.stringify(mensaje));
            callback(mensaje)
        },
        error: function (xhr, status) {
            $("#spinnerLoading").removeClass("is-active");
            //alert('Disculpe, existió un problema ');
            callback(true, mensaje)
        },
    });
}

/**
 * rechaza un evento   y lo elimina 
 * @param {*} id 
 */
function eventoDelete(folio) {
    const firm = "[eventoDelete ]"
    console.log(firm + folio)
    $("#spinnerLoading").addClass("is-active");
    $.ajax({
        url: "/evento/delete",
        type: "POST",
        dataType: "json",
        data: {
            id: folio
        },
        success: function (data) {
            $("#spinnerLoading").removeClass("is-active")
            console.log("exito")
            console.log(data)
            //alert(firm,data.descripcion);
            $(".modal-body").text(data.descripcion);
            $("#exampleModalLongTitle").text("Exito");
            $('#modalMensjae').modal("show");
            $("#modalAceptar").click(function () {
                $('#modalMensjae').modal("hide");
                //location.reload();
            });
            //location.reload();
        },
        error: function (data) {
            //alert(firm,data.descripcion);
            $("#spinnerLoading").removeClass("is-active")
            $(".modal-body").text(data.descripcion);
            $("#exampleModalLongTitle").text("Error");
            $('#modalMensjae').modal("show");

            //location.reload();
        }
    });
}
$("#modalAceptar").click(function () {
    //$('#modalMensjae').modal("hide");
    location.reload();
});


/**
 * rechaza un evento  
 * @param {*} id 
 */
function eventoUpdate(folio, data) {
    const firm = "[eventoUpdate ]"
    console.log(firm + folio)
    var json = {
        _id: folio,
        evento: data
    }
    $("#spinnerLoading").addClass("is-active");
    $.ajax({
        url: "/evento/update",
        type: "POST",
        dataType: "json",
        data: {
            evento: JSON.stringify(json)
        },
        success: function (data) {
            //console.log("exito")
            //console.log(data)
            $("#spinnerLoading").removeClass("is-active")
            $(".modal-body").text(data.descripcion);
            $("#exampleModalLongTitle").text("Exito");
            $('#modalMensjae').modal("show");
            $("#modalAceptar").click(function () {

                location.reload();
            });
            //alert(data.descripcion);
            //location.reload();
        },
        error: function (data) {
            $("#spinnerLoading").removeClass("is-active")
            console.log("error al conectar, recarga pagina")
            $(".modal-body").text("Recarga la pagina");
            $("#exampleModalLongTitle").text("Error");
            $('#modalMensjae').modal("show");

            //alert(data.descripcion);
            //location.reload();
        }
    });

}

$("#solo_una_vez").click(function () {
    $('.recurrente').hide();
    $('.diario').hide();
    $('.normal').show();
    $('.ocultar').hide();
    $('.calendario').hide();


    $('#select-auditorioD').val($('#select-auditorioD > option:first').val());
    $('#select-auditorioR').val($('#select-auditorioR > option:first').val());
    $("#buscar_diario").attr("disabled", true);
    $("#buscar_recurrente").attr("disabled", true);
})



$("#modalError").click(function () {
    $(".modalError").hide()
});

$("#modalErrorDiario").click(function () {
    $(".modalErrorDiario").hide()
});

