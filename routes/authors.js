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
        res.redirect(`authors/${newAuthor.id}`)
        // res.redirect(`authors`)
    } catch {
        res.render("authors/new", {
            author: author, 
        })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        res.render("authors/show", {
            author: author
        })
    } catch {
        res.redirect("/")
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        res.render('authors/edit', { author: author })
    } catch {
        res.redirect("/authors")
    }
});
// Edit author route
router.put('/:id', async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        // saving new author after saving the author in db
        await author.save()
        res.redirect(`/authors/${author.id}`)
        // res.redirect(`authors`)
    } catch {
        if (author == null) {
            res.redirect("/")
        } else {
        res.render("authors/edit", {
            author: author, 
        })
    }
    }
})

router.delete('/:id', async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        // saving new author after saving the author in db
        await author.remove()
        res.redirect("/authors")
        // res.redirect(`authors`)
    } catch {
        if (author == null) {
            res.redirect("/")
        } else {
        res.redirect(`/authors/${author.id}`)
        }
        }
    })

module.exports = router;