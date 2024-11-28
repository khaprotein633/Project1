const express = require('express');
const productController = require('../controller/productController');
const router = express.Router();
const upload = require('../config/upload');

// Get all products with pagination
router.get('/get', productController.getAllProducts);

// Get a product by product_id
router.get('/get/:product_id', productController.getProductById);

// Get products by brand_id
router.get('/brand/get/:brand_id', productController.getProductsByBrandId);

// Get products by category_id
router.get('/category/get/:category_id', productController.getProductsByCategoryId);

// Get products by product_name (can be searched by name)
router.get('/name/get/:product_name', productController.getProductsByName);

// Add a new product
router.post('/add', upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'product_images', maxCount: 10 }]), productController.addProduct);

// Update a product by product_id
router.put('/update/:product_id', upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'product_images', maxCount: 10 }]), productController.updateProduct);

// Delete a product by product_id
router.delete('/delete/:product_id', productController.deleteProduct);

// Get inventory for a specific product with pagination
router.get('/:product_id/inventory/get', productController.getInventoryByProductId);
router.get('/:product_id/inventory/get/:inventory_id', productController.getInventoryById);

// Add new inventory for a product
router.post('/:product_id/inventory/add', upload.single('image_url'), productController.addInventory);

// Update an inventory item by inventory_id
router.put('/:product_id/inventory/update/:inventory_id', upload.single('image_url'), productController.updateInventory);

// Delete an inventory item by inventory_id
router.delete('/:product_id/inventory/delete/:inventory_id', productController.deleteInventory);

module.exports = router;