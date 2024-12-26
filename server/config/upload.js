const multer = require('multer');
const path = require('path');

// Cấu hình lưu trữ cho multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Đường dẫn nơi tệp sẽ được lưu
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Đặt tên tệp
  },
});

// Tạo một multer middleware
const upload = multer({ storage: storage });

module.exports = upload;
