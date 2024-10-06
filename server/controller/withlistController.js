const WishList = require('../model/WithList');

const wishListController = {
    // Get all wishlists
    getAllWishLists: async (req, res) => {
        try {
            const wishLists = await WishList.find(); // Lấy tất cả các danh sách yêu thích
            res.status(200).json(wishLists);
        } catch (error) {
            console.error('Error fetching wishlists:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get a wishlist by user_id
    getWishListByUserId: async (req, res) => {
        try {
            const wishList = await WishList.find({ user_id: req.params.user_id }); // Tìm danh sách yêu thích theo user_id
            if (!wishList.length) {
                return res.status(404).json({ message: 'WishList not found for this user' });
            }
            res.status(200).json(wishList);
        } catch (error) {
            console.error('Error fetching wishlist by user_id:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Add a new wishlist
    addWishList: async (req, res) => {
        try {
            const newWishList = new WishList(req.body); // Tạo danh sách yêu thích mới
            await newWishList.save(); // Lưu vào cơ sở dữ liệu
            res.status(201).json(newWishList); // Trả về danh sách yêu thích mới được thêm
        } catch (error) {
            console.error('Error adding wishlist:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Delete a wishlist by wishlist_id
    deleteWishList: async (req, res) => {
        try {
            const wishList = await WishList.findOneAndDelete({ wishlist_id: req.params.wishlist_id }); // Xóa danh sách yêu thích theo wishlist_id
            if (!wishList) {
                return res.status(404).json({ message: 'WishList not found' });
            }
            res.status(204).send(); // Không có nội dung trả về
        } catch (error) {
            console.error('Error deleting wishlist:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = wishListController;
