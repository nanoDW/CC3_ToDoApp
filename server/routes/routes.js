const express = require("express");
const __list = require('../models/list');
const __task = require('../models/task');
const {loginRouter, auth} = require('./login.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');


module.exports = function (app) {
    const List = __list.List;
    const validateList = __list.validate;
    
    const Task = __task.Task;
    const validateTask = __task.validate;

    app.use(cors({
        credentials: true,
        origin: "http://127.0.0.1:5500"
    }));

    app.use(express.json());
    app.use(express.urlencoded());
    app.use('/login', loginRouter);
    app.use(cookieParser());

    app.post("/user/lists", auth, async (req, res) => {
        
        const { error } = validateList(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }
            
        const list = new List({
            userId: req.user,
            name: req.body.name,
            color: req.body.color
        });

        await list.save();
        res.send(list);
    });

    app.get("/user/lists", auth, async (req, res) => {
        const lists = await List.find({
            userId: req.user
        });

        for(let i = 0; i<lists.length; i++){
            lists[i].tasks = await getTasks(lists[i].name, req.user)
        }

        if(!lists) {
            return res.status(404).send('You have not created any lists yet.');
        }

        res.send(lists);
    });

    app.put("/user/lists/:id", auth, async (req, res) => {

        const { error } = validateList(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }

        const result = await List.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                color: req.body.color
            }
        }, { new: true });

        res.send(result);
    });

    app.delete("/user/lists/:id", auth,  async (req, res) => {
        const result = await List.findByIdAndRemove(req.params.id );
        if(!result) res.status(400).send('List doesnt exist')
        else res.send('List deleted successfully');

        if (result.name) deleteTaskByListname(result.name);
    });

    app.post("/user/tasks", auth, async (req, res) => {

        const { error } = validateTask(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }

        const task = new Task({
            userId: req.user,
            name: req.body.name,
            list: req.body.list,
            deadline: req.body.deadline
        });

        await task.save();
        res.send(task);
    });

    app.get("/user/tasks", auth,  async (req, res) => {
        const tasks = await Task.find({
            userId: req.user
        });

            res.send(tasks);
    });

    app.put("/user/tasks/:id", auth, async (req, res) => {

        const { error } = validateTask(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }

        const result = await Task.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                list: req.body.list,
                deadline: req.body.deadline
            }
        }, { new: true });

        res.send(result);
    });

    app.delete("/user/tasks/:id", auth,  async (req, res) => {
        const result = await Task.findByIdAndRemove(req.params.id);
        if (!result) res.status(400).send('Task doesnt exist')
        else res.send('Task deleted successfully');
    });

    async function getTasks(list, userId){
        const tasks = Task.find( {list: list, userId: userId} );
        return tasks;
    }

    async function deleteTaskByListname(listName) {
        const tasks = await Task.deleteMany({list: listName})
        console.log(`Removed tasks that belong to list: ${listName}`);
    }
   
}