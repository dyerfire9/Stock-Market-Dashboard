// Import express
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config()

// Import the routers
const stockRoutes = require('./routes/stocks')
const UserRoutes = require('./routes/users')
const SubStocksRoutes = require('./routes/subStocks')

// start express app
const app = express();

// Middleware
// Fetches request with json
app.use(express.json()) 

// To prevent cors erros
app.use(cors());

// Log the request path and the type of request
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/stocks', stockRoutes)
app.use('/api/user', UserRoutes)
app.use('/api/subStocks', SubStocksRoutes)

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



