var express = require("express");
var router = express.Router();
const Author = require("../models/author");
const isLoggedIn = require("../config/auth");

// all authors route
router.get("/", isLoggedIn, async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render("authors/index", { 
            authors: authors, 
            searchOptions: req.query })
    } catch {
        res.redirect("/")
    }
    
});
// New Author Route(displaying the form)
router.get('/new', isLoggedIn, (req, res) => {
    res.render('authors/new', { author: new Author() })
});

// creates new authors route
router.post("/", async (req, res) => {
    const author = new Author({
        // explicitly passing name so the user cant enter something else and reset things, like id
        name: req.body.name
    })
    try {
        // saving new author after saving the author in db
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render("authors/new", {
            author: author, 
        })
    }
});

router.get('/:id', (req, res) => {
    res.send('Show Author ' + req.params.id)
});

router.get('/:id/edit', (req, res) => {
    res.send('Edit Author ' + req.params.id)
});

router.put('/:id', (req, res) => {
    res.send('Update Author ' + req.params.id)
});

router.delete('/:id', (req, res) => {
    res.send('Delete Author ' + req.params.id)
});


module.exports = router;