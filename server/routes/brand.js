const brandController = require('../controller/brandController');
const router = require('express').Router();

// Đường dẫn để lấy tất cả thương hiệu
router.get('/', brandController.getAllBrands);

module.exports = router;