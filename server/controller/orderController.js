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
            const newOrder = new Order(req.body);  
            await newOrder.save();  
            res.status(201).json(newOrder);
        } catch (error) {
            console.error('Error adding order:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Cập nhật đơn hàng theo order_id
    updateOrder: async (req, res) => {
        try {
            const order = await Order.findOneAndUpdate(
                { _id: req.params.order_id }, // Cập nhật theo _id
                req.body,
                { new: true }  // Trả về đối tượng sau khi cập nhật
            );
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order);  // Trả về đơn hàng đã cập nhật
        } catch (error) {
            console.error('Error updating order:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Xóa đơn hàng theo order_id
    deleteOrder: async (req, res) => {
        try {
            const order = await Order.findOneAndDelete({ _id: req.params.order_id }); // Xóa theo _id
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(204).send();  // Trả về 204 No Content sau khi xóa
        } catch (error) {
            console.error('Error deleting order:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Lấy chi tiết các sản phẩm trong đơn hàng (order_details đã được nhúng trong Order)
    getOrderDetailsByOrderId: async (req, res) => {
        try {
            const order = await Order.findOne({ _id: req.params.order_id });
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order.order_details); // Trả về thông tin order_details của đơn hàng
        } catch (error) {
            console.error('Error fetching order details by order_id:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Thêm chi tiết sản phẩm vào đơn hàng (order_details)
    addOrderDetail: async (req, res) => {
        try {
            const order = await Order.findOne({ _id: req.params.order_id }); // Tìm đơn hàng theo order_id
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            
            // Thêm chi tiết sản phẩm vào mảng order_details
            order.order_details.push(req.body);
            await order.save();  // Lưu đơn hàng đã cập nhật
            res.status(201).json(order);  // Trả về đơn hàng đã được cập nhật
        } catch (error) {
            console.error('Error adding order detail:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Cập nhật chi tiết sản phẩm trong đơn hàng
    updateOrderDetail: async (req, res) => {
        try {
            const order = await Order.findOne({ _id: req.params.order_id }); // Tìm đơn hàng
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            const orderDetail = order.order_details.id(req.params.detail_id); // Tìm chi tiết sản phẩm trong mảng order_details
            if (!orderDetail) {
                return res.status(404).json({ message: 'Order detail not found' });
            }

            // Cập nhật thông tin chi tiết sản phẩm
            Object.assign(orderDetail, req.body);
            await order.save();  // Lưu lại đơn hàng đã cập nhật
            res.status(200).json(orderDetail);  // Trả về chi tiết sản phẩm đã cập nhật
        } catch (error) {
            console.error('Error updating order detail:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Xóa chi tiết sản phẩm trong đơn hàng
    deleteOrderDetail: async (req, res) => {
        try {
            const order = await Order.findOne({ _id: req.params.order_id }); // Tìm đơn hàng
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            const orderDetail = order.order_details.id(req.params.detail_id); // Tìm chi tiết sản phẩm
            if (!orderDetail) {
                return res.status(404).json({ message: 'Order detail not found' });
            }

            // Xóa chi tiết sản phẩm khỏi mảng order_details
            order.order_details.pull(orderDetail);
            await order.save();  // Lưu lại đơn hàng đã cập nhật
            res.status(204).send();  // Trả về 204 No Content sau khi xóa
        } catch (error) {
            console.error('Error deleting order detail:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = orderController;
