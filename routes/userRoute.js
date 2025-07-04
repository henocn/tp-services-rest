const express = require('express');
const router = express.Router();
const actions = require("../controllers/userController")

router.post('/login', actions.login);
router.post('/register', actions.register);
router.post('/users', actions.getAllUsers);
module.exports = router