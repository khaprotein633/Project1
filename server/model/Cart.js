const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            productId: { type: String,  },
            inventoryId:{ type: String,  },
            quantity: { type: Number,  min: 1 }
        }
    ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
