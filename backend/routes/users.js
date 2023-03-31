const express = require('express')
// Create an instance of router
const router = express.Router()

// get controller functions 
const {signupUser, loginUser, balance} = require('../controllers/userController')
// Get User Model
const Users = require('../models/userModel')

// signup route
router.post('/signup', signupUser)

// login route
router.post('/login', loginUser)

//get all stocks
router.get('/', getStocks)

//get all subbed stocks stocks
router.get('/subStocks', getSubStocks)

// add sub stock route 
router.post('/subStocks', addSubStock) 


// buy stock route 
router.post('/', buyStock) 

// sell stock route
router.post('/stock/:id', sellStock)

// Update stock route
router.post('/stock/:id', updateStock)

// add balance route 
router.post('/balance', balance)


module.exports = router