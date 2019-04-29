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
    done: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model("Task", TaskSchema);

function validateTask(task) {
    const schema = {
        name: Joi.string().min(1).max(250).required(),
        list: Joi.string().min(1).max(100).required(),
        done: Joi.boolean()
    };

    return Joi.validate(task, schema);
}


exports.Task = Task;
exports.validate = validateTask;