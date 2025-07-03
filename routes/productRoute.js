const express = require('express');
const router = express.Router();
const actions = require("../controllers/productController")

router.post('/', actions.addProduct);
module.exports = router