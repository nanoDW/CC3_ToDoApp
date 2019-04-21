const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const __list = require('../models/list');
const __task = require('../models/task');

module.exports = function (app) {
    const List = __list.List;
    const validateList = __list.validate;
    
    const Task = __task.Task;
    const validateTask = __task.validate;

    const jsonParser = bodyParser.json();

    app.post("/api/lists", jsonParser, async (req, res) => {

        const currentDate = Date.now();

        const list = new List({
            name: req.body.name,
            createdAt: currentDate,
            color: req.body.color
        });

        if (validateList(list).error){
            res.status(400).send(validateList(list).error.details[0].message);
            return;
        }

        await list.save();
        res.send(list);
    });

    app.get("/api/lists", async (req, res) => {
        const lists = await List.find();

            res.send(lists);
    });
    app.get("/api/lists:_id", async (req, res) => {
        const lists = await List.find(c => {
            console.log(c)
            console.log(req.params)
            return c._id === req.params._id;
        });
            res.send(lists);
    });

    app.post("/api/tasks", jsonParser, async (req, res) => {
        
        const task = new Task({
            name: req.body.name,
            date: req.body.date,
            list: req.body.list,
            deadline: req.body.deadline
        });

        if (validateTask(task).error) {
            res.status(400).send(validateTask(task).error.details[0].message);
            return;
        }

        await task.save();
        res.send(task);
    });

    app.get("/api/tasks", async (req, res) => {
        const tasks = await Task.find();

            res.send(tasks);
    });
   
}