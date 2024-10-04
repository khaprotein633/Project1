const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const productRoute = require('./routes/product'); 
const brandRoute = require('./routes/brand');
const userRoute = require('./routes/user');
const  connectDB  = require('./config/db');
dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

// Kết nối route
app.use('/brands', brandRoute); // Route cho thương hiệu
app.use('/users',userRoute);
app.use('/products',productRoute);

app.listen(4000, () => {
    connectDB();
    console.log("Server is running... ");
});
