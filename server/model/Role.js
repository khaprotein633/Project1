const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role_name: { type: String, required: true }
},{ versionKey: false });

module.exports = mongoose.model('Role', roleSchema);