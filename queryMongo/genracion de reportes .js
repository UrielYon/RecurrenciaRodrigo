
/*
* buca datos para hacer un reporte
* se muestra la fecha 
* la horas 
* nombre evento , tipo 
* el nombre de el auditorio
* los servicios 
*/
db.solicitudes.find(
{
 $and: [
    { "evento_datos.fecha": { $gte: new Date('2019-09-01') } },
    { "evento_datos.fecha": { $lte: new Date('2019-09-30') } },
    { "registro.status":10},
    { "evento_datos.id_espacio":1}
        ]  
}
,{ "evento_datos.fecha":1,
    "evento_datos.id_espacio":1,
     "evento_datos.hora":1,
     "evento_datos.nombre":1,
     "evento_tipo.tipo":1,     
     "datos_profesores.nombre":1,
     "servicios":1}
    )
     