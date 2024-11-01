const express = require('express');
const categoryController = require('../controller/categoryController');

const router = express.Router();

// GET: Get all categories
router.get('/get', categoryController.getAllCategories);

// POST: Add a new category
router.post('/add', categoryController.addCategory);

// GET: Get a category by category_id
router.get('/get/:_id', categoryController.getCategoryById);

// PUT: Update a category by category_id
router.put('/put/:_id', categoryController.updateCategory);

// DELETE: Delete a category by category_id
router.delete('/delete/:_id', categoryController.deleteCategory);

module.exports = router;
