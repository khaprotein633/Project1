const mongoose = require('mongoose');

// Schema cho Order (Đơn hàng)
const orderSchema = new mongoose.Schema({
  user_id: { type: String, ref: 'User', required: true },
  total_amount: { type: Number, required: true },
  orders_date: { type: Date, default: Date.now },
  delivery_date: { type: Date },
  shipping_address: { type: String, required: true },
  user_phone: { type: String, required: true },
  order_status_id: { type: String, ref: 'OrderStatus', required: true },
  payment_status: { type: String, required: true },

  order_details: [{
    product_id: { type: String, ref: 'Product', required: true },
    size: String,
    color: String,
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }]
}, { versionKey: false });

// Tạo model cho Order
module.exports = mongoose.model('Order', orderSchema);
