const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');

// Route để lấy tất cả các nhận xét
router.get('/', commentController.getAllComments);

// Route để lấy các nhận xét theo product_id
router.get('/product/:product_id', commentController.getCommentsByProductId);

// Route để thêm mới một nhận xét
router.post('/', commentController.addComment);

// Route để cập nhật một nhận xét theo product_review_id
router.put('/:product_review_id', commentController.updateComment);

// Route để xóa một nhận xét theo product_review_id
router.delete('/:product_review_id', commentController.deleteComment);

module.exports = router;
