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

            res.status(200).json({ users: listusers, total });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    
    getUserByEmailorPhonenumber: async (req, res) => {
        try {
            const searchTerm = req.query.search || ''; // Lấy từ khóa tìm kiếm từ query
    
            // Sử dụng $or để tìm theo email hoặc số điện thoại
            const query = {
                $or: [
                    { email: { $regex: searchTerm, $options: 'i' } }, // Tìm theo email
                    { phonenumber: { $regex: searchTerm, $options: 'i' } } // Tìm theo số điện thoại
                ]
            };
    
            const users = await User.find(query);
    
            if (!users || users.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.status(200).json({ users });
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    
    

    getUserById: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params._id });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user: user });
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    addUser: async (req, res) => {
        try {
            const { email, phoneNumber } = req.body;
    
            // Kiểm tra nếu email đã tồn tại
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: 'Email đã tồn tại' });
            }
    
            // Kiểm tra nếu số điện thoại đã tồn tại
            if (phoneNumber) {
                const existingPhone = await User.findOne({ phoneNumber });
                if (existingPhone) {
                    return res.status(400).json({ message: 'Số điện thoại đã tồn tại' });
                }
            }
    
            // Tạo người dùng mới
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error adding user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    

    updateUser: async (req, res) => {
        try {
            // Kiểm tra nếu email hoặc số điện thoại có thay đổi và đã tồn tại
            if (req.body.email) {
                const existingEmail = await User.findOne({ email: req.body.email });
                if (existingEmail && existingEmail._id.toString() !== req.params._id) {
                    return res.status(400).json({ message: 'Email đã tồn tại' });
                }
            }
    
            if (req.body.phoneNumber) {
                const existingPhone = await User.findOne({ phoneNumber: req.body.phoneNumber });
                if (existingPhone && existingPhone._id.toString() !== req.params._id) {
                    return res.status(400).json({ message: 'Số điện thoại đã tồn tại' });
                }
            }
    
            // Cập nhật người dùng
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
            const user = await User.findOneAndDelete({ _id: req.params._id }); // Tìm và xóa người dùng
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
            const user = await User.findOne({ email: req.body.email });
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
