const express = require('express')

// Create an instance of router
const router = express.Router()


// GET: Get the wallet document
router.get('/', (req, res) => {
    res.json({mesg: 'get wallet'})
})

// PATCH: Update the wallet docuemnt
router.patch('/', (req, res) => {
    res.json({mesg: 'update wallet'})
})


module.exports = router