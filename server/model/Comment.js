const mongoose = require('mongoose');

// Định nghĩa schema cho ProductReview
const commentSchema = new mongoose.Schema({
  
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
 
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true },
  
  rating:{ type: Number, required: true, min: 1, max: 5 },
  
  comment: { type: String,  required: true },
  
  review_date: { type: Date, default: Date.now }
  
},{ versionKey: false });

// Xuất model ProductReview để sử dụng ở nơi khác trong ứng dụng
module.exports = mongoose.model('Comment', commentSchema);