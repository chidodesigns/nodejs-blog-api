const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt")

const UsersController = require("../controllers/UsersController")

//  GET User
router.get("/:id", UsersController.GetUserById)

//  Update User
router.put("/:id", UsersController.UpdateUserById)

//  Delete User
router.delete("/:id", UsersController.UserDeleteAccount)
module.exports = router;