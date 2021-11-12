const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://localhost:27017";
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);

    db.collection('users').insertOne({
        name: 'hema',
        age : '26',
    })
    db.collection('users').insertOne({
        name: 'ahmed',
        age : '26',
    })
});