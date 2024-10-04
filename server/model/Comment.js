const mongoose = require('mongoose');

// Định nghĩa schema cho ProductReview
const commentSchema = new mongoose.Schema({
  // ID duy nhất cho đánh giá sản phẩm
  product_review_id: { 
    type: String, // Kiểu dữ liệu là String
    required: true, // Trường này là bắt buộc
    unique: true // Giá trị phải duy nhất
  },
  // ID của sản phẩm mà đánh giá này thuộc về
  product_id: { 
    type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến ObjectId của Product
    ref: 'Product', // Tên model tham chiếu
    required: true // Trường này là bắt buộc
  },
  // ID của người dùng đã viết đánh giá
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến ObjectId của User
    ref: 'User', // Tên model tham chiếu
    required: true // Trường này là bắt buộc
  },
  // Đánh giá của người dùng (thang điểm từ 1 đến 5)
  rating: { 
    type: Number, // Kiểu dữ liệu là Number
    required: true, // Trường này là bắt buộc
    min: 1, // Giá trị tối thiểu
    max: 5 // Giá trị tối đa
  },
  // Nhận xét của người dùng về sản phẩm
  comment: { 
    type: String, // Kiểu dữ liệu là String
    required: true // Trường này là bắt buộc
  },
  // Ngày đánh giá được viết
  review_date: { 
    type: Date, // Kiểu dữ liệu là Date
    default: Date.now // Mặc định là ngày hiện tại
  }
});

// Xuất model ProductReview để sử dụng ở nơi khác trong ứng dụng
module.exports = mongoose.model('Comment', commentSchema);