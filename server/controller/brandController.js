const Brands = require('../model/Brand');

const brandController = {
    // Retrieve all brands
    getAllBrands: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const size = parseInt(req.query.size) || 5;
            const skip = (page - 1) * size;

            const listBrand = await Brands.find({})
                .skip(skip)
                .limit(size);

            const total = await Brands.countDocuments();

            res.status(200).json({ brands: listBrand, total });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching brands', error: error.message });
        }
    }
    ,
     getAll: async (req, res) => {
        try {
            const listBrand = await Brands.find({})
            res.status(200).json({ listBrand });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching brands', error: error.message });
        }
    }
    ,
    getBrandById: async (req, res) => {
        try {
            const brand= await Brands.findById(req.params._id); 
            if (!brand) {
                return res.status(404).json({ message: 'Brand not found' });
            }
            res.status(200).json({ brand });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching brand', error: error.message });
        }
    },
    

    getBrandByName: async (req, res) => {
        try {
            const brand = await Brands.find({
                brand_name: { $regex: req.params.brand_name, $options: 'i' }
            });
            if (!brand) {
                return res.status(404).json({ message: 'Brand not found' });
            }
            res.status(200).json({brand});
        } catch (error) {
            res.status(500).json({ message: 'Error fetching brand', error: error.message });
        }
    },


    addBrand: async (req, res) => {
        try {

            const { brand_name } = req.body;
            const logoUrl = req.file ? `http://localhost:4000/${req.file.path.replace(/\\/g, '/')}` : '';
            const existingBrand = await Brands.findOne({ brand_name });
            if (existingBrand) {
                return res.status(400).json({ message: 'Brand already exists' });
            }
            const newBrand = new Brands({ brand_name, brand_logo_url: logoUrl });
            await newBrand.save();

            res.status(200).json(newBrand);
        } catch (error) {
            res.status(500).json({ message: 'Error adding brand', error: error.message });
        }
    },




    updateBrand: async (req, res) => {
        try {
            const { _id } = req.params;
            const { brand_name } = req.body;
            const brand_logo_url = req.file ? `http://localhost:4000/${req.file.path.replace(/\\/g, '/')}` : null; // Đường dẫn đầy đủ cho logo


            const updateData = {
                brand_name,
            };


            if (brand_logo_url) {
                updateData.brand_logo_url = brand_logo_url;
            }

            const updatedBrand = await Brands.findOneAndUpdate(
                { _id },
                updateData,
                { new: true }
            );

            if (!updatedBrand) {
                return res.status(404).json({ message: 'Brand not found' });
            }

            res.status(200).json({updatedBrand});
        } catch (error) {
            res.status(500).json({ message: 'Error updating brand', error: error.message });
        }
    },



    deleteBrand: async (req, res) => {
        try {
            const { _id } = req.params;
            const deletedBrand = await Brands.findOneAndDelete({ _id });

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
