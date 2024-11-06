const Product = require('../model/Product');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là 1
            const size = parseInt(req.query.size) || 5; // Số mục trên mỗi trang, mặc định là 5
            const skip = (page - 1) * size; // Số mục cần bỏ qua

            const products = await Product.find({}).skip(skip).limit(size);
            const total = await Product.countDocuments();


            res.status(200).json({ products, total });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching brands', error: error.message });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await Product.findOne({ _id: req.params._id });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ product });
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getProductsByBrandId: async (req, res) => {
        try {
            const products = await Product.find({ brand_id: req.params.brand_id });
            if (!products.length) {
                return res.status(404).json({ message: 'No products found for this brand' });
            }
            res.status(200).json({ products });
        } catch (error) {
            console.error('Error fetching products by brand_id:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

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
    getProductsByName: async (req, res) => {
        try {
            const products = await Product.find({ product_name: { $regex: req.params.product_name, $options: 'i' } });
            if (!products.length) {
                return res.status(404).json({ message: 'No products found for this category' });
            }
            res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products by category_id:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    addProduct: async (req, res) => {
        try {
            const { product_name, category_id, brand_id, description, detail } = req.body;
            const mainImageUrl = req.files['main_image'] ? `http://localhost:4000/${req.files['main_image'][0].path.replace(/\\/g, '/')}` : null;
 
            const auxiliaryImageUrls = req.files['product_images'] ? req.files['product_images'].map(file => `http://localhost:4000/${file.path.replace(/\\/g, '/')}`) : [];

            const newProduct = new Product({
                product_name,
                category_id,
                brand_id,
                description,
                detail,
                main_image: mainImageUrl,
                images: auxiliaryImageUrls
            });

            
            await newProduct.save();
            res.status(201).json(newProduct);

        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },



    updateProduct: async (req, res) => {
        const productId = req.params._id; 
        const { removeImages } = req.body;
        const parsedRemoveImages = removeImages ? JSON.parse(removeImages) : []; 
    
        const newImageUrls = req.files['product_images'] 
            ? req.files['product_images'].map(file => `http://localhost:4000/${file.path.replace(/\\/g, '/')}`) 
            : []; 
    
        const mainImageUrl = req.files['main_image'] 
            ? `http://localhost:4000/${req.files['main_image'][0].path.replace(/\\/g, '/')}` 
            : null;
    
        try {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            Object.assign(product, req.body);
            
            if (mainImageUrl) {
                product.main_image = mainImageUrl;
            }
            
           
            if (parsedRemoveImages && Array.isArray(parsedRemoveImages)) {
                product.images = product.images.filter(image => !parsedRemoveImages.includes(image));
            }
            
            
            if (newImageUrls.length > 0) {
                product.images.push(...newImageUrls);
            }
            
            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findOneAndDelete({ _id: req.params._id });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = productController;
