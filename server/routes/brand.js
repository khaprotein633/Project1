const brandController = require('../controller/brandController');
const router = require('express').Router();

// Đường dẫn để lấy tất cả thương hiệu
// GET: Get all brands
router.get('/getAllBrands', brandController.getAllBrands);

// POST: Add a new brand
router.post('/addBrand', brandController.addBrand);

// GET: Get a brand by brand_id
router.get('/:brand_id', brandController.getBrandById);

// PUT: Update a brand by brand_id
router.put('/:brand_id', brandController.updateBrand);

// DELETE: Delete a brand by brand_id
router.delete('/:brand_id', brandController.deleteBrand);

module.exports = router;