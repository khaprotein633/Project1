const User = require('../model/User');

const userController = {
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find(); // Lấy tất cả người dùng
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get a user by user_id
    getUserById: async (req, res) => {
        try {
            const user = await User.findOne({ user_id: req.params.user_id }); // Tìm người dùng theo user_id
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Add a new user
    addUser: async (req, res) => {
        try {
            const newUser = new User(req.body); // Tạo một đối tượng người dùng mới
            await newUser.save(); // Lưu người dùng vào cơ sở dữ liệu
            res.status(201).json(newUser); // Trả về người dùng mới được tạo
        } catch (error) {
            console.error('Error adding user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Update a user by user_id
    updateUser: async (req, res) => {
        try {
            const user = await User.findOneAndUpdate(
                { user_id: req.params.user_id }, // Tìm người dùng theo user_id
                req.body, // Dữ liệu để cập nhật
                { new: true } // Trả về người dùng đã được cập nhật
            );
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Delete a user by user_id
    deleteUser: async (req, res) => {
        try {
            const user = await User.findOneAndDelete({ user_id: req.params.user_id }); // Tìm và xóa người dùng
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(204).send(); // No content
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = userController;
