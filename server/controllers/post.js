import Post from "../models/Post.js";
import User from "../models/User.js";


// Create post
export const createPost = async (req, res) => {
  try{
    const {userId, description, picturePath} = req.body;
    const user = await User.findById(userId);
    const newPost = await Post.create({
      userId,
      name: user.name,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: []
    })

    res.status(201).json(newPost);

  }catch(err){
    res.status(400).json({error: err.message, message: "Post creation failure"})
  }
}


// Grab posts when user is on home page
export const getFeedPosts = async(req, res) => {
  try{
    const post = await Post.find();
    res.status(200).json(post);
  }catch(err){
    res.status(400).json({error: err.message, message: "Calling post failure"})
  }
}

// Grab only specific person's posts
export const getUserPosts = async(req, res) => {
  try{
    const {userId} = req.params;
    const post = await Post.findById({userId});
    res.status(200).json(post);
  }catch(err){
    res.status(400).json({error: err.message, message: "Grabing user's posts failure"})
  }
}


// liking or unliking the post
export const likePost = async(req, res) => {
  try{
    const {id} = req.params;   // postId
    const {userId} = req.body;
    const post = await Post.findById(id);

    // isLiked is boolean value, if userId exist in likes array than it's true. Otherwise, it's false.
    const isLiked = post.likes.get(userId); 


    // if user already liked the post, then unlike the post
    if(isLiked){
      post.likes.delete(userId);
    }else{ // if user did not liked the post before, then like the post
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(id, {likes: post.likes}, {new: true})
    const posts = await Post.find();
    res.status(200).json(posts)
  }catch(err){
    res.status(400).json({error: err.message, message: "Like failure"})

  }
}