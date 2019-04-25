const {User, validateUser} = require('../models/user');
const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();


// Będziemy korzystać z tego usera:
// email: testuser@gmail.com
// password: 345cthh2
router.post("/", async (req, res) => {
    console.log(req.body);
    const {
        error
    } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();

    res.header('x-auth-token', token);
    res.send(true)
    
});

module.exports = router;