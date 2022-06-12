const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const CountryController = require("../controllers/CountryController");
const checkAuth = require('../middlewares/checkAuth')


router.post('/signUp', AuthController.createNewUser);
router.post('/verify',AuthController.verifyOtp)
router.get('/countryCode', CountryController.getCountryCodes)
router.post('/login',AuthController.loginWithPhoneOtp)
router.get('/name', checkAuth ,AuthController.username)
router.get('/user',checkAuth,AuthController.getUser)
router.post('/addAddress',checkAuth,AuthController.addAddress)

module.exports = router;
