const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category_id: { type: Number, ref: 'Category' },
  product_name: { type: String, required: true },
  brand_id: { type: Number, ref: 'Brands' },
  description: String,
  detail: String,
  hide: { type: Number, default: 0 },
  date_added: { type: Date, default: Date.now },
  date_updated: { type: Date, default: Date.now }
},{ versionKey: false });

const Products = mongoose.model('Products', productSchema);

module.exports = Products