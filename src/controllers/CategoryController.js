const Category = require("../models/Category")

const CreateCategory = async (req, res) => {

    if (req.body){
        
        try {
            const newCat = new Category(req.body)
            const savedCategory = await newCat.save()
            res.status(200).json(savedCategory)
        } catch (error) {
            console.error(error)
            res.status(500).json("There was an error trying to create your Category")
        }
    }
    
    res.status(500).json("There was an interal server error because you tried to create a Category with empty input fields")

}

module.exports = {

    CreateCategory,

}