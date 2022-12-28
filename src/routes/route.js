const express= require('express');
const router= express.Router();

const userController= require('../constrollers/userController');
const middleWare=require("../middleWare/auth");

router.post('/signUpUser', userController.signUpUser);
router.post('/loginUser', userController.login);
router.get('/getUser', middleWare.authenticate, userController.getUser);
router.put('/updateUser', middleWare.authenticate, userController.updateUser);
router.put('/updatePassword', middleWare.authenticate, userController.updatePassword);


module.exports= router;