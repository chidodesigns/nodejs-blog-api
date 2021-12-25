const router = require("express").Router()
const CategoryController = require("../controllers/CategoryController")
const categoryValidator = require("../middlewares/categoryValidator")

router.post("/", categoryValidator.ValidateCreateCategory, CategoryController.CreateCategory )

router.get("/" ,CategoryController.GetCategory )



module.exports = router