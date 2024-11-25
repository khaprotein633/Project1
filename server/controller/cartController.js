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
            const cart = await Cart.findOne({ user_id: req.params.user_id }); 
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
            const { user_id, product_id, size, color, quantity, price, product_image } = req.body;

            // Kiểm tra số lượng hợp lệ
            if (quantity < 1) {
                return res.status(400).json({ message: 'Quantity must be at least 1' });
            }

            // Tìm giỏ hàng của user
            let cart = await Cart.findOne({ user_id });

            if (!cart) {
                // Tạo giỏ hàng mới nếu chưa tồn tại
                cart = new Cart({
                    user_id,
                    items: []
                });
            }

            // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingItem = cart.items.find(
                (item) =>
                    item.product_id === product_id &&
                    item.size === size &&
                    item.color === color
            );

            if (existingItem) {
                // Cập nhật số lượng và giá
                existingItem.quantity += quantity;
                existingItem.total_price = existingItem.quantity * price;
            } else {
                // Thêm sản phẩm mới vào mảng `items`
                cart.items.push({
                    product_id,
                    size,
                    color,
                    quantity,
                    price,
                    product_image,
                    total_price: quantity * price
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
            const  userId  = req.params.user_id;
            const  cartitemId = req.params.cartitem_id;
            const { quantity } = req.body;

            if (quantity < 1) {
                return res.status(400).json({ message: 'Quantity must be at least 1' });
            }

            const cart = await Cart.findOne({user_id: userId});

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            const item = cart.items.id(cartitemId);

            if (!item) {
                return res.status(404).json({ message: 'Cart item not found' });
            }
            
            const prices = item.price / item.quantity
            item.quantity = quantity;
            item.price = item.quantity * prices; 
            
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
        const userId = req.params.user_id;  
        const cartItemId = req.params.cartitem_id; 
        
        const cart = await Cart.findOne({ user_id: userId });

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
