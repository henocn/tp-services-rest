const Product = require('../models/Product');

// add new product
const addProduct = async (req, res) => {
    try{
        const data = req.body;
        const product = new Product(data);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
}


// get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }  catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
}

module.exports = {addProduct, getAllProducts};
