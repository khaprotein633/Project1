const brandController = require('../controller/brandController');
const router = require('express').Router();
const upload = require('../config/upload'); // Import multer configuration

// Đường dẫn để lấy tất cả thương hiệu
// GET: Get all brands
router.get('/get', brandController.getAllBrands);
router.get('/getall', brandController.getAll);

router.get('/get/:brand_name', brandController.getBrandByName);


// POST: Add a new brand
router.post('/add', upload.single('brand_logo'), brandController.addBrand);

// GET: Get a brand by brand_id
router.get('/get/:_id', brandController.getBrandById);

// PUT: Update a brand by brand_ids
router.put('/update/:_id',upload.single('brand_logo') ,brandController.updateBrand);

// DELETE: Delete a brand by brand_id
router.delete('/delete/:_id', brandController.deleteBrand);

module.exports = router;