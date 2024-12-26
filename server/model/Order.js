const mongoose = require('mongoose');
const Cart = require('./Cart');

const orderdetailSchema = new mongoose.Schema({
  product_id: { type: String, ref: 'Product', required: true },
  inventory_id:{type: String,require: true},
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user_id: { type: String, ref: 'User', required: true },
  total_amount: { type: Number, required: true },
  orders_date: { type: Date, default: Date.now },
  delivery_date: { type: Date , default:null},
  shipping_address: { type: String, required: true },
  user_phone: { type: String, required: true },
  order_status: { type: String, required: true },
  payment_method: { type: String, required: true},
  order_details: [orderdetailSchema]
}, { versionKey: false });

module.exports = mongoose.model('Order', orderSchema);
