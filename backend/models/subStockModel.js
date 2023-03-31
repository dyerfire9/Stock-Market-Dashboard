const mongoose = require('mongoose')

// Create schema
const Schema = mongoose.Schema

// Define Schema - Stocks that were bought
const subStockSchema = new Schema({
    ticker: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})


// Create model
module.exports = mongoose.model('subStock', subStockSchema)