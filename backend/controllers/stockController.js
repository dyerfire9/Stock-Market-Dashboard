const Stock = require('../models/stockModel')
const mongoose = require('mongoose')
let cts = require('check-ticker-symbol');

// const tickerData = require('../dataset/tickers')

// get all stocks
const getStocks = async (req, res) => {
    const user_id = req.user._id

    // Find docs that are created/owned by the user
    const stocks = await Stock.find({user_id}).sort({createAt: -1})

    res.status(200).json(stocks)
}   


// get a single stock
const getStock = async (req, res) => {
    // Grab the id property from the req.params
    const {id} = req.params
    
    // We need to check if the object id is valid (from MongoDB)
    // If it isn't, it return error 404. Otherwise, carry on.
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'ID not found, No Such Stock'})
    }
    // Get the stock document by finding it by its ID
    const stock = await Stock.findById(id)

    // If the document does not exist, return an error
    if(!stock){
        return res.status(404).json({error: 'No such Stock'})
    }
    // If stock document is found
    res.status(200).json(stock)
}

// create a new stock
const createStock = async (req, res) => {
   // Get the stock details from the request
   const {ticker, shares, cost} = req.body

   // We will handle the empty fields and throw a error
   let emptyFields = []
   let wrongTicker = true

   // If titles field is empty
   if(!ticker){
       emptyFields.push('ticker')
   }
   if(!shares){
       emptyFields.push('shares')
   }
   if(!cost){
       emptyFields.push('cost')
   }
   if(emptyFields.length > 0){
       return res.status(400).json({error: 'Please fill in all fields', emptyFields})
   }
//    if(!cts.valid(ticker)){
//        wrongTicker = true
//        return res.status(400).json({error: 'Ticker does not exist', emptyFields})
//    }

   // Add stock to the database
   try {
        const user_id = req.user._id
        const stock = await Stock.create({ticker, shares, cost, user_id})
       res.status(200).json(stock)
   } 
   catch(error){
       res.status(400).json({error: error.message})
   }

}

// sell a stock
const deleteStock = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Stock'})
    }
    // find the document that the _id property: id
    const stock = await Stock.findOneAndDelete({_id: id})

    // If stock document does not exist
    if(!stock){
        return res.status(404).json({error: 'No such Stock'})
    }
    res.status(200).json(stock)
    
}
// update a stock
const updateStock = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Stock'})
    }

    // re.body - is an object that contains proeprties 
    const stock = await Stock.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!stock){
        return res.status(400).json({error: 'No such stock'})
    }
    res.status(200).json(stock)
}

module.exports = {
    createStock,
    getStocks,
    getStock,
    deleteStock,
    updateStock
}