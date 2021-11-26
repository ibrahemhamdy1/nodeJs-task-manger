const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect("mongodb://localhost:27017/task-manger-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: true,
    },
});

const task = new Task({
    description: "Learn the mongoDb",
});

task.save().then((result) => {
    console.log(result);
}).catch((error)=> {
    console.log(error);
});