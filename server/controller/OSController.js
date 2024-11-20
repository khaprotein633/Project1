const OrderStatus = require('../model/OrderStatus');

const OSController = {
    
    getAllOrderStatuses: async (req, res) => {
        try {
            const orderStatuses = await OrderStatus.find({}); 
            res.status(200).json({orderStatuses});
        } catch (error) {
            console.error('Error fetching order statuses:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get order status by order_status_id
    getOrderStatusById: async (req, res) => {
        try {
            const orderStatus = await OrderStatus.findOne({ _id: req.params._id }); // Tìm theo order_status_id
            if (!orderStatus) {
                return res.status(404).json({ message: 'Order status not found' });
            }
            res.status(200).json(orderStatus);
        } catch (error) {
            console.error('Error fetching order status:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    addOrderStatus: async (req, res) => {
        try {
            const {status} = req.body;
            const existingStatus = await OrderStatus.findOne({ status });
            if (existingStatus) {
                return res.status(400).json({ message: 'Order status already exists' });
            }
    
            const newOrderStatus = new OrderStatus({ status});
            await newOrderStatus.save(); 
            res.status(201).json({ newOrderStatus }); 
        } catch (error) {
            console.error('Error adding order status:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    
    updateOrderStatus: async (req, res) => {
        try {
            const orderStatus = await OrderStatus.findOneAndUpdate(
                { order_status_id: req.params.order_status_id },
                req.body,
                { new: true } 
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

 
    deleteOrderStatus: async (req, res) => {
        try {
            const orderStatus = await OrderStatus.findOneAndDelete({ order_status_id: req.params.order_status_id }); // Xóa theo order_status_id
            if (!orderStatus) {
                return res.status(404).json({ message: 'Order status not found' });
            }
            res.status(204).send(); 
        } catch (error) {
            console.error('Error deleting order status:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = OSController;
