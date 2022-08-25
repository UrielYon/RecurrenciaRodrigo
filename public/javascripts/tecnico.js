import '../js/datepicker/bootstrap-datepicker';
import '../js/datepicker/locales/bootstrap-datepicker.es';
import '../css/datepicker/datepicker.css';
import '../css/bootstrap/bootstrap-blanco.css';
import '../stylesheets/w2ui-1.5.rc1.css';


const columnasGrip = [{
    field: 'auditorio',
    caption: 'Auditorio',
    sortable: true,
    editable: { type: 'text' },
    size: '15%'
}, {
    field: 'nombre_evento',
    caption: 'Nombre Evento',
    sortable: true,
    editable: { type: 'text' },
    info: true,
    size: '10%'
}, {
    field: 'horas',
    caption: 'horas',
    sortable: true,
    size: '10%'
}, {
    field: 'fecha',
    caption: 'Fecha',
    sortable: true,
    size: '10%'
}, {
    field: 'material',
    caption: 'Material',
    sortable: true,
    editable: { type: 'text' },
    size: '20%'
}, {
    field: 'materialCatidad',
    caption: 'Material Catidad',
    sortable: true,
    editable: { type: 'text' },
    size: '40%'
}];

/*
 **************************************************
 **************************************************
 *         funciones pestaña Home 
 **************************************************
 **************************************************
 */
$(".datepicker").datepicker({
    //format: 'dd-mm-yyyy',
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
 * Pestaña home
 * muestra los auditorios para buscarlos 
 */
auditorio_(function(err, data) {
    if (data.status == 400) {
        console.log("error")
    } else {
        data.forEach(element => {
            let checkbox = `<div class="custom-control custom-checkbox">
                                <input id="checkbox-auditorios-${element._id}" type="checkbox" name="auditorios-check" class="custom-control-input" value="${element._id}">
                                <label class="custom-control-label" for="checkbox-auditorios-${element._id}" >${element.nombre}</label>
                            </div>`;
            $("#auditorios").append(checkbox).hide().fadeIn(400);
        });
    }
});
var iteradorTable = 0;
/**
 * pestaña home 
 * al precionar el boton de buscar 
 */
$("#buscar").click(function() {
    var auditorios = [];
    var fechaF = $("#fechaF").val();
    var fechaI = $("#fechaI").val();
    $.each($("input[name='auditorios-check']:checked"), function() {
        //console.log($(this).val())
        auditorios.push(parseInt($(this).val()));
    });
    //console.log(auditorios.length);
    const auditorioAll = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var queryTemporal = {
        fechaFin: new Date(fechaF),
        fechaInicio: new Date(fechaI),
        auditorio: auditorios.length == 0 ? auditorioAll : auditorios,
    };
    var queryTemporal_ = {
        fechaInicio: new Date(2000, 11, 1),
        fechaFin: new Date(2019, 12, 12),
        auditorio: auditorioAll,
    };
    getMaterial(queryTemporal, function(data) {
        //console.log(data.descripcion)
        if (data.code == 200) {
            $("#tabla").show();
            $('#grid').w2grid({
                name: 'Material' + (iteradorTable++),
                show: {
                    header: true,
                    lineNumbers: true,
                    show: { lineNumbers: true },
                    toolbar: true,
                    footer: true
                },
                columns: columnasGrip, //columnasGrip,
                records: data.descripcion,
            });
            $("#grid").w2grid().refresh();
            // if ($("#grid").w2grid() == null) {
            //     w2ui['Material'].refresh();
            // }
        } else {
            alert(data.descripcion);
            $("#tabla").hide();
        }
    })
});


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
        success: function(mensaje) {
            //console.log("datos" + mensaje);
            callback(false, mensaje)
        },
        error: function(xhr, status) {
            console.log('Disculpe, existió un problema');
            callback(true, mensaje)
        },
    });
}

function getMaterial(data, callback) {
    const firm = "[auditorio] ";
    $.ajax({
        url: "/get/material",
        type: 'POST',
        dataType: 'json',
        data: {
            query: JSON.stringify(data)
        },
        success: function(mensaje) {
            //console.log("datos: " + JSON.stringify(mensaje));
            callback(mensaje)
        },
        error: function(xhr, status) {
            alert('Disculpe, existió un problema ');
            //callback(true, mensaje)
        },
    });
}