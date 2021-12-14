const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect("mongodb://localhost:27017/task-manger-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
});
