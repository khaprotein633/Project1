const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true },
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },  
  created_at: { type: Date, default: Date.now },  
  updated_at: { type: Date, default: Date.now }   
}, { 
  versionKey: false 
});
categorySchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Category', categorySchema);
