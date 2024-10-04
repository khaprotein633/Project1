const router = require('express').Router();
const productController = require('../controller/productController');

// Lấy danh sách sản phẩm
router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById);
// Thêm sản phẩm
router.post('/', productController.addProduct);
// Cập nhật sản phẩm
router.put('/:id', productController.updateProduct);
// Xóa sản phẩm
router.delete('/:id', productController.deleteProduct);

module.exports = router;
