const mongoose = require('mongoose')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
let cts = require('check-ticker-symbol');

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'})
}

// signup route
const signupUser = async (req, res) => {
    const {name, email, password} = req.body


    try{
        const user = await User.signup(name, email, password)
        // Create a token
        const token = createToken(user._id)

        res.status(200).json({user, email, token})

    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

// login route
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.login(email, password)

        // Create a token
        const token = createToken(user._id)

        res.status(200).json({user, email, token})

    }
    catch(error){
        res.status(400).json({error: error.message})
    }

}

const getSubStocks = async (req, res) => {
    const {id} = req.params

    res.json({msg: id})
}

const addSubStock = async (req, res) => {}

// get all stocks route 
const getStocks = async (req, res) => {
    const user_id = req.user._id

    // Find docs that are created/owned by the user
    const stocks = await Stock.find({user_id}).sort({createAt: -1})

    res.status(200).json(stocks)
}
// buy stock route 
const buyStock = async (req, res) => {
    res.json({msg: 'buy stock'})
}
// sell stock route
const sellStock = async (req, res) => {
    res.json({msg: 'sell stock'})
}
// Update stock route
const updateStock = async (req, res) => {
    res.json({msg: 'update stock'})
}
// add balance route  
const balance = async (req, res) => {
    try{
        const {amount, email} = req.body
        const user = await User.addFunds(amount, email)


        const balance = user.balance
        res.status(200).json({balance})

    }
    catch(error){
        res.status(400).json({error: error.message})
    }
  }
  
const subBalance = async (req, res) => {
    try{ 
    const {amount, email} = req.body
    const user = await User.subFunds(amount, email)
    const balance = user.balance
    res.status(200).json({balance})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
  }

module.exports = {
    signupUser,
    loginUser,
    getSubStocks,
    addSubStock,
    getStocks,
    buyStock,
    sellStock,
    updateStock,
    balance,
    subBalance
}