const express = require('express');
const inventoryController = require('../controller/inventoryController');
const router = express.Router();

router.get('/', inventoryController.getAllInventory);
router.get('/:product_id', inventoryController.getInventoryByProductId);
router.post('/', inventoryController.addInventory);
router.put('/:product_id', inventoryController.updateInventory);
router.delete('/:product_id', inventoryController.deleteInventory);

module.exports = router;