const Image = require('../model/Product_Image');
const multer = require('multer');
const path = require('path');

// Cấu hình multer để lưu trữ file trong thư mục 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const imageController = {
    // Get all images
    getAllImages: async (req, res) => {
        try {
            const images = await Image.find();
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

    // Add a new image and save file to 'uploads' folder
    addImage: async (req, res) => {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error uploading file' });
            }
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            try {
                const newImage = new Image({
                    product_id: req.body.product_id,
                    image_url: `/uploads/${req.file.filename}`,
                    is_primary: req.body.is_primary || false
                });
                await newImage.save();
                res.status(201).json(newImage);
            } catch (error) {
                console.error('Error adding image:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
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
