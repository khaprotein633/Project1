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

    // Get cart items by user_id
    getCartByUserId: async (req, res) => {
        try {
            const carts = await Cart.find({ user_id: req.params.user_id }); // Find cart by user_id
            if (!carts.length) {
                return res.status(404).json({ message: 'No carts found for this user' });
            }
            res.status(200).json(carts);
        } catch (error) {
            console.error('Error fetching carts:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Add a new cart item
    addCartItem: async (req, res) => {
        try {
            // const newCart = new Cart(req.body); // Create a new cart instance
            const newCart = await Cart.create(req.body); // Save the cart to the database
            res.status(201).json(newCart); // Return the created cart
        } catch (error) {
            console.error('Error adding cart item:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Update a cart item by cart_id
    updateCartItem: async (req, res) => {
        try {
            const cart = await Cart.findOneAndUpdate(
                { cart_id: req.params.cart_id },
                req.body,
                { new: true } // Return the updated cart item
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

    // Delete a cart item by cart_id
    deleteCartItem: async (req, res) => {
        try {
            const cart = await Cart.findOneAndDelete({ cart_id: req.params.cart_id }); // Find and delete the cart item
            if (!cart) {
                return res.status(404).json({ message: 'Cart item not found' });
            }
            res.status(204).send(); // No content
        } catch (error) {
            console.error('Error deleting cart item:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = cartController;
