const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {

try
{
    const token = req.header('Authorzation').replace('Bearer', '')
    const decoded = jwt.verify(token,'thisismysecret')
    const user = await User.findOne({_id:decoded._id, 'tokens.token':token})

    if(!user)
    {
        throw new Error
    }

    return user

}
catch(err)
{
    res.status(401).send({error: 'please authenticate'}) 
}

}
module.exports = auth