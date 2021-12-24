const User = require('../models/User')
const PasswordUtilities = require("../utility/PasswordUtility")

const UserRegister = async (req, res) => {
    try {

        const userPassword = await PasswordUtilities.hashPassword(req.body.password)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: userPassword
        })
    
        const user = await newUser.save()
        res.status(200).json(user)
        
    } catch (error) {
        console.log(error);
        res.status(500).json("There was an error trying to Register a new user account")
    }
  
}

module.exports = {

    UserRegister,

}