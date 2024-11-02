const express = require('express');
const cartController = require('../controller/cartController');
const router = express.Router();

router.get('/get/:user_id', cartController.getAllCarts);
router.get('/get/:user_id',cartController.getCartByUserId);
router.post('/addcart', cartController.addCartItem);
router.put('/update/:cart_id', cartController.updateCartItem);
router.delete('/delete/:cart_id', cartController.deleteCartItem);

module.exports = router;