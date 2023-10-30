import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addRemoveFriends, getUser, getUserFriends } from "../controllers/user.js";


const router = express.Router();

// Get user Info
router.get('/:id', verifyToken, getUser); 

// get friends list
router.get('/:id/friends', verifyToken, getUserFriends)

// add or remove friend from friends list
router.post('/:id/:friendId', verifyToken, addRemoveFriends)


export default router;