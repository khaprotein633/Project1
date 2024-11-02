const OrderDetails = require('../model/OrderDetail');

const ODController = {
    // Get all order details
    getAllOrderDetails: async (req, res) => {
        try {
            const orderDetails = await OrderDetails.find(); // Lấy tất cả chi tiết đơn hàng
            res.status(200).json(orderDetails);
        } catch (error) {
            console.error('Error fetching order details:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get order details by order_details_id
    getOrderDetailsById: async (req, res) => {
        try {
            const orderDetail = await OrderDetails.findOne({ order_details_id: req.params.order_details_id }); // Tìm theo order_details_id
            if (!orderDetail) {
                return res.status(404).json({ message: 'Order details not found' });
            }
            res.status(200).json(orderDetail);
        } catch (error) {
            console.error('Error fetching order details:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get order details by order_id
    getOrderDetailsByOrderId: async (req, res) => {
        try {
            const orderDetails = await OrderDetails.find({ order_id: req.params.order_id }); // Tìm theo order_id
            if (!orderDetails.length) {
                return res.status(404).json({ message: 'No order details found for this order' });
            }
            res.status(200).json(orderDetails);
        } catch (error) {
            console.error('Error fetching order details by order_id:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Add a new order detail
    addOrderDetail: async (req, res) => {
        try {
            const newOrderDetail = new OrderDetails(req.body); // Tạo chi tiết đơn hàng mới
            await newOrderDetail.save(); // Lưu vào cơ sở dữ liệu
            res.status(201).json(newOrderDetail); // Trả về chi tiết đơn hàng mới được thêm
        } catch (error) {
            console.error('Error adding order detail:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Update order detail by order_details_id
    updateOrderDetail: async (req, res) => {
        try {
            const orderDetail = await OrderDetails.findOneAndUpdate(
                { order_details_id: req.params.order_details_id },
                req.body,
                { new: true } // Trả về đối tượng đã cập nhật
            );
            if (!orderDetail) {
                return res.status(404).json({ message: 'Order details not found' });
            }
            res.status(200).json(orderDetail);
        } catch (error) {
            console.error('Error updating order detail:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Delete order detail by order_details_id
    deleteOrderDetail: async (req, res) => {
        try {
            const orderDetail = await OrderDetails.findOneAndDelete({ order_details_id: req.params.order_details_id }); // Xóa theo order_details_id
            if (!orderDetail) {
                return res.status(404).json({ message: 'Order details not found' });
            }
            res.status(204).send(); // Không có nội dung trả về
        } catch (error) {
            console.error('Error deleting order detail:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = ODController;
