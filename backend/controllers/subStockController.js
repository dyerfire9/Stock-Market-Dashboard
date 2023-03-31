const subStock = require('../models/subStockModel')
const mongoose = require('mongoose')
let cts = require('check-ticker-symbol');

// Get all sub stocks
const getSubStocks = async (req, res) => {
    const user_id = req.user._id

    // Find docs that are created/owned by the user
    const subStocks = await subStock.find({user_id}).sort({createdAt: -1})

    res.status(200).json(subStocks)

}

// POST: Add a new stock to subscribe to
const addSubStock = async (req, res) => {
    const { ticker } = req.body
    let emptyFields = []
    // If ticker field is empty
    if (!ticker) {
      emptyFields.push('ticker')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
    if (!cts.valid(ticker)) {
      return res.status(400).json({ error: 'Please enter a valid ticker' })
    }
    try {
      const user_id = req.user._id
      const substock = await subStock.create({ ticker, user_id })
      res.status(200).json(substock)
    } catch {
      res.status(400).json({ error: error.message })
    }
  }


// DELETE: Delete a stock from list
const delSubStock = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Subscribed Stock id'})
    }
    // find the document that the _id property: id
    const subStocks = await subStock.findOneAndDelete({_id: id})

    // If stock document does not exist
    if(!subStocks){
        return res.status(404).json({error: 'No such subscribed Stock'})
    }
    res.status(200).json(subStocks)
    
}


module.exports = {
    getSubStocks,
    addSubStock,
    delSubStock
}