const express = require('express');
const discountController = require('../controller/discountController');
const router = express.Router();


router.get('/get', discountController.getAllDiscounts);
router.post('/add',discountController.createDiscount);
router.put('/update/:_id',discountController.updateDiscount);
router.delete('/delete/:_id', discountController.deleteDiscount);

module.exports = router;