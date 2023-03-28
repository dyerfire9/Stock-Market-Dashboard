const express = require('express')
// Create an instance of router
const router = express.Router()

const Stock = require('../models/stockModel')

// Reference controller to use the functions
const {createStock, getStocks, getStock, updateStock, deleteStock} = require('../controllers/stockController')


// GET: Get all stock documents (name, ticker, buy_price, amount)
router.get('/', getStocks)

// POST: Create a new stock document
router.post('/', createStock)

// GET: Get a single stock document
router.get('/:id', getStock)

// DELETE: Sell a single stock document
router.delete('/:id', deleteStock)

// UPDATE: Update a single stock document
router.delete('/:id', updateStock)

// Export Router
module.exports = router