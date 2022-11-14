var express = require("express");
var router = express.Router();
// allows to work with file forms ( our cover image feature)
var multer = require("multer");
var path = require("path");
const Book = require("../models/book");
const uploadPath = path.join("public", Book.coverImagePath);
const Author = require("../models/author")
const imageTypes = ["images/jpeg", "images/png", "images/gif"];
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageTypes.includes(file.mimetype))
    }
})

// all books route
router.get("/", async (req, res) => {
    res.send("All Books")
    
    
});
// New book Route
router.get('/new', async (req, res) => {
  
});

// create new books route
router.post("/", upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        coverImageName: fileName,
        description: req.body.description
    })

    try {
        const newBook = await book.save()
        // res.redirect(`books/${newBook.id}`)
        res.redirect(`books`)
    } catch {

    }
});

async function renderNewPage(res, book) {
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
}

module.exports = router;