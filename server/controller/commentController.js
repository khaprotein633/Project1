const Comment = require('../model/Comment');

const commentController = {
 
    getAllComments: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const size = parseInt(req.query.size) || 5; 
            const skip = (page - 1) * size; 

            const list = await Comment.find({})
                .skip(skip)
                .limit(size); 
            const total = await Comment.countDocuments();
            res.status(200).json({list,total});
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

   
    getCommentsByProductId: async (req, res) => {
        try {
            const comments = await Comment.find({ product_id: req.params.product_id }); 
            if (!comments.length) {
                return res.status(404).json({ message: 'No comments found for this product' });
            }
            res.status(200).json(comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    addComment: async (req, res) => {
        try {
            const newComment = new Comment(req.body); 
            await newComment.save(); 
            res.status(201).json(newComment); 
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    updateComment: async (req, res) => {
        try {const comment = await Comment.findOneAndUpdate({_id: req.params._id }, req.body,{ new: true }  );
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.status(200).json(comment);
        } catch (error) {
            console.error('Error updating comment:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    deleteComment: async (req, res) => {
        try {
            const comment = await Comment.findOneAndDelete({ _id: req.params._id }); 
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.status(204).send(); 
        } catch (error) {
            console.error('Error deleting comment:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = commentController;
