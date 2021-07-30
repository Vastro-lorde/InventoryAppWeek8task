
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const mongoose = require('mongoose');



const auth = async (req, res, next) => {
    let token = req.headers.authorization;
    try {
        const email = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({email: email})
        req.user = user;
        next()
    } catch (error) {
        console.error(error);
        console.error(token);
        res.json({
            Status: 'Failed!',
            message:"Please Login!"
        })
    }
}

module.exports = auth;