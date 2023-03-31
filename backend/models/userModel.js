const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
// Create schema
const Schema = mongoose.Schema

// Define Schemas
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
  }
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


userSchema.statics.addFunds = async function (amount, email) {
  const user = await this.findOne({email})
  if (!user) {
    throw new Error('User not found')
  }

  user.balance = parseInt(user.balance) + parseInt(amount)
  await user.save()

  return user
}

userSchema.statics.subFunds = async function (amount, email) {
  const user = await this.findOne({email})
  if (!user) {
    throw new Error('User not found')
  }
  if ((parseInt(user.balance) - parseInt(amount)) < 0) {
    throw new Error('Insuffient Funds')
  }
  
  user.balance = parseInt(user.balance) - parseInt(amount)
  await user.save()

  return user
}

// Create model
module.exports = mongoose.model('Users', userSchema)
