const express = require('express');
const router = express.Router();
const actions = require("../controllers/userController")

router.post('/register', actions.register);
router.post('/lgin', actions.login);
module.exports = router