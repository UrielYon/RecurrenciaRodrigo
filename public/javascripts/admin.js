import bootstrap from 'bootstrap';
import '../js/datepicker/bootstrap-datepicker';
import '../js/datepicker/locales/bootstrap-datepicker.es';
import '../css/datepicker/datepicker.css';
import '../css/bootstrap/bootstrap-blanco.css';
import '../stylesheets/w2ui-1.5.rc1.css';
import {
    validar,
    tabla
} from './lib/vendor'
import '../js/validate/jquery.validate.js'
import '../stylesheets/style.css';


/**
 * elementos que se ocultos, condidicionados
 * 
 */
$('.check-diseño').hide();
$('.check-difusion').hide();
$("#otro_texto").hide();
$("#otro_difusion").hide();
$(".respuestaModal").hide();

// $(document).ready(function() {
// });
var auditorios;
var auditorio;
var status;
let fechaInicio = new Date();
var iterador2grip = 0;
var id_evento;
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
    todayHighlight: true,
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
 * muestra los auditorios para buscarlos 
 */
auditorio_(function (err, data) {
    if (data.status == 400) {
        console.log("error")
    } else {
        data.forEach(element => {
            let checkbox = `<div class="custom-control custom-checkbox">
                                <input id="checkbox-auditorios-${element._id}" type="checkbox" name="auditorios" class="custom-control-input" value="${element._id}">
                                <label class="custom-control-label" for="checkbox-auditorios-${element._id}" >${element.nombre}</label>
                            </div>`;
            $("#auditorios").append(checkbox).hide().fadeIn(400);
        });
        auditorios = data;
        data.forEach(evento => {
            $("#select-auditorio").append($('<option />', {
                value: evento._id,
                name: evento.nombre,
                text: evento.nombre + " - " + evento.descripcion,
            }));
        });
    }
});

$("#modalAceptar").click(function () {
    location.reload();
});
/**
 * 
 */
$("#buscar").click(function () {

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
    var j_ = {
        fechaInicio: new Date(2000, 11, 1),
        fechaFin: new Date(2019, 12, 12),
        auditorio: [1, 2, 3, 4],
        status: [parseInt(status)]
    };
    var posicion = $(".img-footer").offset().top;
    console.log("posicion pagina ", posicion)
    $("html, body").animate({
        scrollTop: posicion
    }, 2000);
    eventos(queryTemp, function (data) {
        //console.log(data);
        if (data.code == 200) {
            $('#grid').w2grid({
                name: 'temp' + iterador2grip,
                show: {
                    header: true,
                    lineNumbers: true,
                    show: {
                        lineNumbers: true
                    },
                    toolbar: true,
                    footer: true
                    //toolbarDelete: true
                },
                //sortData: [{ field: 'recid', direction: 'asc' }],
                columns: columnasGrip, //columnasGrip,
                records: data.descripcion,
                onClick: function (event) {
                    var posicion = $(".img-footer").offset().top;
                    console.log("posicion pagina ", posicion)
                    $("html, body").animate({
                        scrollTop: posicion
                    }, 2000);
                    var grid = this;
                    event.onComplete = function () {
                        id_evento = grid.getSelection()[0];
                        console.log("evento seleccionar " + id_evento);
                        if (id_evento != undefined) {
                            $("#mostrar").show();
                            $("#mostrar").click(function () {
                                var posicion = $("#mostrar").offset().top;
                                console.log("posicion pagina ", posicion)
                                $("html, body").animate({
                                    scrollTop: posicion
                                }, 2000);

                                getDatosEvento(id_evento);
                                $(".datosEvento").show();
                            });
                        } else {
                            $("#mostrar").hide();
                            $(".datosEvento").hide();
                        }
                    }
                }
            });
            $("#grid").w2grid().refresh();
        } else {

        }
    });
    $("#eliminar").click(function () {
        //console.log("vas a eliminar  a " + id + "auditorio ")
        eliminar(id);
    });
});



