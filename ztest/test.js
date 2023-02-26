
/**
 * fecha 
 */

var fecha1 = new Date("Wed May 20 2019 00:00:00 GMT-0500");

console.log(fecha1.getDay());
console.log(fecha1.getFullYear());
console.log(fecha1.getMonth());
console.log(fecha1.getDate())

var fecha2 = new Date(fecha1.getFullYear(), fecha1.getMonth(), fecha1.getDate());
var fecha3 = new Date(fecha1.getFullYear(), fecha1.getMonth(), fecha1.getDate() - 1);


// console.log(fecha2)
// console.log(fecha3)

function fechas(fecha, callback) {
    var numDia = fecha.getDay();

    console.log("dia:" + numDia)

    var fechaInicio = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - (numDia - 1));
    var fechaFin = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + (5 - numDia));
    console.log("fecha inicio:" + fechaInicio);
    console.log("fecha fin:" + fechaFin);
    callback(false, fechaInicio, fechaFin);
}

fechas(fecha1, function (err, d1, d2) {
    if (err) {
        console.log("error");
    } else {
        console.log("d1: " + d1);
        console.log("d1: " + d2);

    }
});
