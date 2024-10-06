const express = require('express');
const categoryController = require('../controller/categoryController');

const router = express.Router();

// GET: Get all categories
router.get('/getAllCategories', categoryController.getAllCategories);

// POST: Add a new category
router.post('/addCategory', categoryController.addCategory);

// GET: Get a category by category_id
router.get('/:category_id', categoryController.getCategoryById);

// PUT: Update a category by category_id
router.put('/:category_id', categoryController.updateCategory);

// DELETE: Delete a category by category_id
router.delete('/:category_id', categoryController.deleteCategory);

module.exports = router;
