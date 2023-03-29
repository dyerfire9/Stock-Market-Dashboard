// Import express
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config()

// Import our stocks.js router
const stockRoutes = require('./routes/stocks')
const walletRoutes = require('./routes/wallet')
const subStocksRoutes = require('./routes/subStocks')

// start express app
const app = express();

app.use(express.json()) 
app.use(cors());

// Log the request path and the type of request
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/stocks', stockRoutes)
app.use('/api/wallet', walletRoutes)
app.use('/api/subStocks', subStocksRoutes)

app.get('/', (req, res) => {
    res.json({msg: 'Welcome to the app'})
})

//connect to mongo
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
    console.log(`Connected to db & listening on port ${process.env.PORT}`)
})

})
.catch((error) => {
    console.log(error)
})



