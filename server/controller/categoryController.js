const Category = require('../model/Category');

const categoryController = {
    
    getAllCategories: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; 
            const size = parseInt(req.query.size) || 5; 
            const skip = (page - 1) * size; 

            const list = await Category.find({}).skip(skip).limit(size); 
            const total = await Category.countDocuments();


            res.status(200).json({list,total});
        } catch (error) {
            res.status(500).json({ message: 'Error fetching categories', error: error.message });
        }
    },
    getAllCate: async (req, res) => {
        try {
            const list = await Category.find({})
            res.status(200).json({list});
        } catch (error) {
            res.status(500).json({ message: 'Error fetching categories', error: error.message });
        }
    },

    // Add a new category
    addCategory: async (req, res) => {
        try {
            const {category_name} = req.body;
            // Check if category already exists
            const existingCategory = await Category.findOne({ category_name});
            if (existingCategory) {
                return res.status(400).json({ message: 'Category already exists' });
            }

            const newCategory = new Category({category_name});
            await newCategory.save();

            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ message: 'Error adding category', error: error.message });
        }
    },

    // Get category by category_id
    getCategoryById: async (req, res) => {
        try {
            const category = await Category.findOne({ category_id: req.params.category_id });
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching category', error: error.message });
        }
    },

    // Update category by category_id
    updateCategory: async (req, res) => {
        try {
            const {_id } = req.params;
            const { category_name, parent_id } = req.body;

            const updatedCategory = await Category.findOneAndUpdate(
                {_id },
                { category_name, parent_id },
                { new: true }
            );

            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json({ message: 'Error updating category', error: error.message });
        }
    },

    // Delete category by category_id
    deleteCategory: async (req, res) => {
        try {
            
            const deletedCategory = await Category.findOneAndDelete({_id:req.params._id });

            if (!deletedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting category', error: error.message });
        }
    }
};

module.exports = categoryController;
