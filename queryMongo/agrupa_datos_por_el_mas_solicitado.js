db.solicitudes.aggregate(
        [ 
          {$match : {
            'evento_datos.fecha' : { $gte: new Date('2019-09-01') ,$lte: new Date('2019-09-30')},
            'registro.status':10
            
            }            
        },
        {
         $group:{
            _id: {auditorio:'$evento_datos.auditorio'},             
            count:{$sum:1}             
             }   
         },
         {$sort:{"_id.auditorio":1}}        
        ]   
)