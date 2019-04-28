const mongoose = require("mongoose");
const Joi = require('joi');
const ObjectId = mongoose.Schema.Types.ObjectId;


const ListSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        minlength: 1,
        maxlength: 100,
        required: true,
        unique: true,
        dropDups: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    color: String,
    tasks: []
});

const List = mongoose.model("List", ListSchema);

function validateList(list) {
    const schema = {
        name: Joi.string().min(1).max(100).required(),
        color: Joi.string(),
    };

    return Joi.validate(list, schema);
}


exports.List = List;
exports.validate = validateList;