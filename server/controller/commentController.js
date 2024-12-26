const Comment = require('../model/Comment');

// Danh sách từ khóa xấu để kiểm duyệt bình luận
const bannedWords = ['CC', 'VL', 'DUMA','dm']; 

const commentController = {

    getAllComments: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const size = parseInt(req.query.size) || 7;
            const skip = (page - 1) * size;

            const list = await Comment.find({})
                .skip(skip)
                .limit(size);
            const total = await Comment.countDocuments();
            res.status(200).json({ list, total });
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getCommentsByProductId: async (req, res) => {
        try {
            const { rating, product_id } = req.params;
            const page = parseInt(req.query.page) || 1;
            const size = parseInt(req.query.size) || 7;
            const skip = (page - 1) * size;
    
            const filter = {};
    
            // Lọc theo rating nếu có
            if (rating) {
                filter.rating = parseInt(rating);
            }
    
            // Lọc theo product_id nếu có
            if (product_id) {
                filter.product_id = product_id;
            }
    
            const list = await Comment.find({product_id:product_id})
                .skip(skip)
                .limit(size)
                .populate('user_id', 'name'); // Đây là phần quan trọng để lấy tên người dùng từ model User
    
            const total = await Comment.countDocuments({product_id:product_id});
    
            res.status(200).json({ list, total });
        } catch (error) {
            console.error('Error fetching filtered comments by rating and product_id:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    addComment: async (req, res) => {
        try {
            const { comment, rating, product_id, user_id } = req.body;
    
            if (typeof comment !== 'string') {
                return res.status(400).json({ message: 'Comment must be a string' });
            }
    
            const hasBannedWords = bannedWords.some(word => comment.toLowerCase().includes(word.toLowerCase()));
            if (hasBannedWords) {
                return res.status(400).json({ message: 'Comment contains inappropriate language.' });
            }
    
            // const orders = await Order.find({
            //     user_id: user_id,
            //     order_status: 'Đã giao'  
            // });
    
            // let hasPurchased = false;
    
            // for (let order of orders) {
            //     const productInOrder = order.order_details.some(orderDetail => orderDetail.product_id.toString() === product_id);
            //     if (productInOrder) {
            //         hasPurchased = true;
            //         break;
            //     }
            // }
    
            // if (!hasPurchased) {
            //     return res.status(400).json({ message: 'You must purchase the product before leaving a review.' });
            // }
    
            const newComment = new Comment({
                product_id,
                user_id,
                rating,
                comment,
                review_date: new Date()
            });
    
            await newComment.save();
            res.status(201).json(newComment);
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    
    updateComment: async (req, res) => {
        try {
            const comment = await Comment.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
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
