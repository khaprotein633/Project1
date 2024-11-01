const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total_amount: { type: Number, required: true }, 
  orders_date: { type: Date, default: Date.now }, 
  delivery_date: Date, 
  shipping_address: { type: String, required: true }, 
  user_phone: { type: String, required: true }, 
  order_status_id: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderStatus', required: true }, 
  payment_status: { type: String, required: true }
},{ versionKey: false });

module.exports = mongoose.model('Order', orderSchema);