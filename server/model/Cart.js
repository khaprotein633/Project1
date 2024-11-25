const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product_id: { type: String, ref: 'Product', required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  product_image: { type: String },
  total_price: { type: Number, required: true }
}, { versionKey: false }); 

const shoppingCartSchema = new mongoose.Schema({
  user_id: { type: String, ref: 'User', required: true },
  items: [cartItemSchema], 
  added_date: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Cart', shoppingCartSchema);
