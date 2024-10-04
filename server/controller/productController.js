const { model } = require('mongoose');
const Product = require('../model/Product');
const { response } = require('express');

const productController = {
    // Thêm sản phẩm 
    addProduct: async (req, res) => {
        try {
            const newProduct = new Product(req.body);
            await newProduct.save(); // Lưu sản phẩm mới vào cơ sở dữ liệu
            res.status(201).json(newProduct); // Trả về sản phẩm vừa thêm
        } catch (error) {
            res.status(500).json({ message: 'Failed to add product', error: error.message });
        }
    },

    // Lấy danh sách sản phẩm
    getProducts: async (req, res) => {
        try {
            const products = await Product.find(); // Lấy tất cả sản phẩm
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
        }
    },

    // Lấy sản phẩm theo ID
    getProductById: async (req, res) => {
        try {
            const product = await Product.findOne({product_id: req.params.id}); // Tìm sản phẩm theo ID
            if (!product) {
                return res.status(404).json({ message: 'Product not found' }); // Trả về thông báo nếu không tìm thấy sản phẩm
            }
            res.status(200).json(product); // Trả về sản phẩm
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve product', error: error.message });
        }
    },

    // Cập nhật sản phẩm
    updateProduct: async (req, res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Cập nhật sản phẩm và trả về sản phẩm mới
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' }); // Trả về thông báo nếu không tìm thấy sản phẩm
            }
            res.status(200).json(updatedProduct); // Trả về sản phẩm đã cập nhật
        } catch (error) {
            res.status(500).json({ message: 'Failed to update product', error: error.message });
        }
    },

    // Xóa sản phẩm
    deleteProduct: async (req, res) => {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id); // Xóa sản phẩm theo ID
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' }); // Trả về thông báo nếu không tìm thấy sản phẩm
            }
            res.status(200).json({ message: 'Product deleted successfully' }); // Trả về thông báo thành công
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete product', error: error.message });
        }
    }
};

module.exports = productController;
