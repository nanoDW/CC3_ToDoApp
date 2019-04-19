const express = require("express");
const mongoose = require("mongoose");

module.exports = function (app) {

    const __list = require('../models/list');
    const List = __list.List;
    const validateList = __list.validate;

    const task = require('../models/task');
    const Task = task.Task;
    const validateTask = task.validate;


    app.post("/lists", async (req, res) => {
        
        const list = new List({
            name: 'list',
            createdAt: '2019-01-02',
            color: 'red'
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

    app.post("/tasks", async (req, res) => {
        
        const task = new Task({
            name: 'do something more',
            date: '2019-07-05',
            list: 'ds',
            deadline: '2019-06-22'
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