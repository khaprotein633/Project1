const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  discount_name: { type: String, required: true },
  discount_percentage: { type: Number, require: true },  
  start_date: { type: Date ,required: true},  
    end_date: { type: Date,required: true}   
}, { 
  versionKey: false 
});

module.exports = mongoose.model('Discount', discountSchema);
