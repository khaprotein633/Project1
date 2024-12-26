const mongoose = require('mongoose');

const wishListItemSchema = new mongoose.Schema({
  productId: { type: String, ref: 'Product', required: true },
  inventoryId:  { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { versionKey: false }); 

const wishListSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  items: [wishListItemSchema]
}, { versionKey: false });

module.exports = mongoose.model('WishList', wishListSchema);
