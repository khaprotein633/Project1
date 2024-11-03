const router = require('express').Router();
const imageController = require('../controller/PIController');
const upload = require('../config/upload');


router.get('/get', imageController.getAllImages);


router.get('/get/:product_id', imageController.getImagesByProductId);


router.post('/add',upload.single('image_url'), imageController.addImage);


router.put('/update/:_id', imageController.updateImage);


router.delete('/delete/:_id', imageController.deleteImage);

module.exports = router;
