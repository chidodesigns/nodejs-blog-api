const User = require('../models/User')
const PasswordUtilities = require("../utility/PasswordUtility")

const UserRegister = async (req, res) => {
    try {

        const userPassword = await PasswordUtilities.HashPassword(req.body.password)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: userPassword
        })
    
        const user = await newUser.save()
        return res.status(200).json(user)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json("There was an error trying to Register a new user account")
    }
  
}

const UserLogin = async (req, res) => {

    try {
        const user = await User.findOne({username: req.body.username})

        !user && res.status(400).json("Wrong Credentials")

        const validatedPassword = await PasswordUtilities.ComparePassword(user, req.body.password)

        !validatedPassword && res.status(400).json("Wrong Credentials")

        const signature = await PasswordUtilities.GenerateSignature({
            _id: user._id,
            email: user.email,
            username: user.username
        })
        
        const { password, ...others } = user._doc

        return res.status(200).json({others, signature})

    } catch (error) {
        return res.status(500).json("There was an error trying to Login")
    }

}

module.exports = {

    UserRegister,
    UserLogin

}