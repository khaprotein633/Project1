const express = require('express');
const inventoryController = require('../controller/inventoryController');
const router = express.Router();

router.get('/get', inventoryController.getAllInventory);
router.get('/get/:product_id', inventoryController.getInventoryByProductId);
router.post('/add', inventoryController.addInventory);
router.put('/update/:_id', inventoryController.updateInventory);
router.delete('/delete/:_id', inventoryController.deleteInventory);

module.exports = router;