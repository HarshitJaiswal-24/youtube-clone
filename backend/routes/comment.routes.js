
import express from 'express';
import { addComment, editComment, deleteComment, getCommentsByVideoId } from '../controllers/comment.controller.js';
import authenticationUser from '../middlewares/authentication.js';
const commentRouter = express.Router();
// @route   POST /comments - Add a new comment
commentRouter.post("/",authenticationUser, addComment);
// @route   PUT /comments/:id - Edit a comment by ID
commentRouter.put("/:id", authenticationUser,editComment);
// @route   DELETE /comments/:id - Delete a comment by ID
commentRouter.delete("/:id", authenticationUser,deleteComment);
// @route   GET /comments/video/:videoId - Get all comments for a video
commentRouter.get("/video/:videoId", getCommentsByVideoId);

export default commentRouter;