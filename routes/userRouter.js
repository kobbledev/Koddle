const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const CountryController = require("../controllers/CountryController");


router.get('/signUp', AuthController.signUp);
router.get("/countryCode", CountryController.getCountryCodes)

module.exports = router;
