const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const __list = require('../models/list');
const __task = require('../models/task');
const {User, validateUser} = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = function (app) {
    const List = __list.List;
    const validateList = __list.validate;
    
    const Task = __task.Task;
    const validateTask = __task.validate;

    app.use(express.json());
    app.use(express.urlencoded());

    app.post("/api/lists", async (req, res) => {

        const list = new List({
            name: req.body.name,
            color: req.body.color
        });

        const listValidation = validateList(list.toObject());

        if (listValidation.error) {
            res.status(400).send(listValidation.error.details[0].message);
            return;
        }

        await list.save();
        res.send(list);
    });

    app.get("/api/lists", async (req, res) => {
        const lists = await List.find();

            res.send(lists);
    });

    app.put("/api/lists:id", async (req, res) => {

    });

    app.post("/api/tasks", async (req, res) => {
        
        const task = new Task({
            name: req.body.name,
            list: req.body.list,
            deadline: req.body.deadline
        });

        const taskValidation = validateTask(task.toObject());

        if (taskValidation.error) {
            res.status(400).send(taskValidation.error.details[0].message);
            return;
        }

        await task.save();
        res.send(task);
    });

    app.get("/api/tasks", async (req, res) => {
        const tasks = await Task.find();

            res.send(tasks);
    });

    // [KAMILA] TO NIE JEST SKOŃCZONE, ALE POWIE WAM CZY DANY USER JEST W BAZIE DANYCH
    // Będziemy korzystać z tego usera:
    // email: testuser@gmail.com
    // password: 345cthh2
    app.post("/api/login", jsonParser, async(req, res) => {
        console.log(req.body);
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password');

        //const token = jwt.sign({ _id: user._id }, )
    
        res.send(true);
    });
   
}