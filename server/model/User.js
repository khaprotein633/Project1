const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  role_id: { type: Number, ref: 'Role' },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: String,
  phonenumber: String,
  account_date: { type: Date, default: Date.now },
  is_active: { type: Number, default: 1 }
});

module.exports = mongoose.model('User', userSchema);