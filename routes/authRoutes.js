const express=require('express');

const authController=require('../controllers/authController')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const router=express.Router();

router.get('/signup',authController.signup_get);
router.post('/signup',jsonParser,authController.signup_post);
router.get('/login',authController.login_get);
router.post('/login',jsonParser, authController.login_post); 

module.exports=router; 