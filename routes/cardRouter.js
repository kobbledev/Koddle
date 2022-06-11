const express = require('express');
const router = express.Router();
const CardController = require("../controllers/CardController")
const checkAuth = require('../middlewares/checkAuth')


router.post('/saveSteps',checkAuth,CardController.saveSteps)
module.exports = router