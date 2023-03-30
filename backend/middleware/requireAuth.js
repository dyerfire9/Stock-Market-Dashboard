const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    // Verify Auth
    const {authorization} = req.headers

    if (!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }
    // Get the user token
    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        // Select the user with id
        req.user = await User.findOne({_id}).select('_id')
        next()
    }
    catch(error) {
        console.log(error)
        res.status(401).json({error: 'Request not authorized'})
    }
}

module.exports = requireAuth