const mongoose = require('mongoose');
const express = require('express');
const app = express();
const routes = require('./routes/routes')(app);


//server PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`))


// cloud mongoDB database
const dbRoute = "mongodb+srv://new-user:1234@to-do-db-ukan2.mongodb.net/test?retryWrites=true/";

// connect to database
mongoose.connect(dbRoute, {
    useNewUrlParser: true
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

