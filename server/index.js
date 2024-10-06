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

// Kết nối route

const categoryRoute = require('./routes/category');
app.use('/api/categories', categoryRoute);

const brandRoute = require('./routes/brand');
app.use('/api/brand', brandRoute); 

const productRoute = require('./routes/product'); 
app.use('/api/product',productRoute);

const userRoute = require('./routes/user');
app.use('/user',userRoute);

const roleRoute = require('./routes/role');
app.use('/role',roleRoute);

const inventoryRoute = require('./routes/inventory');
app.use('/inventory',inventoryRoute);

const cartRoute = require('./routes/cart')
app.use('/cart',cartRoute);

const imageRoute = require('./routes/product_image');
app.use('/image',imageRoute);

const orderRoute = require('./routes/order');
app.use('/order',orderRoute);

const ODRoute = require('./routes/OD');
app.use('/OD',ODRoute);

const OSRoute = require('./routes/OS');
app.use('/OS',OSRoute);

const WLRoute = require('./routes/withlist');
app.use('/WL',WLRoute);

app.listen(4000, () => {
    connectDB();
    console.log("Server is running... ");
});
