const mongoose = require('mongoose');
const { uuidv4 } = require('uuid'); // If using UUIDs

// Định nghĩa schema cho ShoppingCart
const shoppingCartSchema = new mongoose.Schema({
  user_id: {
    type: String,
    ref: 'User',
    required: true
  },

  product_id: {
    type: String,
    ref: 'Product',
    required: true
  },

  size: {
    type: String,
    required: true
  },

  color: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    required: true,
    min: 1
  },

  price: {
    type: Number,
    required: true
  }
},{ versionKey: false });

module.exports = mongoose.model('Carts', shoppingCartSchema);
