const express = require('express')
// Create an instance of router
const router = express.Router()


// GET: Get all stock documents (name, ticker, buy_price, amount)
router.get('/', (req, res) => {
    res.json({mesg: 'Get all stocks'})
})

// GET: Get a single stock document
router.get('/:stock_id', (req, res) => {
    res.json({mesg: 'Get all stocks'})
})

// POST: Create a new stock document
router.post('/', (req, res) => {
    res.json({mesg: 'add a new stock'})
})

// DELETE: Sell a single stock
router.delete('/:stock_id', (req, res) => {
    res.json({mesg: 'delete a stock'})
})

// Export Router
module.exports = router