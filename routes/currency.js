var express = require('express');
var router = express.Router();
const currencyController = require('../controllers/currency');
router.get('/', currencyController.getAll);
router.post('/', currencyController.addCurr);

module.exports = router;