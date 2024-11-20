const Cart = require('../model/Cart');
const Products = require('../model/Product');

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
            console.log(req.params.user_id)
            const cart = await Cart.find({ userId: req.params.user_id });
            if (!cart) return res.status(404).send('Cart not found');
            res.send(cart);
        } catch (error) {
            console.error('Error fetching carts:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    addCartItem: async (req, res) => {
        try {
            const { userId, productId, quantity } = req.body;

            let cart = await Cart.findOne({ userId });
            if (!cart) {
                cart = new Cart({ userId, items: [], totalPrice: 0 });
            }

            const product = await Products.findById(productId);
            if (!product) {
                return res.status(404).send('Product not found');
            }
            console.log(product);

            const productIndex = cart.items.findIndex(item => item.productId === productId);
            if (productIndex > -1) {
                cart.items[productIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }

            // Calculate totalPrice with resolved promises
            let totalPrice = 0;
            for (const item of cart.items) {
                const prod = await Products.findById(item.productId);
                totalPrice += prod.price * item.quantity;
            }
            cart.totalPrice = totalPrice;
            await cart.save();
            res.send(cart);
        } catch (error) {
            console.error('Error adding cart item:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },




    updateCartItem: async (req, res) => {
        try {

            const { userId } = req.params;
            const { items } = req.body;

            let cart = await Cart.findOne({ userId });
            if (!cart) return res.status(404).send('Cart not found');

            cart.items = items;

            // Tính lại tổng giá
            cart.totalPrice = items.reduce((total, item) => total + item.quantity * 10, 0); // Giả sử mỗi sản phẩm có giá 10

            await cart.save();
            res.send(cart);
        } catch (error) {
            console.error('Error updating cart item:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    deleteCartItem: async (req, res) => {
        try {
            const { userId, productId } = req.params;

            let cart = await Cart.findOne({ userId });
            if (!cart) return res.status(404).send('Cart not found');

            cart.items = cart.items.filter(item => item.productId !== productId);
            cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * 10, 0);

            await cart.save();
            res.send(cart);
        } catch (error) {
            console.error('Error deleting cart item:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = cartController;
