const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  last_updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);