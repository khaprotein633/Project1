const User = require('../model/User');

const userController = {
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là 1
            const size = parseInt(req.query.size) || 5; // Số mục trên mỗi trang, mặc định là 5
            const skip = (page - 1) * size; // Số mục cần bỏ qua

            const listusers = await User.find({}).skip(skip).limit(size); // Lấy tất cả người dùng

            const total = await User.countDocuments();

            res.status(200).json({users: listusers, total});
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get a user by user_id
    getUserById: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params._id }); // Tìm người dùng theo user_id
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({user: user});
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    addUser: async (req, res) => {
        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email đã tồn tại' ,success:false});
            }

            const newUser = new User({
                ...req.body
            });
            await newUser.save();
            res.status(201).json({
                newUser,
                success:true

            });
        } catch (error) {
            console.error('Error adding user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Update a user by user_id
    updateUser: async (req, res) => {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params._id },
                req.body,
                { new: true }
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
            const user = await User.findOneAndDelete({ _id:req.params._id}); // Tìm và xóa người dùng
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email }); // Tìm người dùng theo email
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (user.password !== req.body.password) {
                return res.status(401).json({ message: 'Password is not matching' });
            }

            const { password, ...userWithoutPassword } = user.toObject();
            res.status(200).json(userWithoutPassword);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

module.exports = userController;
