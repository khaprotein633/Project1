const Cart = require('../model/Cart');

const cartController = {
    // Get all cart items
    getAllCarts: async (req, res) => {
        try {
            const carts = await Cart.find(); // Get all carts
            res.status(200).json(carts);
        } catch (error) {
            console.error('Error fetching carts:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

  
    getCartByUserId: async (req, res) => {
        try {
            const carts = await Cart.find({ user_id: req.params._id }); 
            if (!carts.length) {
                return res.status(404).json({ message: 'No carts found for this user' });
            }
            res.status(200).json(carts);
        } catch (error) {
            console.error('Error fetching carts:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    
    addCartItem: async (req, res) => {
        try {
            const newCart = new Cart(req.body); 
            await newCart.save(); 
            res.status(201).json(newCart); 
        } catch (error) {
            console.error('Error adding cart item:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    
    updateCartItem: async (req, res) => {
        try {
            const cart = await Cart.findOneAndUpdate(
                { cart_id: req.params.cart_id },
                req.body,
                { new: true } 
            );
            if (!cart) {
                return res.status(404).json({ message: 'Cart item not found' });
            }
            res.status(200).json(cart);
        } catch (error) {
            console.error('Error updating cart item:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    
    deleteCartItem: async (req, res) => {
        try {   
            const cart = await Cart.findOneAndDelete({ cart_id: req.params.cart_id }); 
            if (!cart) {
                return res.status(404).json({ message: 'Cart item not found' });
            }
            res.status(204).send(); 
        } catch (error) {
            console.error('Error deleting cart item:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = cartController;
