const Cart = require('../model/Cart');

const cartController = {
    
    getAllCarts: async (req, res) => {
        try {
            const carts = await Cart.find(); 
            res.status(200).json(carts);
        } catch (error) {
            console.error('Error fetching carts:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

  
    getCartByUserId: async (req, res) => {
        try {
            const carts = await Cart.find({ user_id: req.params.user_id }); 
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
            const { user_id, product_id, size, color, quantity, price, product_image } = req.body;
            const existingCartItem = await Cart.findOne({ user_id, product_id, size, color });
    
            if (existingCartItem) {
                
                existingCartItem.quantity += quantity;
                existingCartItem.price = existingCartItem.quantity * price; 
    
                await existingCartItem.save(); 
                return res.status(200).json(existingCartItem); 
            }
    
            
            const totalPrice = quantity * price; 
    
            const newCart = new Cart({
                user_id,
                product_id,
                size,
                color,
                price: totalPrice, 
                quantity,
                product_image
            });
    
            await newCart.save();
            res.status(201).json(newCart); 
        } catch (error) {
            console.error('Error adding cart item:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    
    
    

    updateCartItem: async (req, res) => {
        try {
            
            const cart = await Cart.findOne({ _id: req.params._id });
            if (!cart) {
                return res.status(404).json({ message: 'Cart item not found' });
            }
            const { quantity, price } = req.body;
            if (quantity < 1) {
                return res.status(400).json({ message: 'Quantity must be at least 1' });
            }
            cart.quantity = quantity;
            cart.price = cart.quantity * price;
            await cart.save();
    
            res.status(200).json(cart);
        } catch (error) {
            console.error('Error updating cart item:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    deleteCartItem: async (req, res) => {
        try {   
            const cart = await Cart.findOneAndDelete({_id: req.params._id }); 
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
