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


// bulk create
const bulkCreate = async(req, res) => {
    try {
        const products = req.body;
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'Invalid input data' });
        }
        const createdProducts = await Product.insertMany(products);
        res.status(201).json(createdProducts);
    } catch(error){
        res.status(500).json({ message: 'Error bulk creating products', error });
    }
}


// get all products
const getAllProducts = async (req, res) => {
    const tokenHeader = req.headers.authorization;
    console.log(tokenHeader)
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }  catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
}


// get one element
const getElementById = async(req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }
    try{
        const product = await Product.findById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }

    } catch (error) {
        console.log("An error occured");
        res.status(500).json({ message: 'Error fetching product', error });
    }
}


// Endpoint pour le put
const updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.log("An error occured");
        res.status(500).json({ message: 'Error updating product', error });
    }
}


// Endpoint pour le delete
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (product) {
            res.status(204).send({messge: "Product deleted succesfully"});
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.log("An error occured");
        res.status(500).json({ message: 'Error deleting product', error });
    }
}

module.exports = {addProduct, bulkCreate, getAllProducts, getElementById, updateProduct, deleteProduct};
