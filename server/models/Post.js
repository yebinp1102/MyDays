import mongoose from "mongoose";

const PostSchema =  new mongoose.Schema({
  userId: {type: String, required: true},
  name: {type: String, required: true},
  location: {type: String, default: ""},
  description: {type: String, default: ""},
  picturePath: {type: String, default: ""},
  userPicturePath: {type: String, default: ""},
  likes: {
    type: Map,
    of: Boolean,
  },
  comments: {
    type: Array,
    default: []
  }
},{timestamps: true})

const Post = mongoose.model("Post", PostSchema);

export default Post