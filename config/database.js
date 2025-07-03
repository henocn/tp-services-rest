const mongoose = require("mongoose");

const dbURI = process.env.DBR_URI

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