const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect("mongodb://localhost:27017/task-manger-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes("password") ) {
                throw new Error('Password can not contain "Password"');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0 ) {
                throw new Error('Age most be a positive number');
            }
        }
    }
});

const me = new User({
    name: "hema",
    email: "mslm356@gmail.com",
    password: "     aaaaaaaaaaaaa    ",
})

me.save().then((result) => {
    console.log(result);
}).catch((error)=> {
    console.log(error);
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