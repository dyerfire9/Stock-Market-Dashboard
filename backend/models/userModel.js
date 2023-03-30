const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
// Create schema
const Schema = mongoose.Schema

// Define Schemas
// Schema for Transactions
const transactionsSchema = new Schema({
    transaction_type: {
      type: String, // BUY or SELL
      required: true
    },
    symbol: {
      type: String,
      required: true
    },
    stock_price: { 
        type: Number,
        required: true
    },
    stock_quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
  }, {timestamps: true});
  
  // Schema for Owned Stocks
  const OwnedStockSchema = new Schema({
    ticker: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    cost: {
      type: Number,
      required: true
    }
  });

  // Schema for Users
  const userSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    balance: {
        type: Number,
        default: 10000.00
    },
    ownedStocks: [ OwnedStockSchema ],
    transactionData: [transactionsSchema]
  });
  
// Static Signup Method
userSchema.statics.signup = async function (name, email, password){

  // Validate name, email & password
  if (!name || !email || !password){
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)){
    throw Error('Email is not a valid')
  }
  if (!validator.isStrongPassword(password)){
    throw Error('Password not strong enough')
  }
  const exists = await this.findOne({email})
  if (exists) {
    throw Error('Email already in use')
  }

  // Encrypt Password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({name, email, password: hash})

  return user
}

userSchema.statics.login = async function (email, password){
  // Validate email & password
  if (!email || !password){
    throw Error('All fields must be filled')
  }
  const user = await this.findOne({email})
  if (!user) {
    throw Error('User not found')
  }

  // Check if passwords match
  const match = await bcrypt.compare(password, user.password)
  if(!match){
    throw Error('Incorrect Password')
  }

  return user
}


// Create model
module.exports = mongoose.model('Users', userSchema)