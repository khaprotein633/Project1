const Inventory = require('../model/Inventory');

const inventoryController = {
    // Get all inventory records
    getAllInventory: async (req, res) => {
        try {
            
            const inventory = await Inventory.find();
            res.status(200).json(inventory);
        } catch (error) {
            console.error('Error fetching inventory:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    getInventoryByProductId: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; 
            const size = parseInt(req.query.size) || 5; 
            const skip = (page - 1) * size; 
            const list = await Inventory.find({ product_id: req.params.product_id }).skip(skip).limit(size);;
            const total = await Inventory.countDocuments();
            if (!list.length) {
                return res.status(404).json({ message: 'No inventory found for this product' });
            }
            res.status(200).json({list,total});
        } catch (error) {
            console.error('Error fetching inventory:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getInventoryById: async (req, res) => {
        try {
            const inventory = await Inventory.findOne({_id: req.params._id });
            if (!inventory) {
                return res.status(404).json({ message: 'not found' });
            }
            
            res.status(200).json({inventory});
        } catch (error) {
            console.error('Error fetching inventory:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    addInventory: async (req, res) => {
        try {
            const { product_id, size, color, price, quantity } = req.body;
            const image_url = req.file ? `http://localhost:4000/${req.file.path.replace(/\\/g, '/')}` : '';
    
           
            const newInventory = new Inventory({
                product_id,
                size,
                color,
                price,
                quantity,
                image_url:image_url
            });
            await newInventory.save();
            res.status(201).json(newInventory);
        } catch (error) {
            console.error('Lỗi khi thêm kho hàng:', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    


    updateInventory: async (req, res) => {
        try {

            const image_url = req.file ? `http://localhost:4000/${req.file.path.replace(/\\/g, '/')}` : '';
    
            const inventory = await Inventory.findById(req.params._id);
            if (!inventory) {
                return res.status(404).json({ message: 'Inventory not found' });
            }
            Object.assign(inventory, req.body);
            if (image_url) {
                inventory.image_url = image_url;
            }
            const updatedInventory = await inventory.save();
            res.status(200).json(updatedInventory);
        } catch (error) {
            console.error('Error updating inventory:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    // Delete inventory by product_id, size, and color
    deleteInventory: async (req, res) => {
        try {
            const inventory = await Inventory.findOneAndDelete({
                _id: req.params._id, 
            });
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
