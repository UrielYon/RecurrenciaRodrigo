var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");


    // Insert a single document
    var dbo = db.db("aulas");

    // Get first two documents that match the query
    dbo.collection("solicitudes").aggregate([{
            $match: {
                'evento_datos.fecha': { $gte: new Date('2019-09-01'), $lte: new Date('2019-09-30') },
                'registro.status': 10
            }
        },
        {
            $group: {
                _id: { auditorio: '$evento_datos.id_espacio' },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id.auditorio": 1 } }
    ]).toArray(function(err, docs) {
        //assert.equal(null, err);
        console.log(docs)
            //assert.equal(3, docs[0].total);
        db.close();
    });

});