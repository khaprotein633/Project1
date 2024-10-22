const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
   
    brand_name: { type: String},
    
    brand_logo_url: { type: String} 
},{ versionKey: false });

// Xuất mô hình
const Brands = mongoose.model('Brands', brandSchema);
module.exports = Brands;