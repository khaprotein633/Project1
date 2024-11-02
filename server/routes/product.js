const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();

// Get all products
router.get('/get', productController.getAllProducts);

// Get a product by product_id
router.get('/get/:product_id', productController.getProductById);

// Get products by brand_id
router.get('/brand/:brand_id', productController.getProductsByBrandId);

// Get products by category_id
router.get('/category/:category_id', productController.getProductsByCategoryId);

// Add a new product
router.post('/addproduct', productController.addProduct);

// Update a product by product_id
router.put('/update/:product_id', productController.updateProduct);

// Delete a product by product_id
router.delete('/delete/:product_id', productController.deleteProduct);

module.exports = router;
