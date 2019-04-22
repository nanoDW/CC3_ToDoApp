const Joi = require('joi');
const express = require('express');
const db = require('./db')();
const app = express();
const routes = require('./routes/routes')(app);
const cors = require('cors');
const {List, validate} = require('./models/list.js');


//server PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`CORS-enebled web server is now running...`)
    console.log(`Listening on port ${port}...`)
})

//CORS config
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}); 

//Body request
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


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