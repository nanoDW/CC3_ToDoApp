const express = require('express');
const app = express();
const routes = require('./routes/routes')(app);
const db = require('./db')();


//server PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`))


