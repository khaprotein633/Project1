const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role_id: { type: String, required: true, unique: true },
  role_name: { type: String, required: true }
},{ versionKey: false });

module.exports = mongoose.model('Role', roleSchema);