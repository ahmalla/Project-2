var express = require("express");
var router = express.Router();
var multer = require("multer");
const Book = require("../models/book");
const Author = require("../models/author")


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
router.post("/", isLoggedIn, async (req, res) => {
  res.send("Create Book")
});

module.exports = router;