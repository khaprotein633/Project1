const Cart = require('../model/Cart');
const Order = require('../model/Order');

const orderController = {
    
    getAllOrders: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; 
            const size = parseInt(req.query.size) || 5; 
            const skip = (page - 1) * size; 
            const list = await Order.find({}).skip(skip).limit(size); 
            const total = await Order.countDocuments();
            res.status(200).json({ list, total });
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    
    getOrderById: async (req, res) => {
        try {
            const order = await Order.findOne({ _id: req.params.order_id });
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order);
        } catch (error) {
            console.error('Error fetching order:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

 
    getOrdersByUserId: async (req, res) => {
        try {
            const orders = await Order.find({ user_id: req.params.user_id });
            if (!orders.length) {
                return res.status(404).json({ message: 'No orders found for this user' });
            }
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders by user_id:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

  
    addOrder: async (req, res) => {
        try {
            const { user_id, shipping_address, user_phone, payment_method, order_status_id, payment_status } = req.body;
    
            const cart = await Cart.findOne({ user_id: user_id });
    
            if (!cart || !cart.items.length) {
                return res.status(400).json({ message: 'Giỏ hàng trống' });
            }
    
            
            const orderDetails = cart.items.map(item => ({
                product_id: item.product_id,
                size: item.size,
                color: item.color,
                quantity: item.quantity,
                price: item.price,
                product_image: item.product_image,
                total_price: item.total_price
            }));
    
            const totalAmount = cart.items.reduce((sum, item) => sum + item.total_price, 0);
    
            const newOrder = new Order({
                user_id: user_id,
                total_amount: totalAmount,
                shipping_address: shipping_address,
                user_phone: user_phone,
                order_status_id: order_status_id,
                payment_status: payment_status,
                payment_method: payment_method,
                order_details: orderDetails  
            });
    
            await newOrder.save();

            await Cart.deleteOne({ user_id: user_id });

            res.status(201).json({newOrder});
        } catch (error) {
            console.error('Error adding order:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    
    
    updateOrder: async (req, res) => {
        try {
            const order = await Order.findOneAndUpdate(
                { _id: req.params._id }, 
                req.body,
                { new: true }  
            );
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order);  
        } catch (error) {
            console.error('Error updating order:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    deleteOrder: async (req, res) => {
        try {
            const order = await Order.findOneAndDelete({ _id: req.params.order_id }); 
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(204).send();  
        } catch (error) {
            console.error('Error deleting order:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = orderController;
