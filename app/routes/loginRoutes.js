const express = require("express");
const router = express.Router()

// importing controllers
const {validateLogin, registerUser, validateUser} = require('../controllers/userController')

router.route('/login').post(validateLogin);
router.route('/register').post(registerUser);
router.route('/validateUser').post(validateUser);

module.exports = router;