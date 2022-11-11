var express = require("express");
var router = express.Router();
// allows to work with file forms ( our cover image feature)
var multer = require("multer");
var path = require("path");
const Book = require("../models/book");
const uploadPath = path.join("public")
const Author = require("../models/author")
const upload = multer({
    dest: 
})

// all books route
router.get("/", async (req, res) => {
    res.send("All Books")
    
    
});
// New book Route
router.get('/new', async (req, res) => {
   try {
    // get all authors
    const authors = await Author.find({})
    // create new book
    const book = new Book()
    // if no error
    res.render("books/new", {
        authors: authors,
        book: book
    })
   } catch {
    // if error redirect to books page
    res.redirect("/books")

   }
});

// create new books route
router.post("/", async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description
    })
});

module.exports = router;