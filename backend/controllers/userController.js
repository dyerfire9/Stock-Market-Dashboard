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
        const u_name = user.name
        const u_balance = user.balance
        // Create a token
        const token = createToken(user._id)

        res.status(200).json({u_name, u_balance, email, token})

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
        const u_name = user.name
        const u_balance = user.balance

        res.status(200).json({u_name, u_balance, email, token})

    }
    catch(error){
        res.status(400).json({error: error.message})
    }

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
    res.json({msg: 'add balance'})
}

module.exports = {
    signupUser,
    loginUser,
    buyStock,
    sellStock,
    updateStock,
    balance
}