const Cart = require('../model/Cart');

const cartController = {
    // Lấy tất cả giỏ hàng
    getAllCarts: async (req, res) => {
        try {
            const carts = await Cart.find(); 
            res.status(200).json(carts);
        } catch (error) {
            console.error('Error fetching carts:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Lấy giỏ hàng theo user_id
    getCartByUserId: async (req, res) => {
        try {
            const cart = await Cart.findOne({ userId: req.params.userId }); 
            if (!cart) {
                return res.status(404).json({ message: 'No cart found for this user' });
            }
            res.status(200).json(cart);
        } catch (error) {
            console.error('Error fetching cart:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Thêm sản phẩm vào giỏ hàng
    addCartItem: async (req, res) => {
        try {
            const { userId, productId, inventoryId , quantity } = req.body;

            // Kiểm tra số lượng hợp lệ
            if (quantity < 1) {
                return res.status(400).json({ message: 'Quantity must be at least 1' });
            }

            // Tìm giỏ hàng của user
            let cart = await Cart.findOne({ userId });

            if (!cart) {
                
                cart = new Cart({
                    userId,
                    items: []
                });
            }

            // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingItem = cart.items.find(
                (item) =>
                    item.productId === productId &&
                    item.inventoryId == inventoryId
            );

            if (existingItem) {
                // Cập nhật số lượng và giá
                existingItem.quantity += quantity;
            } else {
                // Thêm sản phẩm mới vào mảng `items`
                cart.items.push({
                    productId,
                    inventoryId,
                    quantity  
                });
            }

            await cart.save();
            res.status(201).json({ message: 'Cart updated', cart });
        } catch (error) {
            console.error('Error adding cart item:', error.message);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },

    // Cập nhật sản phẩm trong giỏ hàng
    updateCartItem: async (req, res) => {
        try {

            const  cartitemId = req.params.cartitem_id;
            const {  userId,quantity } = req.body;

            if (quantity < 1) {
                return res.status(400).json({ message: 'Quantity must be at least 1' });
            }

            const cart = await Cart.findOne({userId: userId});

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            const item = cart.items.id(cartitemId);

            if (!item) {
                return res.status(404).json({ message: 'Cart item not found' });
            }
            item.quantity = quantity;
            
            
            await cart.save();

            res.status(200).json({ message: 'Cart item updated', cart });
        } catch (error) {
            console.error('Error updating cart item:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

   // Xóa sản phẩm khỏi giỏ hàng
    deleteCartItem: async (req, res) => {
    try {
        const userId = req.body.userId;  
        const cartItemId = req.params.cartitem_id; 
        
        const cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartitem = cart.items.id(cartItemId);

        if (!cartitem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        cart.items.pull(cartitem);
        await cart.save();

        res.status(200).json({ message: 'Cart item deleted', cart });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

};

module.exports = cartController;
