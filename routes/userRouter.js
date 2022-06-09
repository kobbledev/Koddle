const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const CountryController = require("../controllers/CountryController");
const checkAuth = require('../middlewares/checkAuth')


router.post('/signUp', AuthController.createNewUser);
router.post('/verify',AuthController.verifyOtp)
router.get("/countryCode", CountryController.getCountryCodes)
router.get('/users',checkAuth,CountryController.getCountryCodes)

module.exports = router;
