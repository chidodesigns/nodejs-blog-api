const Category = require("../models/Category")

const CreateCategory = async (req, res) => {

    if (req.body){
        
        try {
            const newCat = new Category(req.body)
            const savedCategory = await newCat.save()
            return res.status(200).json(savedCategory)
        } catch (error) {
            console.error(error)
            return res.status(500).json("There was an error trying to create your Category")
        }
    }
    
    return res.status(500).json("There was an interal server error because you tried to create a Category with empty input fields")

}

const GetCategory = async (req, res) => {

    try {
        const cats = await Category.find()
        return res.status(200).json(cats)
    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }

}
module.exports = {

    CreateCategory,
    GetCategory

}