/**
 * pestaña home 
 * muestra el evento detallado  un un evento 
 * @param {*} datos 
 */
function llenarDatos(datos) {
    //console.log(Object.keys(datos));
    // Datos Peronales
    $('.nombre').html("<strong>Nombre: </strong>" + datos.datos_profesores.nombre);
    $('.institucion').html("<strong>Institución: </strong>" + datos.datos_profesores.institucion);
    $('.cargo').html("<strong>Cargo: </strong>" + datos.datos_profesores.cargo);
    $('.telefono').html("<strong>Teléfono(s): </strong>" + datos.datos_profesores.telefono);
    $('.area').html("<strong>Área de adscripción (institución): </strong>" + datos.datos_profesores.area);
    $('.correo').html("<strong>Correo electrónico: </strong>" + datos.datos_profesores.correo);

    // Datos de Evento 
    $('.evento-auditorio').html("<strong>Auditorio: </strong>" + datos.evento_datos.auditorio);
    $('.evento-tipo').html("<strong>Tipo Evento: </strong>" + datos.evento_tipo.nombre);
    $('.evento-asistentes').html("<strong>Número de Asistentes: </strong>" + datos.evento_datos.asisitentes);
    $('.evento-nombre').html("<strong>Nombre Evento: </strong>" + datos.evento_datos.nombre);
    var temp_tipo_evento = "<strong>Tipo Evento: </strong>";
    temp_tipo_evento += datos.evento_datos.tipo == 0 ? "Solo para estudiantes y/o comunidad Facultad" : "Es un evento abierto al público"
    $('.evento-tipo-evento').html(temp_tipo_evento);
    //console.log(datos.registro.fecha + ":::" + datos.evento_datos.fecha + ":::" + datos.registro.nombre);
    var fechaRegistro = (datos.registro.fecha).split("T")[0].split("-");
    var fechaRegistroHora = (datos.registro.fecha).split("T")[1].split(".")[0];
    $('.evento-fecha-registro').html("<strong>Fecha Registro: </strong>" + (fechaRegistro[2] + "/" + fechaRegistro[1] + "/" + fechaRegistro[0] + "<strong>   Hora: </strong>" + fechaRegistroHora));
    var fechaRealizarse = datos.evento_datos.fecha.split("T")[0].split("-");
    $('.evento-fecha').html("<strong>Fecha a Realizarse: </strong>" + (fechaRealizarse[2] + "/" + fechaRealizarse[1] + "/" + fechaRealizarse[0]));
    $('.evento-registro').html("<strong>Registro: </strong>" + datos.registro.nombre);
    //console.log(datos.evento_datos.hora)
    var temp_horas = "<strong>Horas: </strong>";
    datos.evento_datos.hora.forEach(element => {
        temp_horas += element + ",";
    });
    //temp_horas.slice(0, temp_horas.length - 2);
    $('.servicios-horas').html(temp_horas.slice(0, temp_horas.length - 1));

    //llena los valores de los servicios 
    var temp_servicios = "<strong>Servicios: </strong>";
    for (var j in datos.servicios.cantidad) {
        var sub_key = j;
        var sub_val = datos.servicios.cantidad[j];
        if (sub_val > 0) {
            temp_servicios += sub_key.replace("_", " ") + ":" + sub_val + ", ";
        }
        // console.log(Object.keys(datos.servicios.cantidad))
        //console.log("key " + j + " value " + sub_val);
        //$("#" + sub_key + "").val(parseInt(sub_val));
    }
    //llena los checkbox de los servicios
    $(".servicios-material-int").html(temp_servicios.slice(0, temp_servicios.length - 2));
    var temp_servicios_check = "";
    for (var j in datos.servicios.check) {
        var sub_key = j;
        var sub_val = datos.servicios.check[j];
        // console.log(Object.keys(datos.servicios.check))
        //console.log("key " + j + " value " + sub_val);
        temp_servicios_check += sub_val.replace("_", " ").replace("_", " ") + ", ";
        //$("#" + sub_key + "").prop('checked', sub_val);
    }

    $(".servicios-material-check").html(temp_servicios_check.slice(0, temp_servicios.length - 2));
}

