const express = require('express');
const db = require('./db')();
const app = express();
const routes = require('./routes/routes')(app);
const cors = require('cors');
require('../prod.js')(app);
const config = require('config');
const path = require('path');
/*
const {User} = require('./models/user.js');
const bcrypt = require('bcrypt');
const Joi = require('joi');
*/


//server PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`CORS-enebled web server is now running...`)
    console.log(`Listening on port ${port}...`)
})

// CORS config
app.use(cors());
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// }); 


//Body request
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use(express.static(path.join(__dirname, '../dist')));


//ERROR
app.get("*", function (req, res) {
    res.status(404).send("Error 404. Page not found");
});

//PRIVATE KEY
if (!config.get('jwtPrivateKey')) {
    console.error('jwtPrivateKey is not defined.');
    process.exit(1); 
}

/*
// creating user 
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('345cthh2', salt);
    let user = new User({
        name: 'test',
        email: 'testuser@gmail.com',
        password: hashed
    })
    let result = await user.save();
    console.log(result);
}
*/