const mongoose = require('mongoose');


const orderDetailsSchema = new mongoose.Schema({
  order_details_id: { type: String, required: true, unique: true }, 
  order_id: { type: String, ref: 'Order', required: true }, 
  product_id: { type: String, ref: 'Product', required: true }, 
  size: String, 
  color: String,
  price_order: { type: Number, required: true }, 
  quantity: { type: Number, required: true }  
},{ versionKey: false });


module.exports = mongoose.model('OrderDetails', orderDetailsSchema);