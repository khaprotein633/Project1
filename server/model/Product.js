const mongoose = require('mongoose');

 
const productSchema = new mongoose.Schema({
  category_id: { type: String, ref: 'Category', required: true }, 
  product_name: { type: String, required: true },
  brand_id: { type: String, ref: 'Brands', required: true },
  description: { type: String, default: '' },
  detail: { type: String, default: '' },
  main_image: { type: String },
  images: [{ type: String }], 
  hide: { type: Boolean, default: false },
  date_added: { type: Date, default: Date.now },
  date_updated: { type: Date, default: Date.now },
}, { versionKey: false });

productSchema.pre('save', function (next) {
  this.date_updated = Date.now();
  next();
});

const Products = mongoose.model('Product', productSchema);

module.exports = Products;
