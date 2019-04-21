const express = require('express');
const app = express();
const routes = require('./routes/routes')(app);
const db = require('./db')();
const {List, validate} = require('./models/list.js');


//server PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`))


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