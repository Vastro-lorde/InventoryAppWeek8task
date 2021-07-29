// This userModel.js is to create the object of each user in the Mongodb database IE schema.

// Importing mongoose
const mongoose = require('mongoose');


// created the Schema using .Schema() method in the mongoose class object creator that's why its mongoose.Schema .
const userSchema =  new mongoose.Schema({
    firstName: {
        type: String,
        required: ['true', 'Please input firstName' ]
    },
    lastName: {
        type: String,
        required: ['true', 'Please input lastname' ]
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: ['true', 'Please input firstName' ]
    },
    token: { type: String,}

})


// creates the user using the mongoose model() method which takes in the name of the model and the Schema(in our case userSchema)
const User = mongoose.model('User', userSchema)

// Exporting the product.
module.exports = User