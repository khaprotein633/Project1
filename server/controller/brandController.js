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
     // Get brand by brand_id
     getBrandByName: async (req, res) => {
        try {
            const brand = await Brands.find({ 
                brand_name: { $regex: req.params.brand_name, $options: 'i' }
            });
            if (!brand) {
                return res.status(404).json({ message: 'Brand not found' });
            }
            res.status(200).json(brand);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching brand', error: error.message });
        }
    },

    // Add a new brand
    addBrand: async (req, res) => {  
        try {
           //  brand_name từ req.body
            const {brand_name} = req.body;
             // Đường dẫn đầy đủ bao gồm tiền tố 'http://localhost:4000/'
            const logoUrl = req.file ? `http://localhost:4000/${req.file.path.replace(/\\/g, '/')}` : '';
             const maxbrand_id = await Brands.findOne().sort({brand_id:-1}).limit(1);
            const newbrand_id = maxbrand_id ? maxbrand_id.brand_id +1 : 1;

            // Check if brand already exists
            const existingBrand = await Brands.findOne({brand_name});
            if (existingBrand) {
                return res.status(400).json({ message: 'Brand already exists' });
            }

            const newBrand = new Brands({ brand_id:newbrand_id, brand_name, brand_logo_url:logoUrl });
            await newBrand.save();

            res.status(200).json(newBrand);
        } catch (error) {
            res.status(500).json({ message: 'Error adding brand', error: error.message });
        }
    },

   

   // Update brand by brand_id
updateBrand: async (req, res) => {
    try {
        const { brand_id } = req.params;
        const { brand_name } = req.body; // Lấy brand_name từ req.body
        const brand_logo_url = req.file ? `http://localhost:4000/${req.file.path.replace(/\\/g, '/')}` : null; // Đường dẫn đầy đủ cho logo

        // Tạo đối tượng cập nhật
        const updateData = {
            brand_name,
        };

        // Chỉ thêm brand_logo_url nếu nó tồn tại
        if (brand_logo_url) {
            updateData.brand_logo_url = brand_logo_url;
        }

        const updatedBrand = await Brands.findOneAndUpdate(
            { brand_id },
            updateData,
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
