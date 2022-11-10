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
router.post("/", async (req, res) => {
    const author = new Author({
        // explicitly passing name so the user cant enter something else and reset things, like id
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render("authors/new", {
            author: author, 
        })
    }
});

module.exports = router;