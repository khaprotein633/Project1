const mongoose = require('mongoose');

// Định nghĩa schema cho OrderDetails
const orderDetailsSchema = new mongoose.Schema({
  order_details_id: { type: String, required: true, unique: true }, // ID duy nhất cho chi tiết đơn hàng
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Khóa ngoại tham chiếu đến Order
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Khóa ngoại tham chiếu đến Product
  size: String, // Kích thước sản phẩm
  color: String, // Màu sắc sản phẩm
  price_order: { type: Number, required: true }, // Giá của sản phẩm trong đơn hàng
  quantity: { type: Number, required: true } // Số lượng sản phẩm trong đơn hàng    
});

// Xuất model OrderDetails
module.exports = mongoose.model('OrderDetails', orderDetailsSchema);