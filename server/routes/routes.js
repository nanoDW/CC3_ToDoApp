const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require("mongoose");

module.exports = function (app) {

    const __list = require('../models/list');
    const List = __list.List;
    const validateList = __list.validate;

    const __task = require('../models/task');
    const Task = __task.Task;
    const validateTask = __task.validate;

    const jsonParser = bodyParser.json();

    app.post("/lists", jsonParser, async (req, res) => {

        const currentDate = Date.now();

        const list = new List({
            name: req.body.name,
            createdAt: currentDate,
            color: req.body.color,
        });
        await list.save();
        res.send(list);
    });

    app.get("/lists", async (req, res) => {
        const lists = await List.find({
            name: 'list'
        });

        if(lists) {
            res.send(lists);
        }
    });

    app.post("/tasks", jsonParser, async (req, res) => {
        
        const task = new Task({
            name: req.body.name,
            date: req.body.date,
            list: req.body.list,
            deadline: req.body.deadline
        });

        await task.save();
        res.send(task);
    });

    app.get("/tasks", async (req, res) => {
        const tasks = await Task.find({
            list: 'ds'
        });

        if(tasks) {
            res.send(tasks);
        }
    });
   
}