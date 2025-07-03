const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})