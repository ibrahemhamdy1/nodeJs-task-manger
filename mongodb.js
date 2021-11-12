const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://localhost:27017";
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);

        db.collection('users').insertMany([
            {
                name: 'hamdy',
                age : '26',
            },
            {
                name: 'ahmed',
                age : '26',
            }
        ], (error, result) => {
            if(error) {
                return console.log('Unable to insert documents!');
            }

            console.log(result.ops);
        }
    )
});