const {MongoClient, ObjectId} = require("mongodb");

const connectionURL = "mongodb://localhost:27017";
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database!");
    }
    const db = client.db(databaseName);

    db.collection('users').deleteMany({
        age: "26"
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })
});