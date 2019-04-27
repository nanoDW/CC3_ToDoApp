const {User, validateUser} = require('../models/user');
const bcrypt = require("bcrypt");
const express = require('express');
const cors = require('cors');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const config = require('config');


router.use(cors({
    credentials: true,
    origin: "http://127.0.0.1:5500"
}));

router.use(cookieParser());

// Będziemy korzystać z tego usera:
// email: testuser@gmail.com
// password: 345cthh2
router.post("/", async (req, res) => {
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
    
    // res.clearCookie('token')
    res.cookie('token', token).send('Cookie is set');
});

function auth(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Access denied. No token provided.')
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
}

module.exports = {
    loginRouter: router,
    auth: auth
}