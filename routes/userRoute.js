const express = require('express');
const router = express.Router();
const actions = require("../controllers/userController")

router.post('/', actions.getAllUsers);
router.post('/login', actions.login);
router.post('/register', actions.register);
router.put('/users/:id', actions.updateUser);
module.exports = router;