// This userModel.js is to create the object of each user in the Mongodb database IE schema.

// Importing mongoose
const mongoose = require('mongoose');



// created the Schema using .Schema() method in the mongoose class object creator that's why its mongoose.Schema .
const productSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: ['true', 'Please input the name of the product' ]
    },
    description: {
        type: String,
        required: ['true', 'Please input a description of the product' ]
    },
    amount: {
        type: Number,
        required: ['true', 'Please input the amount/quantity of product']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
       }

});

// creates the user using the mongoose model() method which takes in the name of the model and the Schema(in our case userSchema)
const Product = mongoose.model('Product', productSchema)

// Exporting the product.
module.exports = Product;