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
router.put("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id, {
                        $set: req.body,
                    }, { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            res.status(401).json("You can update only your post!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//  Delete Post
router.delete("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted...");
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json("You can delete only your post!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;