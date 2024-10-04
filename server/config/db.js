const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connect Successful to database:', connection.connections[0].name);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};  

module.exports = connectDB;