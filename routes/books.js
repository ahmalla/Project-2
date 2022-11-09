var express = require("express");
var router = express.Router();

router.get('/books', (req, res) => {
    res.send('We are on books page')
});

module.exports = router;