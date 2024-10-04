const mongoose = require('mongoose');

// Định nghĩa schema cho Order
const orderSchema = new mongoose.Schema({
  orders_id: { type: String, required: true, unique: true }, // ID duy nhất cho đơn hàng
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Khóa ngoại tham chiếu đến User
  total_amount: { type: Number, required: true }, // Tổng số tiền của đơn hàng
  orders_date: { type: Date, default: Date.now }, // Ngày đặt hàng
  delivery_date: Date, // Ngày giao hàng
  shipping_address: { type: String, required: true }, // Địa chỉ giao hàng
  user_phone: { type: String, required: true }, // Số điện thoại người dùng
  order_status_id: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderStatus', required: true }, // Khóa ngoại tham chiếu đến OrderStatus
  payment_status: { type: String, required: true } // Trạng thái thanh toán
});

// Xuất model Order
module.exports = mongoose.model('Order', orderSchema);