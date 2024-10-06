const Comment = require('../model/Comment');

const commentController = {
    // Get all comments
    getAllComments: async (req, res) => {
        try {
            const comments = await Comment.find(); // Get all comments
            res.status(200).json(comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get comments by product_id
    getCommentsByProductId: async (req, res) => {
        try {
            const comments = await Comment.find({ product_id: req.params.product_id }); // Find comments by product_id
            if (!comments.length) {
                return res.status(404).json({ message: 'No comments found for this product' });
            }
            res.status(200).json(comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Add a new comment
    addComment: async (req, res) => {
        try {
            const newComment = new Comment(req.body); // Create a new comment instance
            await newComment.save(); // Save the comment to the database
            res.status(201).json(newComment); // Return the created comment
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Update a comment by product_review_id
    updateComment: async (req, res) => {
        try {
            const comment = await Comment.findOneAndUpdate(
                { product_review_id: req.params.product_review_id },
                req.body,
                { new: true } // Return the updated comment
            );
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.status(200).json(comment);
        } catch (error) {
            console.error('Error updating comment:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Delete a comment by product_review_id
    deleteComment: async (req, res) => {
        try {
            const comment = await Comment.findOneAndDelete({ product_review_id: req.params.product_review_id }); // Find and delete the comment
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.status(204).send(); // No content
        } catch (error) {
            console.error('Error deleting comment:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = commentController;
