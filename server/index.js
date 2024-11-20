const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Chỉ định nguồn gốc được phép
}));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("common"));

const path = require('path')
// Kết nối route

const categoryRoute = require('./routes/category');
app.use('/api/category', categoryRoute);

const brandRoute = require('./routes/brand');
app.use('/api/brand', brandRoute);

const productRoute = require('./routes/product');
app.use('/api/product', productRoute);

const userRoute = require('./routes/user');
app.use('/api/user', userRoute);

const roleRoute = require('./routes/role');
app.use('/api/role', roleRoute);

const inventoryRoute = require('./routes/inventory');
app.use('/api/inventory', inventoryRoute);

const cartRoute = require('./routes/cart')
app.use('/api/cart', cartRoute);


const orderRoute = require('./routes/order');
app.use('/api/order', orderRoute);

const ODRoute = require('./routes/OD');
app.use('/api/OD', ODRoute);

const OSRoute = require('./routes/OS');
app.use('/api/OS', OSRoute);

const WLRoute = require('./routes/withlist');
app.use('/api/WL', WLRoute);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(4000, () => {
    connectDB();
    console.log("Server is running... ");
});
