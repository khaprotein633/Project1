const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: {type:String,unique: true},
  phoneNumber: {type:String,unique: true},
  account_date: { type: Date, default: Date.now }
},{ versionKey: false });

module.exports = mongoose.model('User', userSchema);