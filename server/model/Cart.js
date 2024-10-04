const mongoose = require('mongoose');

// Định nghĩa schema cho ShoppingCart
const shoppingCartSchema = new mongoose.Schema({
  // ID duy nhất cho giỏ hàng
  cart_id: { 
    type: String, // Kiểu dữ liệu là String
    required: true, // Trường này là bắt buộc
    unique: true // Giá trị phải duy nhất
  },
  // ID của người dùng sở hữu giỏ hàng
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến ObjectId của User
    ref: 'User', // Tên model tham chiếu
    required: true // Trường này là bắt buộc
  },
  // ID của sản phẩm trong giỏ hàng
  product_id: { 
    type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến ObjectId của Product
    ref: 'Product', // Tên model tham chiếu
    required: true // Trường này là bắt buộc
  },
  // Kích thước của sản phẩm
  size: { 
    type: String, // Kiểu dữ liệu là String
    required: true // Trường này là bắt buộc
  },
  // Màu sắc của sản phẩm
  color: { 
    type: String, // Kiểu dữ liệu là String
    required: true // Trường này là bắt buộc
  },
  // Số lượng sản phẩm trong giỏ hàng
  quantity: { 
    type: Number, // Kiểu dữ liệu là Number
    required: true, // Trường này là bắt buộc
    min: 1 // Giá trị tối thiểu là 1
  },
  // Giá của sản phẩm tại thời điểm thêm vào giỏ hàng
  price: { 
    type: Number, // Kiểu dữ liệu là Number
    required: true // Trường này là bắt buộc
  }
});

// Xuất model ShoppingCart để sử dụng ở nơi khác trong ứng dụng
module.exports = mongoose.model('ShoppingCart', shoppingCartSchema);
