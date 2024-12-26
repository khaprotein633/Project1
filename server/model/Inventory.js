const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  product_id: { type: String, ref: 'Product', required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image_url:{ type: String },
  last_updated: { type: Date, default: Date.now }
},{ versionKey: false });
inventorySchema.pre('save', function (next) {
  this.last_updated = Date.now();
  next();
});
module.exports = mongoose.model('Inventory', inventorySchema);