const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, ref: 'Product', required: true },
  inventoryId:  { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { versionKey: false }); 

const shoppingCartSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  items: [cartItemSchema]
}, { versionKey: false });

module.exports = mongoose.model('Cart', shoppingCartSchema);
