const WishList = require('../model/WishList');

const wishListController = {
    // Get all wishlists
    getAllWishLists: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; 
            const size = parseInt(req.query.size) || 5; 
            const skip = (page - 1) * size; 

            const list = await WishList.find({}).skip(skip).limit(size); 
            const total = await WishList.countDocuments();

            res.status(200).json({list,total});
        } catch (error) {
            console.error('Error fetching wishlists:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get a wishlist by user_id
    getWishListByUserId: async (req, res) => {
        try {
            const wishList = await WishList.find({ user_id: req.params.user_id }); 
            if (!wishList.length) {
                return res.status(404).json({ message: 'WishList not found for this user' });
            }
            res.status(200).json({wishList});
        } catch (error) {
            console.error('Error fetching wishlist by user_id:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Add a new wishlist
    addWishList: async (req, res) => {
        try {
            const {user_id,product_id} = req.body;
            const exists = await WishList.findOne({user_id:user_id, product_id:product_id});
            if (exists) {
                return res.status(400).json({ message: 'This product is already in the wishlist' });
            }
            const newWishList = new WishList(req.body);
            await newWishList.save(); 
            res.status(201).json({newWishList}); 
        } catch (error) {
            console.error('Error adding wishlist:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    
    deleteWishList: async (req, res) => {
        try {
            const wishList = await WishList.findOneAndDelete({ _id: req.params._id }); 
            if (!wishList) {
                return res.status(404).json({ message: 'WishList not found' });
            }
            res.status(204).send(); 
        } catch (error) {
            console.error('Error deleting wishlist:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = wishListController;
