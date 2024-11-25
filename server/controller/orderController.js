const Order = require('../model/Order');

const orderController = {
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find(); 
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getOrderById: async (req, res) => {
        try {
            const order = await Order.findOne({ orders_id: req.params.orders_id });
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
            const newOrder = new Order(req.body);
            await newOrder.save(); 
            res.status(201).json(newOrder); 
        } catch (error) {
            console.error('Error adding order:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Update an order by orders_id
    updateOrder: async (req, res) => {
        try {
            const order = await Order.findOneAndUpdate(
                { orders_id: req.params.orders_id },
                req.body,
                { new: true } // Trả về đối tượng sau khi cập nhật
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

    // Delete an order by orders_id
    deleteOrder: async (req, res) => {
        try {
            const order = await Order.findOneAndDelete({ orders_id: req.params.orders_id }); // Xóa đơn hàng theo orders_id
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(204).send(); // Không có nội dung trả về
        } catch (error) {
            console.error('Error deleting order:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = orderController;
