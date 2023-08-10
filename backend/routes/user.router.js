const express = require('express');
const joi = require('../utils/joi');
const userController = require('../controller/user.controller');
const router = express.Router();
const jwt = require('../utils/cryptAndJwt');


router.post('/signup',joi.phoneValidate,userController.signUp);

router.post('/verify',joi.contactValidate,userController.verify);

router.post('/profile',joi.userValidate,userController.profile);

module.exports = router;