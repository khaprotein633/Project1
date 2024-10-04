const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brand_id: { type: Number},
   
    brand_name: { type: String},
    
    brand_logo_url: { type: String} 
});

// Xuất mô hình
const Brands = mongoose.model('Brands', brandSchema);
module.exports = Brands;