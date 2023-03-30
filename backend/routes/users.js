const express = require('express')
// Create an instance of router
const router = express.Router()

// get controller functions 
const {signupUser, loginUser, buyStock, sellStock, updateStock, balance} = require('../controllers/userController')
// Get User Model
const Users = require('../models/userModel')

// signup route
router.post('/signup', signupUser)

// login route
router.post('/login', loginUser)
// buy stock route 
router.post('/buyStock', buyStock)

// sell stock route
router.post('/sellStock', sellStock)

// Update stock route
router.post('/updateStock', updateStock)

// add balance route 
router.post('/balance', balance)


module.exports = router