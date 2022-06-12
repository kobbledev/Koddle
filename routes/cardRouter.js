const express = require('express');
const router = express.Router();
const CardController = require("../controllers/CardController")
const checkAuth = require('../middlewares/checkAuth')


router.post('/saveSteps',checkAuth,CardController.saveSteps)
router.get('/get-cards',checkAuth,CardController.getCards)
router.post('/save-card',checkAuth,CardController.saveCard)
module.exports = router