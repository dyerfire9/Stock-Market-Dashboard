const express = require('express')

// Create an instance of router
const router = express.Router()

// get controller functions 
const {signupUser, loginUser, balance, subBalance} = require('../controllers/userController')

// signup route
router.post('/signup', signupUser)

// login route
router.post('/login', loginUser)

// add balance route 
router.post('/balance', balance)

// subtract balance route 
router.post('/subBalance', subBalance)


module.exports = router