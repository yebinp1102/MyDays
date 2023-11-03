import express from 'express';
import {getFeedPosts, getUserPosts, likePost} from '../controllers/post.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Grab posts when user is on home page
router.get('/', verifyToken, getFeedPosts);

// Grab only specific person's posts
router.get("/:userId/posts", verifyToken, getUserPosts);

// liking or unliking the post
router.post("/:id/like", verifyToken, likePost);


export default router;