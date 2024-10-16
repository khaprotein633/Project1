const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
   category_id: {type: Number},
  category_name: { type: String, required: true },
  parent_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Category', categorySchema);