/**
 * pestaña home 
 * al precionar el boton para cambiar el status  
 */
$('#evento-cambiar-status').click(function () {
    //console.log(id_evento);
    aceptar(id_evento);
});

/**
 * pestaña home 
 * al precionar el boton eño,omar
 */
$('#evento-delete').click(function () {
    //console.log("valor " + id_evento);
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
$("#select-auditorio").change(function changedSelect() {
    auditorio = $(this).val();
});
/**
 * Crear Evento 
 *  Busca eventos y genera datos dinamicamente
 */
$("#fecha_buscar").click(function () {
    let $fecha = $("#fecha");
    console.log($("#fecha").val())
    var fecha = new Date($("#fecha").val());
    $('.ocultar').show();
    gneraHTML();
    tabla(fecha, $("#select-auditorio").val());

});


/**
 * pestaña Crear evento
 * genera el html y lo muestra 
 */
function gneraHTML() {
    //console.log("..." + auditorios)
    $("#fecha_buscar").attr("disabled", false);
    limpiar();
    auditorios.forEach(element => {
        if (element._id == auditorio) {
            auditorio = element;
        }
    });
    let $fecha = $("#fecha");
    let date = new Date($fecha.val());
    // Revisa si el dia que escojio es entre semana o virnes //tiene restricion por el dia 
    if (date.getDay() == 4) {
        let h = '<div class=row> <div>';
        var iterador = 0;
        auditorio.horario.viernes.forEach(element => {
            // var h = element + '<input type="checkbox" name="horas" value="' + element + '" class= hora-' + element + '>'
            h += iterador % 2 == 0 ? '</div><div class="col-lg-2">' : '';
            h += `<div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input check-hora" name="horas" value="${element}" id="${element}">
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
        auditorio.horario.entreSemana.forEach(element => {
            // var h = element + '<input type="checkbox" name="horas" value="' + element + '" class= hora-' + element + '>'
            //console.log(i + "-" + h)
            h += iterador % 2 == 0 ? '</div><div class="col-lg-2">' : '';
            h += `<div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input check-hora" name="horas" value="${element}" id="${element}">
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
            <img src="/public/images/exclamacion1.svg"  width="20" height="20">
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

            $('.check-diseño').show();
            checkDiseno = true;
        } else {
            $('.check-diseño').hide();
            checkDiseno = false;
        }
    })
}

$("#Difusion").change(function () {

    if ($('#Difusion').is(':checked')) {

        $('.check-difusion').show();
    } else {
        $('.check-difusion').hide();
    }
})
/**
 * muestra el input cuando selecciona otro en la seccion de tipoEvento
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
// $('#guardar-nuevo').on('click', function() {
//     //validar();
// });

/**
 * valite fomulario nuevo
 * 
 */
// $("#formulario-nuevo").validate({
//     submitHandler: function(form,event) {
//       // do other things for a valid form
//       event.preventDefault();
//       console.log("exito")
//       validar();
//     }
//   });
$.validator.addMethod('correoEXP', function (value) {
    console.log("entro a exprecion regular")
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@ciencias.unam.mx/.test(value);
}, 'El correo debe de ser el institucional');

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

$("#diario").click(function () {
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

$("#recurrente").click(function () {
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

$("#formulario-nuevo").validate({
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
            range: [1, 30]
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
    submitHandler: function (form) {

        //form.submit();
        //console.log("exito");
        event.preventDefault();
        $(".modal").show();
        //$(".modal-body").append("");
        $('#aceptarTerminosYcondiciones').prop('checked', true);
        validar();
        // $(".modal-ocultar").hide();
        // $(".modal-mensaje").hide();
        // $(".modal-ocultar-aceptar").show();


    }

});


$("#formularioTemporal").validate({

    submitHandler: function (form, event) {
        event.preventDefault();
        console.log("exito")
    }
});

/*
 **************************************************
 **************************************************
 *           funciones pestaña Consultas
 **************************************************
 **************************************************
 */
$(".datepicker-consultas").datepicker({
    format: 'yyyy-mm-dd',
    //todayHighlight: true,
    autoclose: true,
    daysOfWeekDisabled: [0, 6],
    language: 'es',
}).on('changeDate', function onChangedDate(e) {

});

/**
 * pestaña Crear evento
 * al pulsar en la pestaña Consultas
 * limpia los campos 
 */
$(".nav-item.consultas").click(function () {
    //console.log($(".administrador").attr("name"));
    /**
     * limpiar 
     */
    $('.list-group.group').empty();
    $('.list-group.tipo').empty();


});


/**
 * pestaña Consulta 
 * al pulsar busca dependiendo de la fecha 
 * 
 */
$("#buscar_consulta").click(function () {
    $('.list-group.group').empty();
    $('.list-group.tipo').empty();
    var data = {
        fechaI: new Date($("#fecha-consulta-Inicio").val()),
        fechaF: new Date($("#fecha-consulta-fin").val())
    }
    /**
     * busca /get/horario/
     */
    //    function consultas() {
    const firm = "[consultas] ";
    // console.log(firm)
    $.ajax({
        url: "/consultas",
        type: "POST",
        dataType: "json",
        data: {
            fecha: JSON.stringify(data)
        },
        success: function (data) {
            // console.log("Los datos: " + Object.keys(data));
            // console.log(data.grup)
            // const mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septienbre", "Octubre", "Noviembre", "Diciembre"];
            // var fecha = new Date();
            // $(".consulta-mes").text(mes[fecha.getMonth()]);
            if (data.grup.code != 400) {
                // console.log(Object.keys(data));
                // console.log(data.grup)
                var eventoauditorios = '<ul class="list-group group"> <a href="#" class="list-group-item list-group-item-action active"> Auditorios </a>';
                for (var i in data.grup) {
                    //  text += i + " : " + data.grup[i] + "\n";
                    //console.log(i + "::" + data.grup[i])
                    eventoauditorios += '<li class="list-group-item d-flex justify-content-between align-items-center"> ' + i + ' <span class="badge badge-primary badge-pill">' + data.grup[i] + '</span> </li>';
                }
                //console.log(mes[fecha.getMonth() + 1])
                $('.list-group.group').append(eventoauditorios);
            } else {
                var eventoauditorios = '<ul class="list-group group"> <a href="#" class="list-group-item list-group-item-action active"> Auditorios </a>';
                $('.list-group.group').append(data.grup.descripcion);
            }


            if (data.tipo.code != 400) {
                var tipoEvento = '<ul class="list-group tipo"> <a href="#" class="list-group-item list-group-item-action active"> Tipo de Evento </a>';
                for (var i in data.tipo) {
                    //  text += i + " : " + data.grup[i] + "\n";
                    //console.log(i + "::" + data.tipo[i])
                    tipoEvento += '<li class="list-group-item d-flex justify-content-between align-items-center"> ' + i + ' <span class="badge badge-primary badge-pill">' + data.tipo[i] + '</span> </li>';
                }
                $('.list-group.tipo').append(tipoEvento);
            } else {
                $('.list-group.tipo').append(data.tipo.descripcion);
            }
        },
        error: function (data) {
            console.log("erro al botener los datos")

        }
    });
});


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


/*
 **************************************************
 **************************************************
 *           funciones pestaña usuarios 
 **************************************************
 **************************************************
 */

var usuariTipo = -1;
var usuariTipoEditar = -1;
var evento_id = 0;
var iterador2gripUsurio = "";

const columnasGripUsuer = [{
    field: 'nombre',
    caption: 'Nombre',
    sortable: true,
    size: '33%',
    editable: {
        type: 'text'
    }
}, {
    field: 'correo',
    caption: 'Correo',
    sortable: true,
    size: '33%',
    editable: {
        type: 'text'
    }
}, {
    field: 'tipo',
    caption: 'Rol',
    sortable: true,
    size: '33%',
    editable: {
        type: 'text'
    }
}];
$("#usuario-tipo").change(function () {
    usuariTipo = $(this).val();
});

$("#usuario-tipo-editar").change(function () {
    usuariTipoEditar = $(this).val();
});

$("#usuario-boton-editar-cancelar").click(function(){
    e.preventDefault();
    $(".administrar-usuario-editar").hide();
});

$("#usuario-boton-cancelar").click(function(){
    console.log("ocultar");
    e.preventDefault();
    $(".administrar-usuario").hide();
});

$('.administrar-usuarios').click(function () {
    //iterador2gripUsurio++;


    //$("#grid-usuarios").remove();
    /**
     * obtecion de datos para la busquesda 
     */

    //$("#tabla-usuarios").append('<div id="grid-usuarios" style="width: 100%; height: 400px;"></div>');

    //    console.log($("#grid-usuarios").w2grid());
    usuarioGetAll(function (data) {
        if (data.code == 200) {
            // console.log($("#grid-usuarios").w2grid());
            // console.log(w2ui['name'])
            if ($("#grid-usuarios").w2grid() != null) {
                $("#grid-usuarios").w2grid().refresh();
                //console.log("refresh ", w2ui['name']);
                if (w2ui['name'] != undefined) {

                    w2ui['name'].refresh();
                }

                $("#grid-usuarios").w2grid().refresh();
            }
            $('#grid-usuarios').w2grid({
                name: 'user',
                //name: 'user',
                show: {
                    toolbar: true,
                    footer: true,
                    toolbarAdd: true,
                    toolbarDelete: true,
                    toolbarEdit: true,
                    header: true,
                    lineNumbers: true,
                    show: {
                        lineNumbers: true
                    },
                    //toolbarDelete: true
                },
                //sortData: [{ field: 'recid', direction: 'asc' }],
                columns: columnasGripUsuer, //columnasGrip,
                records: data.descripcion,
                onAdd: function (event) {

                    var posicion = $(".img-footer").offset().top;
                    $("html, body").animate({
                        scrollTop: posicion
                    }, 2000);
                    event.onComplete = function () {
                        userLimpiar();
                        $('.administrar-usuario-editar').hide();
                        $('.administrar-usuario').show();
                    }
                },
                onEdit: function (event) {
                    var grid = this;
                    var posicion = $(".img-footer").offset().top;
                    $("html, body").animate({
                        scrollTop: posicion
                    }, 2000);
                    event.onComplete = function () {
                        var id_evento = grid.getSelection()[0];
                        //console.log("evento seleccionar " + id_evento);
                        if (id_evento != undefined) {
                            $('.administrar-usuario').hide();
                            $('.administrar-usuario-editar').show();
                            //console.log("exito" + id_evento);
                            usuarioGet(id_evento, function (data) {
                                if (data.code == 200) {
                                    evento_id = id_evento;
                                    usuariTipoEditar = data.descripcion.tipo;
                                    $("#usuarios-nombre-editar").val(data.descripcion.nombre);
                                    $("#usuario-correo-editar").val(data.descripcion.correo);
                                    $("#usuario-tipo-editar option[value=" + data.descripcion.tipo + "]").attr("selected", true);

                                }
                            });
                        }
                    }
                },
                onDelete: function (event) {
                    var grid = this;
                    var id_evento = grid.getSelection()[0];
                    event.onComplete = function () {

                        usuarioDelete(id_evento, function (data) {
                            if (data.code == 200) {

                                $('#modalMensjae').modal("show");
                                $(".modal-body").text(data.descripcion);
                            } else {
                                $('#modalMensjae').modal("show");
                                $(".modal-body").text(data.descripcion);

                            }
                        });
                    }
                },
                onClick: function (event) {
                    var grid = this;
                    var posicion = $(".img-footer").offset().top;
                    $("html, body").animate({
                        scrollTop: posicion
                    }, 2000);
                    $('.administrar-usuario').hide();
                            $('.administrar-usuario-editar').hide();
                    event.onComplete = function () {
                        id_evento = grid.getSelection()[0];
                        console.log("evento seleccionar " + id_evento);

                        if (id_evento == undefined) {
                            $('.administrar-usuario').hide();
                            $('.administrar-usuario-editar').hide();
                        }
                    }
                }
            });
            $("#grid-usuarios").w2grid().refresh();
        } else {
            //alert("Error");
            $('#modalMensjae').modal("show");
            $(".modal-body").text(data.descripcion);
        }
        $("#grid-usuarios").w2grid().refresh();
    });


});


$("#formCrearUsuario").validate({
    rules: {
        "usuarios-nombre": {
            required: true,
            minlength: 5,
            maxlength: 40,
        },
        "usuario-correo": {
            required: true,
            email: true,
        },
        "usuario-password": {
            required: true,
            minlength: 5,
            maxlength: 40,
        },
        "usuario-password-confirmacion": {
            required: true,
            minlength: 5,
            maxlength: 40,
            equalTo: "#usuario-password"
        },
    },
    messages: {
        "usuarios-nombre": {
            required: "Nombre es requerido",
            minlength: "La longitud debe de ser mayora 4",
            maxlength: "La longitud debe de ser menor a 41",
        },
        "usuario-correo": {
            required: "Nombre es requerido",
            minlength: "La longitud debe de ser mayora 4",
            maxlength: "La longitud debe de ser menor a 41",
        },
        "usuario-password": {
            required: "Password es requerido",
            minlength: "La longitud debe de ser mayor a 5",
            maxlength: "La longitud debe de ser menor a 41",
        },
        "usuario-password-confirmacion": {
            required: "Password es requerido",
            minlength: "La longitud debe de ser mayor a 5",
            maxlength: "La longitud debe de ser menor a 41",
            equalTo: "debe de ser igual "
        },
    },
    submitHandler: function (form) {
        //form.submit();
        event.preventDefault();

        console.log("exito");
        //event.preventDefault();
        validarUsuario();
        //guardarEdita();



    }
});

function validarUsuario() {
    var datoNombre = $('#usuarios-nombre').val();
    var datoCorreo = $('#usuario-correo').val();
    var datoPassword = $('#usuario-password').val();
    var datoPassword2 = $('#usuario-password-confirmacion').val();
    console.log(datoNombre + ":::" + datoCorreo + ":::" + datoPassword + ":::" + usuariTipo);

    var usuarioNew = {
        nombre: datoNombre,
        tipo: usuariTipo,
        correo: datoCorreo,
        pass: datoPassword
    }

    usuarioCrear(usuarioNew, function (data) {
        if (data.code == 200) {
            $('.administrar-usuario').hide();
            var tipo = ""
            if (usuariTipo == 0) {
                tipo = "Admintrador";
            }
            if (usuariTipo == 1) {
                tipo = "Usuario";
            }
            if (usuariTipo == 2) {
                tipo = "Tecnico"
            }
            w2ui['user' + iterador2gripUsurio].add({
                recid: data._id,
                nombre: datoNombre,
                correo: datoCorreo,
                tipo: tipo
            });


        } else {

        }
    });

};

$("#formEditarUser").validate({
    rules: {
        "usuarios-nombre-editar": {
            required: true,
            minlength: 5,
            maxlength: 40,
        },
        "usuario-correo-editar": {
            required: true,
            email: true,
        },
        "usuario-password-editar": {
            //required: true,
            minlength: 5,
            maxlength: 40,
        },
        "usuario-password-confirmacion-editar": {
            //required: true,
            minlength: 5,
            maxlength: 40,
            equalTo: "#usuario-password-editar"
        },
    },
    messages: {
        "usuarios-nombre-editar": {
            required: "Nombre es requerido",
            minlength: "La longitud debe de ser mayora 4",
            maxlength: "La longitud debe de ser menor a 41",
        },
        "usuario-correo-editar": {
            required: "Nombre es requerido",
            minlength: "La longitud debe de ser mayora 4",
            maxlength: "La longitud debe de ser menor a 41",
        },
        "usuario-password-editar": {
            //required: "Password es requerido",
            minlength: "La longitud debe de ser mayor a 5",
            maxlength: "La longitud debe de ser menor a 41",
        },
        "usuario-password-confirmacion-editar": {
            //required: "Password es requerido",
            minlength: "La longitud debe de ser mayor a 5",
            maxlength: "La longitud debe de ser menor a 41",
            equalTo: "debe de ser igual "
        },
    },
    submitHandler: function (form) {
        //form.submit();
        event.preventDefault();
        //form.submit();
        console.log("exito editar ");
        //event.preventDefault();

        validarUsuarioEditar();



    }
});




$("#tempral").click(function () {
    var t = 'user' + iterador2gripUsurio;

})

function validarUsuarioEditar() {
    const firm = "[validarUsuarioEditar] ";
    var datoNombre = $('#usuarios-nombre-editar').val();
    var datoCorreo = $('#usuario-correo-editar').val();
    var password = $('#usuario-password-editar').val();
    var userUpdate = {
        nombre: datoNombre,
        tipo: usuariTipoEditar,
        correo: datoCorreo,
        pass: password
    }
    console.log("HolaMundo ")
    usuarioUpdate(evento_id, userUpdate, function (data) {
        console.log(firm, "respuesta ", data)
        if (data.code == 200) {
            console.log("exito" + data.descripcion);

            var tipo = ""
            if (data.json.tipo == 0) {
                tipo = "Admintrador";
            }
            if (data.json.tipo == 1) {
                tipo = "Usuario";
            }
            if (data.json.tipo == 2) {
                tipo = "Tecnico"
            }
            w2ui.user.editField(data.json.id, 0, data.json.nombre)
            w2ui.user.editField(data.json.id, 1, data.json.correo)
            w2ui.user.editField(data.json.id, 2, tipo)

            $('.administrar-usuario-editar').hide();
        } else {
            console.log("error " + data.descripcion);
        }
    });

};

function usuarioUpdate(id, usuario, callback) {
    console.log("hola " + JSON.stringify(usuario))
    $("#spinnerLoading").addClass("is-active");
    $.ajax({
        url: "/usuario/update",
        type: "POST",
        dataType: "json",
        data: {
            _id: id,
            user: JSON.stringify(usuario)
        },
        success: function (json) {
            $("#spinnerLoading").removeClass("is-active")
            //console.log(JSON.stringify(json));
            //llenarDatos(json[0]);
            callback(json);
            // getAuditorio(json[0].evento_datos.id_espacio, function() {
            // });
        },
        error: function (json) {
            $("#spinnerLoading").removeClass("is-active")
            console.log("ocurrio un error ");
        }
    });
}

function userLimpiar() {
    $('#usuarios-nombre').val("");
    $('#usuario-correo').val("");
    $('#usuario-password').val("");
    $('#usuario-password-confirmacion').val("");
}

function usuarioCrear(usuario, callback) {
    $("#spinnerLoading").addClass("is-active");
    $.ajax({
        url: "/usuario/crear",
        type: "POST",
        dataType: "json",
        data: {
            user: JSON.stringify(usuario)
        },
        success: function (json) {
            $("#spinnerLoading").removeClass("is-active")
            $("#grid-usuarios").w2grid().refresh();
            $('#modalMensjae').modal("show");
            $(".modal-body").text(json.descripcion);
            callback(json)
        },
        error: function (json) {
            $("#spinnerLoading").removeClass("is-active")
            $('#modalMensjae').modal("show");
            $(".modal-body").text(json.descripcion);
        }
    });
}

/**
 * 
 * @param {*} id 
 * @param {*} callback 
 */
function usuarioGet(id, callback) {
    $("#spinnerLoading").addClass("is-active");
    $.ajax({
        url: "/usuario/reade",
        type: "POST",
        dataType: "json",
        data: {
            user: id
        },
        success: function (json) {
            console.log(JSON.stringify(json));
            $("#spinnerLoading").removeClass("is-active")
            callback(json);
            //llenarDatos(json[0]);
            // getAuditorio(json[0].evento_datos.id_espacio, function() {
            // });
        },
        error: function (json) {
            $("#spinnerLoading").removeClass("is-active")
            console.log("ocurrio un error ");
        }
    });
}




function usuarioDelete(id, callback) {
    $("#spinnerLoading").addClass("is-active");
    $.ajax({
        url: "/usuario/delete",
        type: "POST",
        dataType: "json",
        data: {
            evento: id
        },
        success: function (json) {
            $("#spinnerLoading").removeClass("is-active")
            console.log(JSON.stringify(json));
            callback(json)
            //llenarDatos(json[0]);
            // getAuditorio(json[0].evento_datos.id_espacio, function() {
            // });
        },
        error: function (json) {
            $("#spinnerLoading").removeClass("is-active")
            console.log("ocurrio un error ");
        }
    });
}


function usuarioGetAll(callback) {
    $("#spinnerLoading").addClass("is-active");
    $.ajax({
        url: "/usuario/getAll",
        type: "POST",
        dataType: "json",
        success: function (json) {
            $("#spinnerLoading").removeClass("is-active")
            // console.log(Object.keys(json));
            // console.log(JSON.stringify(json));
            callback(json);
        },
        error: function (json) {
            $("#spinnerLoading").removeClass("is-active")
            $('#modalMensjae').modal("show");
            $(".modal-body").text("Error al obtener Usuarios");

        }
    });
}


/**
 * llena el formulario con el id que se selecciono en la tabla 
 * @param {*} id 
 */
function getDatosEvento(id) {
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
            // getAuditorio(json[0].evento_datos.id_espacio, function() {
            // });
        },
        error: function (json) {
            console.log("ocurrio un error ");
        }
    });
}

/**
 * obtiene los eventos con condiciones 
 * @param {*} data json que contiene condiciones 
 * @param {*} callback 
 */
function eventos(data, callback) {
    $("#spinnerLoading").addClass("is-active");
    $.ajax({
        url: "/eventos",
        type: 'POST',
        dataType: 'json',
        data: {
            query: JSON.stringify(data)
        },
        success: function (json) {
            //console.log("exito " + JSON.stringify(json));
            $("#spinnerLoading").removeClass("is-active")
            if (json.code == 400) {
                $('#modalMensjae').modal("show");
                $(".modal-body").text(json.descripcion);
            }
            callback(json)
        },
        error: function (json) {
            console.log("error " + JSON.stringify(json))
            $('#modalMensjae').modal("show");
            $(".modal-body").text("Ocurrio un erro con el servidor");
            $("#spinnerLoading").removeClass("is-active")
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
 * pestaña home 
 * cambia de status el folio 
 * @param {*} folio 
 */
function aceptar(folio) {
    const firm = "[aceptar Evento]"
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
            $("#spinnerLoading").removeClass("is-active")
            console.log("Respuesta status", data)

            if (data.code == 200) {
                $('#modalMensjae').modal("show");
                $(".modal-body").text(data.descripcion);
                //location.reload();
            } else {
                $('#modalMensjae').modal("show");
                $(".modal-body").text(data.descripcion);
            }
        },
        error: function (data) {

            $("#spinnerLoading").removeClass("is-active")
            location.reload();
        }
    });
}

/**
 * rechaza un evento  
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
            console.log("exito")
            console.log(data)
            $("#spinnerLoading").removeClass("is-active")
            $("#modalMensjae").show();
            $('#modalMensjae').modal("show");
                $(".modal-body").text(data.descripcion);
            //location.reload();
        },
        error: function (data) {
            console.log(data)
            $('#modalMensjae').modal("show");
            $(".modal-body").text(data.descripcion);
            $("#spinnerLoading").removeClass("is-active")

            //location.reload();
        }
    });
}
