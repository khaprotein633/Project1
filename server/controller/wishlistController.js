const WishList = require('../model/WishList');

const wishListController = {
    // Get all wishlists
    getAllWishLists: async (req, res) => {
        try {
            const wishList = await WishList.find();
            res.status(200).json(wishList);
        } catch (error) {
            console.error('Error fetching carts:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get a wishlist by user_id
    getWishListByUserId: async (req, res) => {
        try {
            const wishList = await WishList.findOne({ userId: req.params.user_id });
            if (!wishList) {
                return res.status(404).json({ message: 'WishList not found for this user' });
            }
            res.status(200).json( wishList);
        } catch (error) {
            console.error('Error fetching wishlist by user_id:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Add a new wishlist
    addWishList: async (req, res) => {
        try {
            const { userId, productId, inventoryId, quantity } = req.body;

            // Kiểm tra số lượng hợp lệ
            if (quantity < 1) {
                return res.status(400).json({ message: 'Quantity must be at least 1' });
            }

            // Tìm giỏ hàng của user
            let wishlist = await WishList.findOne({ userId });

            if (!wishlist) {

                wishlist = new WishList({
                    userId,
                    items: []
                });
            }

            // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingItem = wishlist.items.find(
                (item) =>
                    item.productId === productId &&
                    item.inventoryId == inventoryId
            );

            if (existingItem) {
                // Cập nhật số lượng và giá
                existingItem.quantity += quantity;
            } else {
                // Thêm sản phẩm mới vào mảng `items`
                wishlist.items.push({
                    productId,
                    inventoryId,
                    quantity
                });
            }

            await wishlist.save();
            res.status(201).json({ message: 'wishlist updated', wishlist });
        } catch (error) {
            console.error('Error adding wishlist item:', error.message);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },

    updateWistlistItem: async (req, res) => {
        try {

            const  wistlistItemId = req.params.wistlistItem_id;
            const {  userId,quantity } = req.body;


            const wishlist = await WishList.findOne({userId: userId});
            if (!wishlist) {
                return res.status(400).json({ message: 'Wishlist not found' });
            }

            const item = wishlist.items.id(wistlistItemId);

            if (!item) {
                return res.status(400).json({ message: 'Wishlist item not found' });
            }
            item.quantity += quantity;
            
            
            await wishlist.save();

            res.status(200).json({ message: 'Wishlist item updated', wishlist });
        } catch (error) {
            console.error('Error updating Wishlist item:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    deleteWishList: async (req, res) => {
    try {
          const userId = req.body.userId;  
          const wishListItemId = req.params.wistlistItem_id; 
          
          const wishList = await WishList.findOne({ userId: userId });
  
          if (!wishList) {
              return res.status(404).json({ message: 'wishList not found' });
          }
        //   console.log('wishListItem',wishListItem)
          const wishListItem = wishList.items.id(wishListItemId);
  
          if (!wishListItem) {
              return res.status(404).json({ message: 'wishList item not found' });
          }
          wishList.items.pull(wishListItem);
          await wishList.save();
  
          res.status(200).json({ message: 'wishList item deleted', wishList });
      } catch (error) {
          console.error('Error deleting wishList item:', error);
          res.status(500).json({ message: 'Internal Server Error' });
      }
    }
};

module.exports = wishListController;


