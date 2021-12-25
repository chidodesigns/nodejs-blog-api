const router = require('express').Router()

//  Controllers
const AuthController = require('../controllers/AuthController')
//  Middlewares
const userValidator = require('../middlewares/userValidator')

//  Register User 
router.post('/register', userValidator.ValidateUserRegister, AuthController.UserRegister )

//  Login User
router.post('/login', userValidator.ValidateUserLogin, AuthController.UserLogin )

module.exports = router