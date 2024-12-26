const router = require('express').Router();
const userController = require('../controller/userController');

// Lấy danh sách tất cả người dùng (hỗ trợ phân trang)
router.get('/get', userController.getAllUsers);

// Lấy thông tin người dùng theo ID
router.get('/get/:_id', userController.getUserById);

// Tìm kiếm người dùng theo email hoặc số điện thoại
router.get('/search', userController.getUserByEmailorPhonenumber);

// Thêm người dùng mới
router.post('/add', userController.addUser);

// Cập nhật thông tin người dùng theo ID
router.put('/update/:_id', userController.updateUser);

// Xóa người dùng theo ID
router.delete('/delete/:_id', userController.deleteUser);

router.post('/loginUser', userController.loginUser);

module.exports = router;
