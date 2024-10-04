const mongoose = require('mongoose');

// Định nghĩa schema cho OrderStatus
const orderStatusSchema = new mongoose.Schema({
  order_status_id: { type: Number, required: true, unique: true }, // ID duy nhất cho trạng thái đơn hàng
  status: { type: String, required: true } // Tên trạng thái đơn hàng (ví dụ: "Đang xử lý", "Đã giao", "Đã hủy")
});

// Xuất model OrderStatus
module.exports = mongoose.model('OrderStatus', orderStatusSchema);