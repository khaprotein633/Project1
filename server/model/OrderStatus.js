const mongoose = require('mongoose');

// Định nghĩa schema cho OrderStatus
const orderStatusSchema = new mongoose.Schema({
  status: { type: String, required: true } 
},{ versionKey: false });

// Xuất model OrderStatus
module.exports = mongoose.model('OrderStatus', orderStatusSchema);