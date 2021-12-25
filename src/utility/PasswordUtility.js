const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Request }  = require('express');

const HashPassword = async (password, saltRounds = 10) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash password
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error);
    }

    // Return null if error
    return null;
};

const ComparePassword = async (userObj, requestedPassword) => {

    const validatedPassword = await bcrypt.compare(requestedPassword, userObj.password)

    if(validatedPassword){
        return true
    }else{
        return false
    }

}

const GenerateSignature = async (payload) => {
    return await jwt.sign(payload, process.env.APP_SECRET,{ expiresIn: '90d'})
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
    HashPassword,
    ComparePassword,
    GenerateSignature,
    ValidateSignature
}