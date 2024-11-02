const mongoose = require('mongoose');

// Định nghĩa schema cho WishList
const wishListSchema = new mongoose.Schema({
  wishlist_id: { type: String, required: true, unique: true }, // ID danh sách yêu thích, duy nhất
  user_id: { type: Number, ref: 'User', required: true }, // Khóa ngoại tham chiếu đến User
  product_id: { type: Number, ref: 'Product', required: true }, // Khóa ngoại tham chiếu đến Product
  date_added: { type: Date, default: Date.now } // Ngày thêm sản phẩm vào danh sách yêu thích
});

// Xuất model WishList
module.exports = mongoose.model('WishList', wishListSchema);