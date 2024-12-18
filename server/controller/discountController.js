const Discount = require('../model/Discount');

const discountController = {
    // Lấy tất cả discount (phân trang)
    getAllDiscounts: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; 
            const size = parseInt(req.query.size) || 5; 
            const skip = (page - 1) * size;

            const discounts = await Discount.find({})
                .skip(skip)
                .limit(size)
                .sort({ start_date: -1 }); // Sắp xếp giảm giá theo ngày bắt đầu (mới nhất trước)

            const total = await Discount.countDocuments();

            res.status(200).json({ discounts, total });
        } catch (error) {
            console.error('Error fetching discounts:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Lấy thông tin chi tiết của một discount
    getDiscountById: async (req, res) => {
        try {
            const discount = await Discount.findById(req.params.id);
            if (!discount) {
                return res.status(404).json({ message: 'Discount not found' });
            }
            res.status(200).json({discount});
        } catch (error) {
            console.error('Error fetching discount by ID:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Thêm mới một discount
    createDiscount: async (req, res) => {
        try {
            const { discount_name, discount_percentage, start_date, end_date } = req.body;

            // Tạo discount mới
            const newDiscount = new Discount({
                discount_name,
                discount_percentage,
                start_date,
                end_date,
            });

            await newDiscount.save();
            res.status(201).json({ message: 'Discount created successfully', newDiscount });
        } catch (error) {
            if (error.code === 11000) {
                // Lỗi trùng tên (unique index)
                return res.status(400).json({ message: 'Discount name already exists' });
            }
            console.error('Error creating discount:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Cập nhật một discount
    updateDiscount: async (req, res) => {
        try {
            const { _id } = req.params;
            const { discount_name, discount_percentage, start_date, end_date } = req.body;

            const updatedDiscount = await Discount.findByIdAndUpdate(
                _id,
                { discount_name, discount_percentage, start_date, end_date },
                { new: true, runValidators: true } // Trả về bản ghi sau khi cập nhật, kiểm tra validation
            );

            if (!updatedDiscount) {
                return res.status(404).json({ message: 'Discount not found' });
            }

            res.status(200).json({ message: 'Discount updated successfully', updatedDiscount });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(400).json({ message: 'Discount name already exists' });
            }
            console.error('Error updating discount:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Xóa một discount
    deleteDiscount: async (req, res) => {
        try {
            const { _id } = req.params;
            const deletedDiscount = await Discount.findByIdAndDelete(_id);

            if (!deletedDiscount) {
                return res.status(404).json({ message: 'Discount not found' });
            }

            res.status(200).json({ message: 'Discount deleted successfully', deletedDiscount });
        } catch (error) {
            console.error('Error deleting discount:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

module.exports = discountController;
