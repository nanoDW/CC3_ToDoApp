const mongoose = require('mongoose');


// cloud mongoDB database
const dbRoute = "mongodb+srv://new-user:1234@to-do-db-ukan2.mongodb.net/test?retryWrites=true/";

// connect to database
mongoose.connect(dbRoute, {
    useNewUrlParser: true
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

