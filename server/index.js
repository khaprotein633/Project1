const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

const  connectDB  = require('./config/db');
dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

const path =require('path')
// Kết nối route

const categoryRoute = require('./routes/category');
app.use('/api/category', categoryRoute);

const brandRoute = require('./routes/brand');
app.use('/api/brand', brandRoute); 

const productRoute = require('./routes/product'); 
app.use('/api/product',productRoute);

const userRoute = require('./routes/user');
app.use('/api/user',userRoute);

const roleRoute = require('./routes/role');
app.use('/api/role',roleRoute);

const inventoryRoute = require('./routes/inventory');
app.use('/api/inventory',inventoryRoute);

const cartRoute = require('./routes/cart')
app.use('/api/cart',cartRoute);


const orderRoute = require('./routes/order');
app.use('/api/order',orderRoute);

const ODRoute = require('./routes/OD');
app.use('/api/orderdetail',ODRoute);

const OSRoute = require('./routes/OS');
app.use('/api/orderstatus',OSRoute);

const WLRoute = require('./routes/wishlist');
app.use('/api/wishlist',WLRoute);

const CommentRoute = require('./routes/comment');
app.use('/api/comment',CommentRoute);


const DiscountRoute = require('./routes/discount');
app.use('/api/discount',DiscountRoute);



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(4000, () => {
    connectDB();
    console.log("Server is running... ");
});
