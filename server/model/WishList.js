const mongoose = require('mongoose');

// Định nghĩa schema cho WishList
const wishListSchema = new mongoose.Schema(
  {
    user_id: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: [true, 'User ID is required'],
    },
    product_id: {type: mongoose.Schema.Types.ObjectId,ref: 'Product',required: [true, 'Product ID is required'],
    },
    date_added: {type: Date,default: Date.now,
    },
  },
  { versionKey: false }
);

// Xuất model WishList
module.exports = mongoose.model('WishList', wishListSchema);
