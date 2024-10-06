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
            const images = await Image.find({ product_id: req.params.product_id }); // Lấy hình ảnh theo product_id
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
            const newImage = new Image(req.body); // Tạo hình ảnh mới
            await newImage.save(); // Lưu vào database
            res.status(201).json(newImage); // Trả về hình ảnh mới được thêm
        } catch (error) {
            console.error('Error adding image:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Update an image by image_id
    updateImage: async (req, res) => {
        try {
            const image = await Image.findOneAndUpdate(
                { _id: req.params.image_id },
                req.body,
                { new: true } // Trả về đối tượng sau khi cập nhật
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
            const image = await Image.findOneAndDelete({ _id: req.params.image_id }); // Xóa hình ảnh theo image_id
            if (!image) {
                return res.status(404).json({ message: 'Image not found' });
            }
            res.status(204).send(); // Không có nội dung trả về
        } catch (error) {
            console.error('Error deleting image:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = imageController;
