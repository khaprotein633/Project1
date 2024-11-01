const mongoose = require('mongoose');


const orderDetailsSchema = new mongoose.Schema({
  order_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, 
  product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
  size: String, 
  color: String,
  price_order: { type: Number, required: true }, 
  quantity: { type: Number, required: true }  
},{ versionKey: false });


module.exports = mongoose.model('OrderDetails', orderDetailsSchema);