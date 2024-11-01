const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();

// Get all products
router.get('/get', productController.getAllProducts);

// Get a product by product_id
router.get('/get/:_id', productController.getProductById);

// Get products by brand_id
router.get('/brand/:brand_id', productController.getProductsByBrandId);

// Get products by category_id
router.get('/get/:category_id', productController.getProductsByCategoryId);

// Add a new product
router.post('/add', productController.addProduct);

// Update a product by product_id
router.put('/update/:_id', productController.updateProduct);

// Delete a product by product_id
router.delete('/delete/:_id', productController.deleteProduct);

module.exports = router;
