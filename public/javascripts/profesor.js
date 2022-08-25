/**
 * index.
 * @module auditorio/index
 */

import {
    validar,
    limpiar,
    getFechas,
    buscarDisponibilidad,
    auditorio_,
    tabla
} from './lib/vendor'
import bootstrap from 'bootstrap';
import '../js/datepicker/bootstrap-datepicker';
import '../js/datepicker/locales/bootstrap-datepicker.es';
//css
import '../css/datepicker/datepicker.css';
import '../css/bootstrap/bootstrap-blanco.css';
import '../js/validate/jquery.validate.js'
import '../stylesheets/style.css';

//import validate from 'jquery-validation'


let auditorios;
let auditorio;
let checkDiseno = false;

let fechaInicio = new Date();
fechaInicio.setDate(fechaInicio.getDate() - 1);
/**
 * inits boostrap 4 datepicker .
 * @doc https://github.com/uxsolutions/bootstrap-datepicker/blob/master/docs/index.rst
 * @doc https://bootstrap-datepicker.readthedocs.io/en/latest/events.html#show
 */

/**
 * elementos que se ocultos, condidicionados
 * 
 */

$('.check-diseño').hide();
$('.check-difusion').hide();
$("#otro_texto").hide();
$("#otro_difusion").hide();
$(".respuestaModal").hide();
$(".modalInicio").show();



auditorio_(function (err, data) {
    if (err) {
        console.log("Error servicio auditorio ", err);
    }
    if (data.status == 400) {
        alert(data.mensaje);
    } else {
        //console.log("llenar datos ",data)
        //console.log(Object.keys(data[0].id));
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
    console.log("mostrar", fecha, "Formato del auditorio", $("#select-auditorio").val());
    gneraHTML();
    tabla(fecha, $("#select-auditorio").val());




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

$("#solo_una_vez").click(function () {
    $('.recurrente').hide();
    $('.diario').hide();
    $('.normal').show();
    $('.ocultar').hide();
    $('.calendario').hide();
    console.log("Hola mundo");
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

$.validator.addMethod('correoEXP', function (value) {
    console.log("entro a exprecion regular")
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@ciencias.unam.mx/.test(value);
}, 'El correo debe de ser el institucional');



$('#formulario').validate({
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
            correoEXP: "requerido"
            //pattern: /^[A-Z]{2}[0-9]{5}$/
            //regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@ciencias.unam.mx/

            //email: true,
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
            number: true,
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
        $(".modalFin").show();
        //$(".modal-body").append("");

        validar("1");
        // $(".modal-ocultar").hide();
        // $(".modal-mensaje").hide();
        // $(".modal-ocultar-aceptar").show();


    }

});

$(".guarda").click(function () {
    validar();
})

$(".cierra-modal").click(function () {
    $("#aceptarTerminosYcondiciones").prop("checked", false);
    $(".modalFin").hide();
})

$("#modalInicio").click(function () {
    $(".modalInicio").hide();

})

$("#aceptrarTerminos").click(function () {
    validar();
    $(".modal-ocultar-aceptar").hide();
});


/**
 * actuliza el el valor de el id de el auditorio 
 */
$("#select-auditorioD").change(function changedSelect() {
    auditorio = $(this).val();
});

$("#select-auditorioR").change(function changedSelect() {
    auditorio = $(this).val();
});
$("#select-auditorioN").change(function changedSelect() {
    auditorio = $(this).val();
});
/**
 * genera html  los servicios dependiendo de el auditorio que ha seleccionado 
 * genera horario 
 * genera servicios 
 * 
 */

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
        if (auditorio.horario.entreSemana != undefined) {

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


/**
 * habilita el boton de aceptar p
 */

$("#aceptarTerminosYcondiciones").change(function () {
    console.log("cambio el otro", $('#aceptarTerminosYcondiciones').is(':checked'));
    if ($('#aceptarTerminosYcondiciones').is(':checked')) {
        $(".guarda").prop('disabled', false);

        // habilito boton 
    } else {
        $(".guarda").prop('disabled', true);

    }
});
/**
 * modal 
 */

$(".respuestaModal").click(function () {
    location.reload();

})


$("#modalError").click(function () {
    $(".modalError").hide()
});

$("#modalErrorDiario").click(function () {
    $(".modalErrorDiario").hide()
});

