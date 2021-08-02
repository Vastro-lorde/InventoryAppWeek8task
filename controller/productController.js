const mongoose = require('mongoose')

const Product = require('../models/productModel.js')

exports.getAllProducts = async (req, res, next) => {
    try {
        const product = await Product.find({user: req.user._id})
        
        res.status(201).json({
            status: 'success',
            data: product
        })
        
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}

exports.createProduct = async (req, res, next) => {
console.log(req.user)
    try {

        // input validation product
        let checkItem = await Product.findOne({ name: req.body.name})
        // check exists
        if (checkItem){
            console.log(checkItem.amount)
            console.log(req.body.amount)
            newAmount = req.body.amount + checkItem.amount;
            console.log(newAmount);
            const item = await Product.findOneAndUpdate({ name: req.body.name},{...req.body, user: req.user._id, amount: newAmount})
            res.status(201).json({
                status: 'Successfully added',
                data: item
            })
        }
        else {
        const item = await Product.create({...req.body, user: req.user._id})
        
        res.status(201).json({
            status: 'successfully created',
            data: item
        })}
        
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}

exports.updateProduct = async (req, res, next) => {

    try {
        const item = await Product.findByIdAndUpdate({ _id: req.params.id}, req.body, { new: true })
        
        res.status(200).json({
            status: 'success',
            data: item
        })
        
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const id = req.body.id;
        const item = await Product.findByIdAndDelete(id);
        console.log(item)
        res.status(200).json({
            status: 'successfully deleted',
            data: item
        });
        
    } catch(err) {
        
        res.status(400).json({
            status: 'fail to delete',
            error: err
        });
    }
    next();
}