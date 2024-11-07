const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
  user_id: { type: String,ref: 'User', required: true },
  product_id: { type: String,ref: 'Product', required: true },  
  product_image: {type: String},
  size: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }
},{ versionKey: false });

module.exports = mongoose.model('Carts', shoppingCartSchema);
