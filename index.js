const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');

const auth = require("./midleware/auth")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/products', auth, productRoute);
app.use('/users', userRoute);

connectDB();

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})