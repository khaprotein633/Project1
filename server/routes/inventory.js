const express = require('express');
const inventoryController = require('../controller/inventoryController');
const router = express.Router();
const upload = require('../config/upload');

router.get('/get', inventoryController.getAllInventory);
router.get('/getbyid/:_id', inventoryController.getInventoryById);
router.get('/getbyproduct_id/:product_id', inventoryController.getInventoryByProductId);
router.post('/add',upload.single('image_url') ,inventoryController.addInventory);
router.put('/update/:_id',upload.single('image_url') ,inventoryController.updateInventory);
router.delete('/delete/:_id', inventoryController.deleteInventory);

module.exports = router;