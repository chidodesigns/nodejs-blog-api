const User = require("../models/User");
const Post = require("../models/Post");

const GetAllPosts = async (req, res) => {

    //  Querying A Post via (Category or Username)
    const username = req.query.user
    const categoryName = req.query.cat

    try {
        let posts 
        if (username){
            posts = await Post.find({username})
        } else if(categoryName){
            posts = await Post.find({categories:{
                $in:[categoryName]
            }})
        }else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        console.error(error)
        res.status(500).json("There was an error loading all the posts")
    }

}
const GetPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post){
            res.status(200).json(post)
        }else{
            res.status(404).json("We could not find the post you was looking for")
        }
    } catch (error) {
        console.error(error)
        res.status(500).json("Internal server error whilst trying to load/access Post by ID")
    }
}

const CreatePost =  async (req, res) => {

    if(req.body){
        try {
            const newPost = await new Post(req.body)
            const savedPost = await newPost.save()
            res.status(200).json(savedPost)
        } catch (error) {
            console.error(error)
            res.status(500).json("There was an  error trying to create your post")
        }
    }

    res.status(500).json("Internal Server Error: Please fill in all fields")

}

const UpdatePost = async (req, res) => {
    if (req.params.id) {
        try {
            const post = await Post.findById(req.params.id)
            if(post.username === req.body.username){
                try {
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                        $set: req.body,
                    }, { new: true})
                    res.status(200).json(updatedPost)
                } catch (error) {
                    console.error(error)
                    res.status(500).json("There was an error trying to find and update the Post you was on!")
                }
            }
        } catch (error) {
            console.error(error)
            res.status(404).json("There was an error trying to retrieve your post to update it!")
        }
    }
    res.status(500).json("There was an interal server error because you tried to update a post without an ID")
}

module.exports = {

    GetAllPosts,
    GetPostById,
    CreatePost,
    UpdatePost
}