const Product = require('../model/Product');

const productController = {
    // Get all products
    getAllProducts: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là 1
            const size = parseInt(req.query.size) || 5; // Số mục trên mỗi trang, mặc định là 5
            const skip = (page - 1) * size; // Số mục cần bỏ qua

            const products = await Product.find({}).skip(skip).limit(size); 
            const total = await Product.countDocuments();


            res.status(200).json({products,total});
        } catch (error) {
            res.status(500).json({ message: 'Error fetching brands', error: error.message });
        }
    },

    // Get a product by product_id
    getProductById: async (req, res) => {
        try {
            const product = await Product.findOne({_id: req.params.product_id }); 
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get products by brand_id
    getProductsByBrandId: async (req, res) => {
        try {
            const products = await Product.find({ brand_id: req.params.brand_id }); 
            if (!products.length) {
                return res.status(404).json({ message: 'No products found for this brand' });
            }
            res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products by brand_id:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get products by category_id
    getProductsByCategoryId: async (req, res) => {
        try {
            const products = await Product.find({ category_id: req.params.category_id }); 
            if (!products.length) {
                return res.status(404).json({ message: 'No products found for this category' });
            }
            res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products by category_id:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Add a new product
    addProduct: async (req, res) => {
        try {
            const newProduct = new Product(req.body); 
            await newProduct.save();
            res.status(201).json(newProduct); 
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Update a product by product_id
    updateProduct: async (req, res) => {
        try {
            const product = await Product.findOneAndUpdate(
                { product_id: req.params.product_id },
                req.body,
                { new: true } 
            );
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Delete a product by product_id
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findOneAndDelete({ product_id: req.params.product_id }); // Find and delete the product
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(204).send(); // No content
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = productController;
