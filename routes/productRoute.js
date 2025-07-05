const express = require('express');
const router = express.Router();
const actions = require("../controllers/productController")

router.post('/', actions.addProduct);
router.post('/bulk', actions.bulkCreate);
router.get('/', actions.getAllProducts);
router.get('/:id', actions.getElementById);
router.put('/:id', actions.updateProduct);
router.delete('/:id', actions.deleteProduct);
router.delete('/user_products', actions.getAllProductsByUserId);
module.exports = router