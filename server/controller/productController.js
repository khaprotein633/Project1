const Product = require('../model/Product');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; 
            const size = parseInt(req.query.size) || 5; 
            const skip = (page - 1) * size; 

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
            console.log(req.params._id);
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
            product.date_updated = Date.now();
            
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
    },


    getAllInventory: async (req, res) => {
        try {
            const inventory = await Product.inventory.find();
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

            const product = await Product.findById(req.params.product_id, { inventory: 1 });
            if (!product || !product.inventory) {
                return res.status(404).json({ message: 'No inventory found for this product' });
            }

            const list = product.inventory.slice(skip, skip + size);
            res.status(200).json({ list, total: product.inventory.length });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching inventory', error: error.message });
        }
    },
   
    getInventoryById: async (req, res) => {
        try {
            const productId = req.params.product_id;
            const inventoryId = req.params.inventory_id;
    
            // Tìm sản phẩm chứa inventory
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            // Tìm inventory theo inventoryId
            const inventory = product.inventory.id(inventoryId);
            if (!inventory) {
                return res.status(404).json({ message: 'Inventory not found' });
            }
    
            // Trả về thông tin inventory
            res.status(200).json({inventory});
        } catch (error) {
            console.error('Error getting inventory:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },



    addInventory: async (req, res) => {
        try {
            const productId = req.params.product_id; 
            const { size, color, price, quantity } = req.body;
            const image_url = req.file ? `http://localhost:4000/${req.file.path.replace(/\\/g, '/')}` : null;
            if (!size || !color || !price || !quantity) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            } 
            const newInventory = { size, color, price, quantity, image_url };
            product.inventory.push(newInventory);
            await product.save();
            res.status(201).json({ message: 'Inventory added successfully', inventory: newInventory });
        } catch (error) {
            console.error('Error adding inventory:', error);
            res.status(500).json({ message: 'Error adding inventory', error: error.message });
        }
    },
    
    updateInventory: async (req, res) => {
        try {
            const productId = req.params.product_id; 
            const inventoryId = req.params.inventory_id
            const {size, color, price, quantity } = req.body;
            const image_url = req.file ? `http://localhost:4000/${req.file.path.replace(/\\/g, '/')}` : '';
    
            // Tìm sản phẩm chứa inventory cần cập nhật
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            // Tìm mục inventory cần cập nhật
            const inventory = product.inventory.id(inventoryId);
            if (!inventory) {
                return res.status(404).json({ message: 'Inventory not found' });
            }
    
            // Cập nhật thông tin inventory
            inventory.size = size || inventory.size;
            inventory.color = color || inventory.color;
            inventory.price = price || inventory.price;
            inventory.quantity = quantity || inventory.quantity;
            if (image_url) {
                inventory.image_url = image_url;
            }
            inventory.last_updated = Date.now(); // Cập nhật ngày giờ sửa đổi
    
            // Lưu sản phẩm với inventory đã được cập nhật
            await product.save();
    
            // Trả về thông tin inventory đã cập nhật
            res.status(200).json({ message: 'Inventory updated successfully', inventory });
        } catch (error) {
            console.error('Error updating inventory:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
    deleteInventory: async (req, res) => {
        try {
            const productId = req.params.product_id; 
            const inventoryId = req.params.inventory_id;
    
            // Tìm sản phẩm chứa inventory cần xóa
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            // Tìm mục inventory cần xóa
            const inventory = product.inventory.id(inventoryId);
            if (!inventory) {
                return res.status(404).json({ message: 'Inventory not found' });
            }
    
            // Sử dụng pull() để xóa inventory khỏi mảng
            product.inventory.pull(inventoryId);
    
            await product.save();
    
            res.status(204).send(); // No content
        } catch (error) {
            console.error('Error deleting inventory:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
    


};

module.exports = productController;
