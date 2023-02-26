var fechaI = new Date("2019-09-13")
var fechaF = new Date("2019-09-20")

var fechaT = fechaI

for (let dia = 1; dia <= 7; dia++) {


    fechaT.setDate(fechaT.getDate() + 1)
    console.log(fechaT)
    console.log(dia + "-----------")

}