const OrderDetails = require('../model/OrderDetail');

const ODController = {
    
    getAllOrderDetails: async (req, res) => {
        try {
            const orderDetails = await OrderDetails.find(); 
            res.status(200).json(orderDetails);
        } catch (error) {
            console.error('Error fetching order details:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    
    getOrderDetailsById: async (req, res) => {
        try {
            const orderDetail = await OrderDetails.findOne({ _id: req.params._id }); 
            if (!orderDetail) {
                return res.status(404).json({ message: 'Order details not found' });
            }
            res.status(200).json(orderDetail);
        } catch (error) {
            console.error('Error fetching order details:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    
    getOrderDetailsByOrderId: async (req, res) => {
        try {
            const orderDetails = await OrderDetails.find({ order_id: req.params.order_id }); 
            if (!orderDetails.length) {
                return res.status(404).json({ message: 'No order details found for this order' });
            }
            res.status(200).json(orderDetails);
        } catch (error) {
            console.error('Error fetching order details by order_id:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    addOrderDetail: async (req, res) => {
        try {
            const newOrderDetail = new OrderDetails(req.body); 
            await newOrderDetail.save(); 
            res.status(201).json(newOrderDetail); 
        } catch (error) {
            console.error('Error adding order detail:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    updateOrderDetail: async (req, res) => {
        try {
            const orderDetail = await OrderDetails.findOneAndUpdate(
                {_id: req.params._id },
                req.body,
                { new: true } 
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
    deleteOrderDetail: async (req, res) => {
        try {
            const orderDetail = await OrderDetails.findOneAndDelete({ _id: req.params._id }); 
            if (!orderDetail) {
                return res.status(404).json({ message: 'Order details not found' });
            }
            res.status(204).send(); 
        } catch (error) {
            console.error('Error deleting order detail:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = ODController;
