const brandController = require('../controller/brandController');
const router = require('express').Router();
const upload = require('../config/upload'); // Import multer configuration

// Đường dẫn để lấy tất cả thương hiệu
// GET: Get all brands
router.get('/getAllBrands', brandController.getAllBrands);

router.get('/getbrandbyname/:brand_name', brandController.getBrandByName);

// POST: Add a new brand
router.post('/addBrand', upload.single('brand_logo_url'), brandController.addBrand);

// GET: Get a brand by brand_id
router.get('/:brand_id', brandController.getBrandById);

// PUT: Update a brand by brand_id
router.put('/updatebrand/:brand_id',upload.single('brand_logo_url') ,brandController.updateBrand);

// DELETE: Delete a brand by brand_id
router.delete('/deletebrand/:brand_id', brandController.deleteBrand);

module.exports = router;