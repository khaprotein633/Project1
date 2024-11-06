const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();
const upload = require('../config/upload');

// Get all products
router.get('/get', productController.getAllProducts);

// Get a product by product_id
router.get('/get/:_id', productController.getProductById);

// Get products by brand_id
router.get('/get/:brand_id', productController.getProductsByBrandId);

router.get('/get/:product_name', productController.getProductsByName);

// Get products by category_id
router.get('/get/:category_id', productController.getProductsByCategoryId);

router.post('/add', upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'product_images', maxCount: 10 }]), productController.addProduct);

// Update a product by product_id
router.put('/update/:_id', upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'product_images', maxCount: 10 }]), productController.updateProduct);

// Delete a product by product_id
router.delete('/delete/:_id', productController.deleteProduct);

module.exports = router;
