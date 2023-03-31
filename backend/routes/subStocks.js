const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// Create an instance of router
const router = express.Router()

// Authenticate the user first in order to see stocks
router.use(requireAuth)

// Import all controllers
const {getSubStocks, addSubStock, delSubStock} = require('../controllers/subStockController')

// GET: Get all subscribed stocks
router.get('/', getSubStocks)

// POST: Add a new stock to subscribe to
router.post('/', addSubStock)

// DELETE: Delete a stock from list
router.delete('/:id', delSubStock)

module.exports = router