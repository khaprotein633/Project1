const mongoose = require('mongoose');


const orderStatusSchema = new mongoose.Schema({
  status: { type: String} 
},{ versionKey: false });


module.exports = mongoose.model('OrderStatus', orderStatusSchema); 