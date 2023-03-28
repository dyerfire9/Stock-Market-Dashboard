const mongoose = require('mongoose')

// Create schema
const Schema = mongoose.Schema

// Define Schema - subbed stocks
const userSchema = new Schema({
    

}, {timestamps: true})


// Create model
module.exports = mongoose.model('Stocks', userSchema)