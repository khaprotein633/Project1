const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true },
  parent_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
},{ versionKey: false });

module.exports = mongoose.model('Category', categorySchema);