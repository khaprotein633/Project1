const Brands = require('../model/Brands');

const brandController = {
    // Retrieve all brands
    getAllBrands: async (req, res) => {
        try {
            const listBrand = await Brands.find({});
            res.status(200).json(listBrand);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching brands', error: error.message });
        }
    },

    // Add a new brand
    addBrand: async (req, res) => {
        try {
            const { brand_id, brand_name, brand_logo_url } = req.body;

            // Check if brand already exists
            const existingBrand = await Brands.findOne({ brand_id });
            if (existingBrand) {
                return res.status(400).json({ message: 'Brand already exists' });
            }

            const newBrand = new Brands({ brand_id, brand_name, brand_logo_url });
            await newBrand.save();

            res.status(201).json(newBrand);
        } catch (error) {
            res.status(500).json({ message: 'Error adding brand', error: error.message });
        }
    },

    // Get brand by brand_id
    getBrandById: async (req, res) => {
        try {
            const brand = await Brands.findOne({ brand_id: req.params.brand_id });
            if (!brand) {
                return res.status(404).json({ message: 'Brand not found' });
            }
            res.status(200).json(brand);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching brand', error: error.message });
        }
    },

    // Update brand by brand_id
    updateBrand: async (req, res) => {
        try {
            const { brand_id } = req.params;
            const { brand_name, brand_logo_url } = req.body;

            const updatedBrand = await Brands.findOneAndUpdate(
                { brand_id },
                { brand_name, brand_logo_url },
                { new: true } // This option returns the updated document
            );

            if (!updatedBrand) {
                return res.status(404).json({ message: 'Brand not found' });
            }

            res.status(200).json(updatedBrand);
        } catch (error) {
            res.status(500).json({ message: 'Error updating brand', error: error.message });
        }
    },

    // Delete brand by brand_id
    deleteBrand: async (req, res) => {
        try {
            const { brand_id } = req.params;
            const deletedBrand = await Brands.findOneAndDelete({ brand_id });

            if (!deletedBrand) {
                return res.status(404).json({ message: 'Brand not found' });
            }

            res.status(200).json({ message: 'Brand deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting brand', error: error.message });
        }
    }
};

module.exports = brandController;
