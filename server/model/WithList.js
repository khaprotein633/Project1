const mongoose = require('mongoose');

// Định nghĩa schema cho WishList
const wishListSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  product_id: { type: Number, ref: 'Product', required: true }, 
  date_added: { type: Date, default: Date.now } 
},{ versionKey: false });


// Xuất model WishList
module.exports = mongoose.model('WishList', wishListSchema);