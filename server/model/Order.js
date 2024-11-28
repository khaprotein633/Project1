const mongoose = require('mongoose');
const Cart = require('./Cart');

const orderdetailSchema = new mongoose.Schema({
  product_id: { type: String, ref: 'Product', required: true },
  product_image: { type: String },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  total_price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user_id: { type: String, ref: 'User', required: true },
  total_amount: { type: Number, required: true },
  orders_date: { type: Date, default: Date.now },
  delivery_date: { type: Date },
  shipping_address: { type: String, required: true },
  user_phone: { type: String, required: true },
  order_status_id: { type: String, ref: 'OrderStatus', required: true },
  payment_status: { type: String, required: true }, 
  payment_method: { type: String, required: true},
  order_details: [orderdetailSchema]
}, { versionKey: false });

module.exports = mongoose.model('Order', orderSchema);
