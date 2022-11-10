var express = require("express");
var router = express.Router();
const Author = require("../models/author");

// all authors route
router.get("/", (req, res) => {
    res.render("authors/index")
});
// New Author Route(displaying the form)
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
});

// creates new authors route
router.post("/", (req, res) => {
    res.send("Create")
});

module.exports = router;