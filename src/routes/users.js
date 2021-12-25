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
// router.delete("/:id", async(req, res) => {
//     if (req.body.userId === req.params.id) {
//         const user = await User.findById(req.params.id)
//         if (user) {

//             try {
//                 await Post.deleteMany({ username: user.username })
//                 await User.findByIdAndDelete(req.params.id)
//                 res.status(200).json("User has been deleted...")
//             } catch (error) {
//                 res.status(500).json(error);
//             }


//         } else {
//             res.status(404).json("User not found")
//         }



//     } else {
//         res.status(401).json("You can delete only your account")
//     }
// });

router.delete("/:id", UsersController.UserDeleteAccount)
module.exports = router;