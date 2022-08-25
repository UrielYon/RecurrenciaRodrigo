var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://172.19.78.169:27017/aulas";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});