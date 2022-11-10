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
    const author = new Author({
        // explicitly passing name so the user cant enter something else and reset things, like id
        name: req.body.name
    })
    // saving new authors calling save method on author object
    author.save((err, newAuthor) => {
        if (err) {
            // if error render new page passing params on author page(handles dupes)
            res.render("authors/new", {
                author: author, 
            })
        } else {
            // if no error bring back to author page
            // res.redirect(`authors/${newAuthor.id}`)
            res.redirect('authors')
        }
    })
});

module.exports = router;