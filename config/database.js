const mongoose = require("mongoose");
require('dotenv').config();

const dbURI = process.env.DB_URI;

const connectDB = async () =>{
    try{
        await mongoose.connect(dbURI);
        console.log("Database connected successfully");
    }catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

module.exports = connectDB;