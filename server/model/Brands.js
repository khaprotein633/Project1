const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
   
    brand_name: { type: String},
    brand_logo_url: { type: String} ,
    created_at: { type: Date, default: Date.now },  
    updated_at: { type: Date, default: Date.now }  
},{ versionKey: false });

brandSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
  });
// Xuất mô hình
const Brands = mongoose.model('Brands', brandSchema);
module.exports = Brands;