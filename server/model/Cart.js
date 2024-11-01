const mongoose = require('mongoose');

// Định nghĩa schema cho ShoppingCart
const shoppingCartSchema = new mongoose.Schema({
 
  user_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true 
  },
 
  product_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true 
  },  
  
  size: { 
    type: String, 
    required: true 
  },

  color: { 
    type: String, 
    required: true 
  },

  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  },

  price: { 
    type: Number, 
    required: true 
  }
},{ versionKey: false });

module.exports = mongoose.model('Carts', shoppingCartSchema);
