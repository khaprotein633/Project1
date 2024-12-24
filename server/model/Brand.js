const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brand_name: { type: String, require:true},
    brand_logo_url: { type: String, require:true} ,
    created_at: { type: Date, default: Date.now },  
    updated_at: { type: Date, default: Date.now }  
},{ versionKey: false });

// Xuất mô hình
module.exports = mongoose.model('Brand', brandSchema);