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
    balance,
    subBalance
}