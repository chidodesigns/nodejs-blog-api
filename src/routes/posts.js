const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const PostController = require("../controllers/PostController")
const postValidator = require("../middlewares/postValidator")

//  Get All Posts
router.get("/", PostController.GetAllPosts)

//  GET Post By Id
router.get("/:id", PostController.GetPostById)

//  Create Post
router.post("/", postValidator.ValidateCreatePost, PostController.CreatePost )

//  Update Post
router.put("/:id", postValidator.ValidateCreatePost, PostController.UpdatePost )

//  Delete Post
router.delete("/:id", PostController.DeletePost)



module.exports = router;