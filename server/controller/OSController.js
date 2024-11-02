const OrderStatus = require('../model/OrderStatus');

const OSController = {
    // Get all order statuses
    getAllOrderStatuses: async (req, res) => {
        try {
            const orderStatuses = await OrderStatus.find(); // Lấy tất cả trạng thái đơn hàng
            res.status(200).json(orderStatuses);
        } catch (error) {
            console.error('Error fetching order statuses:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get order status by order_status_id
    getOrderStatusById: async (req, res) => {
        try {
            const orderStatus = await OrderStatus.findOne({ order_status_id: req.params.order_status_id }); // Tìm theo order_status_id
            if (!orderStatus) {
                return res.status(404).json({ message: 'Order status not found' });
            }
            res.status(200).json(orderStatus);
        } catch (error) {
            console.error('Error fetching order status:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Add a new order status
    addOrderStatus: async (req, res) => {
        try {
            const newOrderStatus = new OrderStatus(req.body); // Tạo trạng thái đơn hàng mới
            await newOrderStatus.save(); // Lưu vào cơ sở dữ liệu
            res.status(201).json(newOrderStatus); // Trả về trạng thái đơn hàng mới được thêm
        } catch (error) {
            console.error('Error adding order status:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Update order status by order_status_id
    updateOrderStatus: async (req, res) => {
        try {
            const orderStatus = await OrderStatus.findOneAndUpdate(
                { order_status_id: req.params.order_status_id },
                req.body,
                { new: true } // Trả về đối tượng đã cập nhật
            );
            if (!orderStatus) {
                return res.status(404).json({ message: 'Order status not found' });
            }
            res.status(200).json(orderStatus);
        } catch (error) {
            console.error('Error updating order status:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Delete order status by order_status_id
    deleteOrderStatus: async (req, res) => {
        try {
            const orderStatus = await OrderStatus.findOneAndDelete({ order_status_id: req.params.order_status_id }); // Xóa theo order_status_id
            if (!orderStatus) {
                return res.status(404).json({ message: 'Order status not found' });
            }
            res.status(204).send(); // Không có nội dung trả về
        } catch (error) {
            console.error('Error deleting order status:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = OSController;
