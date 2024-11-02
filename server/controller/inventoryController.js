const Inventory = require('../model/Inventory');

const inventoryController = {
    // Get all inventory records
    getAllInventory: async (req, res) => {
        try {
            const inventory = await Inventory.find(); // Lấy tất cả các bản ghi trong kho
            res.status(200).json(inventory);
        } catch (error) {
            console.error('Error fetching inventory:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get inventory by product_id
    getInventoryByProductId: async (req, res) => {
        try {
            const inventory = await Inventory.find({ product_id: req.params.product_id }); // Tìm kho theo product_id
            if (!inventory.length) {
                return res.status(404).json({ message: 'No inventory found for this product' });
            }
            res.status(200).json(inventory);
        } catch (error) {
            console.error('Error fetching inventory:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Add new inventory
    addInventory: async (req, res) => {
        try {
            const newInventory = new Inventory(req.body); // Tạo một bản ghi mới trong kho
            await newInventory.save(); // Lưu bản ghi vào cơ sở dữ liệu
            res.status(201).json(newInventory);
        } catch (error) {
            console.error('Error adding inventory:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Update inventory by product_id
    updateInventory: async (req, res) => {
        try {
            const inventory = await Inventory.findOneAndUpdate(
                { product_id: req.params.product_id, size: req.body.size, color: req.body.color }, // Tìm kho theo product_id, size và color
                req.body,
                { new: true } // Trả về bản ghi đã được cập nhật
            );
            if (!inventory) {
                return res.status(404).json({ message: 'Inventory not found' });
            }
            res.status(200).json(inventory);
        } catch (error) {
            console.error('Error updating inventory:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Delete inventory by product_id, size, and color
    deleteInventory: async (req, res) => {
        try {
            const inventory = await Inventory.findOneAndDelete({ 
                product_id: req.params.product_id, 
                size: req.body.size, 
                color: req.body.color 
            }); // Tìm và xóa bản ghi trong kho
            if (!inventory) {
                return res.status(404).json({ message: 'Inventory not found' });
            }
            res.status(204).send(); // No content
        } catch (error) {
            console.error('Error deleting inventory:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = inventoryController;
