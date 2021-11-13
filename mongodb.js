const {MongoClient, ObjectId} = require("mongodb");

const connectionURL = "mongodb://localhost:27017";
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database!");
    }
    const db = client.db(databaseName);

    Gdb.collection('tasks').findOne({_id: new ObjectId("618f8559a86bc7066be8a7b7")}, (error, task) => {
        console.log(task);
    })

    db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
        console.log(tasks);
    })
});