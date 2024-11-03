const Image = require('../model/Product_Image');

const imageController = {
    // Get all images
    getAllImages: async (req, res) => {
        try {
            const images = await Image.find(); // Lấy tất cả hình ảnh
            res.status(200).json(images);
        } catch (error) {
            console.error('Error fetching images:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get all images by product_id
    getImagesByProductId: async (req, res) => {
        try {
            const images = await Image.find({ product_id: req.params.product_id }); 
            if (!images.length) {
                return res.status(404).json({ message: 'No images found for this product' });
            }
            res.status(200).json(images);
        } catch (error) {
            console.error('Error fetching images by product_id:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Add a new image
    addImage: async (req, res) => {
        try {
            const {product_id} = req.body;
            const productUrl = req.file ? `http://localhost:4000/${req.file.path.replace(/\\/g, '/')}` : '';

            const newImage = new Image({product_id,image_url: productUrl}); 
            await newImage.save(); 
            res.status(200).json(newImage); 
        } catch (error) {
            console.error('Error adding image:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Update an image by image_id
    updateImage: async (req, res) => {
        try {
            const image = await Image.findOneAndUpdate(
                { _id: req.params._id },
                req.body,
                { new: true } 
            );
            if (!image) {
                return res.status(404).json({ message: 'Image not found' });
            }
            res.status(200).json(image);
        } catch (error) {
            console.error('Error updating image:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Delete an image by image_id
    deleteImage: async (req, res) => {
        try {
            const image = await Image.findOneAndDelete({ _id: req.params._id }); 
            if (!image) {
                return res.status(404).json({ message: 'Image not found' });
            }
            res.status(204).send(); 
        } catch (error) {
            console.error('Error deleting image:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = imageController;