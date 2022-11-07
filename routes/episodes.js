var express = require('express');
var router = express.Router();
const episodesCtrl = require('../controllers/episode');

/* GET users listing. */
router.get('/', episodesCtrl.view);


module.exports = router;