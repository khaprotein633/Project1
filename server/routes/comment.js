const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');

// Route để lấy tất cả các nhận xét
router.get('/get', commentController.getAllComments);

// Route để lấy các nhận xét theo product_id
router.get('/get/:_id', commentController.getCommentsByProductId);

// Route để thêm mới một nhận xét
router.post('/add', commentController.addComment);

// Route để cập nhật một nhận xét theo product_review_id
router.put('/update/:_id', commentController.updateComment);

// Route để xóa một nhận xét theo product_review_id
router.delete('/delete/:_id', commentController.deleteComment);

module.exports = router;
