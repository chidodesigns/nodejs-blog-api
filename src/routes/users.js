const router = require("express").Router();


const UsersController = require("../controllers/UsersController")

//  GET User
router.get("/:id", UsersController.GetUserById)

//  Update User
router.put("/:id", UsersController.UpdateUserById)

//  Delete User
router.delete("/:id", UsersController.UserDeleteAccount)
module.exports = router;