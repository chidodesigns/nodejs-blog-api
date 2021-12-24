const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

//  Controllers
const AuthController = require('../controllers/AuthController')
//  Middlewares
const userValidator = require('../middlewares/userValidator')

//  Register User 
router.post('/register', userValidator.ValidateUserRegister, AuthController.UserRegister )

//  Login User

router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        !user && res.status(400).json("Wrong Credentials")

        const validated = await bcrypt.compare(req.body.password, user.password)

        !validated && res.status(400).json("Wrong Credentials")

        const { password, ...others } = user._doc

        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router