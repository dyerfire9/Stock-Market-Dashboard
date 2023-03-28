const express = require('express')

// Create an instance of router
const router = express.Router()


// GET: Get all subscribed stocks
router.get('/', (req, res) => {
    res.json({mesg: 'Get all subbed stocks'})
})

// POST: Add a new stock to subscribe to
router.post('/', (req, res) => {
    res.json({mesg: 'add a new stock to subscribe to'})
})

// DELETE: Delete a stock from list
router.delete('/:stock_id', (req, res) => {
    res.json({mesg: 'delete a subscribed stock'})
})

module.exports = router