const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', async(req,res) => {

    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    }
    catch(err)
    {
        res.status(400).send(err)
    }
    
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
 } )


module.exports = router