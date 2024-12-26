const mongoose = require('mongoose');
const Inventory = require('./Inventory');

const inventorySchema = new mongoose.Schema({
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image_url: {type: String },
  last_updated: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  category_id: { type: String, ref: 'Category', required: true },
  brand_id: { type: String, ref: 'Brand', required: true },
  description: { type: String },
  detail: { type: String },
  main_image: { type: String },
  images: [{type:String}],
  inventory: [inventorySchema] ,
  date_added: { type: Date, default: Date.now },
  date_updated: { type: Date, default: Date.now },
}, { versionKey: false });

module.exports = mongoose.model('Product', productSchema);
