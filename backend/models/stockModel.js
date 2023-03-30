const mongoose = require('mongoose')

// Create schema
const Schema = mongoose.Schema

// Define Schema - Stocks that were bought
const stockSchema = new Schema({
    ticker: {
        type: String,
        required: true
    },
    shares: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})


// Create model
module.exports = mongoose.model('Stocks', stockSchema)