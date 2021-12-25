const User = require('../models/User')
const PasswordUtilities = require("../utility/PasswordUtility")

const GetUserById = async (req, res) => {

    try {
        const user = await User.findById(req.params.id)

        if (user) {
            const {password, ...others} = user._doc
            res.status(200).json(others)
        }else{
            res.status(400).json("User Profile not found")
        }
        

    } catch (error) {
        console.error(error)
        res.status(500).json("There was an error trying to get your user profile")
    }

}

const UpdateUserById = async (req, res) => {

    if (req.body.userId === req.params.id) {

        if (req.body.password) {
            req.body.password = await PasswordUtilities.HashPassword(req.body.password)
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true})
            res.status(200).json(updatedUser)
        } catch (error) {
            console.error(error)
            res.status(500).json("There was an error trying to update your user profile")
        }

    }else{
        res.status(401).json("You can update only your account")
    }

}

module.exports = {
    GetUserById,
    UpdateUserById
}