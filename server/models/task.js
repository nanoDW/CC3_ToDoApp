const mongoose = require("mongoose");
const Joi = require('joi');


const TaskSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: { 
        type: String,
        minlength: 1,
        maxlength: 250, 
        required: true
    },
    list: { 
        type: String, 
        minlength: 1,
        maxlength: 100,
        required: true},
    createdAt: { 
        type: Date, 
        default: Date.now},
    deadline: Date
});

const Task = mongoose.model("Task", TaskSchema);

function validateTask(task) {
    const schema = {
        name: Joi.string().min(1).max(250).required(),
        list: Joi.string().min(1).max(100).required(),
        deadline: Joi.date().min('now')
    };

    return Joi.validate(task, schema);
}
/*testowanie
let task = {
    name: 'do something',
    date: '2019-07-05',
    list: 'ds',
    deadline: '2019-06-22'
}
let result = validateTask(task);
console.log(result);
//testowanie*/

exports.Task = Task;
exports.validate = validateTask;