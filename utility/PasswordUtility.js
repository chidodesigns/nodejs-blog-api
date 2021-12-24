const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Request }  = require('express');

const GenerateSalt = async () => {

    return await bcrypt.genSalt()

}

const GeneratePassword = async (password, salt) => {

    return await bcrypt.hash(password, salt)

}

const ValidatePassword = async (enteredPassword, savedPassword) => {

    return await GeneratePassword(enteredPassword, salt) === savedPassword
}

const GenerateSignature = async (payload) => {
    return jwt.sign(payload, process.env.APP_SECRET,{ expiresIn: '90d'})
}

const ValidateSignature = async () => {

    const signature = Request.get('Authorization')

    if (signature){
        const payload = await jwt.verify(signature.split('')[1], process.env.APP_SECRET)
        Request.user = payload;
        return true
    }

    return false

}


module.exports = {
    GenerateSalt,
    GeneratePassword,
    ValidatePassword,
    GenerateSignature,
    ValidateSignature
}