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
        return res.status(200).json(posts)
    } catch (error) {
        console.error(error)
        return res.status(500).json("There was an error loading all the posts")
    }

}
const GetPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post){
            return res.status(200).json(post)
        }else{
            return res.status(404).json("We could not find the post you was looking for")
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json("Internal server error whilst trying to load/access Post by ID")
    }
}

const CreatePost =  async (req, res) => {

    if(req.body){
        try {
            const newPost = await new Post(req.body)
            const savedPost = await newPost.save()
            return res.status(200).json(savedPost)
        } catch (error) {
            console.error(error)
            return res.status(500).json("There was an  error trying to create your post")
        }
    }

    return res.status(500).json("Internal Server Error: Please fill in all fields")

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
                    return res.status(200).json(updatedPost)
                } catch (error) {
                    console.error(error)
                    return res.status(500).json("There was an error trying to find and update the Post you was on!")
                }
            }
        } catch (error) {
            console.error(error)
            return res.status(404).json("There was an error trying to retrieve your post to update it!")
        }
    }
    return res.status(500).json("There was an interal server error because you tried to update a post without an ID")
}

const DeletePost = async (req, res) => {
    if((req.params.id)){

        try {
            const post = await Post.findById(req.params.id)
            if (post.username === req.body.username) {
                try {
                    await post.delete()
                    return res.status(200).json("Post has been deleted ...")
                } catch (error) {
                    console.error(error)
                    return res.status(500).json("There was an error trying to delete your post!")                }
            }else{
                return res.status(401).json("You can delete only post!")
            }
        } catch (error) {
            console.error(error)
            return res.status(404).json("There was an error: We could not find your post to be deleted")
        }

    }
    return res.status(500).json("There was an interal server error because you tried to update a post without an ID")
   
}

module.exports = {

    GetAllPosts,
    GetPostById,
    CreatePost,
    UpdatePost,
    DeletePost
}