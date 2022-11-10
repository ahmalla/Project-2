var express = require("express");
var router = express.Router();

// all authors route
router.get("/", (req, res) => {
    res.render("authors/index")
});
// New Author Route(displaying the form)
router.get('/new', (req, res) => {
    res.render('authors/new')
});

// creates new authors route
router.post("/", (req, res) => {
    res.send("Create")
});

module.exports = router;