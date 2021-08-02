// importing the necessary modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');

// controller for signup of a user
exports.createUser = async (req, res, next) => {

    try {

        // input validation product
        if (req.body.password !== req.body.confirmPassword) {
            res.send(`password and confirm password doesn't match`);
        }
        // check exists
        let checkEmail = await User.findOne({ email: req.body.email})
        if (checkEmail){
            console.log(checkEmail)
            res.status(401).json({
                status: 'failed',
                message: 'email already exists'
            })
        }
        // hash password
        console.log(req.body.password)
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let theUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
        }

        // creates the user in database
        const user = await User.create(theUser)
        
        res.status(201).json({
            status: 'success',
            data: user
        })
        
    } catch(err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}

// function to get list of all users in the database
exports.getAllUsers = async (req, res, next) => {

    try {
        const user = await User.find()
        
        res.status(201).json({
            status: 'success',
            data: user
        })
        // res.send(user)
        
    } catch(error) {
        res.status(400).json({
            status: 'fail',
            error: "failed to get"
        });
        console.error();
    }

    next()
}

exports.signin = async (req, res, next) => {

    try {
        let checkEmail = await User.findOne({ email: req.body.email})
        if (!checkEmail){
            console.log(checkEmail)
            res.status(401).json({
                status: 'failed',
                message: 'No user with that email was found'
            })

        }
        if (await bcrypt.compare(req.body.password , checkEmail.password)){
            console.log(req.body.password + " " + checkEmail.password);

            // creating the token from the email and secret
            checkEmail.token = jwt.sign( checkEmail.email, process.env.SECRET_KEY)
            res.status(201).json({
                status: 'success',
                data: checkEmail
            })
        }
        else {
            console.log(req.body.password + " " + checkEmail.password);
            res.status(400).json({
                status: 'fail',
                message: 'Wrong password'
            })
         } 
        }
         catch(err) {
             console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}

exports.updateUser = async (req, res, next) => {

    const {firstName, lastName } = req.body
    try {
        const user = await User.findByIdAndUpdate({ _id: req.params.id}, {
            firstName,
            lastName
        }, {
            new: true
        }
        )
        
        res.status(200).json({
            status: 'success',
            data: user
        })
        
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id}, {
            useFindAndModify: false
        })
        
        res.status(200).json({
            status: 'success',
            data: user
        })
        
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}