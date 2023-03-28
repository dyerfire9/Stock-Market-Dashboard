// Import express
const express = require('express');

require('dotenv').config()

// Import out workout.js router
const stockRoutes = require('./routes/stocks')
const walletRoutes = require('./routes/wallet')
const subStocksRoutes = require('./routes/subStocks')

// start express app
const app = express();

app.use(express.json())

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



app.listen(process.env.PORT, () => {
    console.log(`Connected to db & listening on port ${process.env.PORT}`)
})