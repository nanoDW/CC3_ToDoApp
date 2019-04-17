const mongoose = require("mongoose");
const Joi = require('joi');


const TaskSchema = new mongoose.Schema({
    name: { 
        type: String,
        minlength: 1,
        maxlength: 50, 
        required: true
    },
    list: { 
        type: String, 
        minlength: 1,
        maxlength: 30,
        required: true},
    date: { 
        type: Date, 
        default: Date.now},
    deadline: Date
});

const Task = mongoose.model("Task", TaskSchema);

function validateTask(task) {
    const schema = {
        name: Joi.string().min(1).max(50).required(),
        list: Joi.string().min(1).max(30).required(),
        date: Joi.date().min('now'),
        deadline: Joi.date().min('now')
    };

    return Joi.validate(task, schema);
}

//testowanie
let task = {
    name: 'do something',
    date: '2019-07-05',
    list: 'ds',
    deadline: '2019-06-22'
}
let result = validateTask(task);
console.log(result);
//testowanie

exports.Task = Task;
exports.validate = validateTask;