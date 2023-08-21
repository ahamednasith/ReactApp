const express = require('express');
const joi = require('../utils/joi');
const userController = require('../controller/user.controller');
const router = express.Router();
const jwt = require('../utils/cryptAndJwt');


router.post('/signup',joi.phoneValidate,userController.signUp);

router.post('/verify',userController.verify);

router.post('/profile',joi.contactValidate,userController.profile);

router.get('/getprofile',jwt.verifyToken,userController.getProfile)

module.exports = router;