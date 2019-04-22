const Joi = require('joi');
const express = require('express');
const db = require('./db')();
const app = express();
const routes = require('./routes/routes')(app);
const {List, validate} = require('./models/list.js');


//server PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`))

//
app.use(express.json());

//ERROR
app.get("*", function (req, res) {
    res.status(404).send("Error 404. Page not found");
});

//testowanie
async function createList() {
    let list = new List({
        name: 'list',
        createdAt: '2019-07-05',
        color: 'purple',
        tasks: []
    })
    let result = await list.save();
    console.log(result);
}

createList();
//testowanie