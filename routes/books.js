var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('We are on books page')
});

module.exports = router;