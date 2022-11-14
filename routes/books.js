var express = require("express");
var router = express.Router();
// allows to work with file forms ( our cover image feature)
var multer = require("multer");
var path = require("path");
var fd = require("fs")
const Book = require("../models/book");
const uploadPath = path.join("public", Book.coverImagePath);
const Author = require("../models/author")
// default image types we will accept for cover image
const imageTypes = ["images/jpeg", "images/png", "images/gif"];
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageTypes.includes(file.mimetype))
    }
})

// all books route
router.get('/', async (req, res) => {
    let query = Book.find()
    if (req.query.title != null && req.query.title != '') {
      query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
      query = query.lte('publishDate', req.query.publishedBefore)
    }
    if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
      query = query.gte('publishDate', req.query.publishedAfter)
    }
    try {
      const books = await query.exec()
      res.render('books/index', {
        books: books,
        searchOptions: req.query
      })
    } catch {
      res.redirect('/')
    }
  })
// New book Route
router.get('/new', async (req, res) => {
    renderNewPage(res, new Book())
});

// create new books route
router.post('/', upload.single('cover'), async (req, res) => {
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
      if (book.coverImageName != null) {
        removeBookCover(book.coverImageName)
      }
      renderNewPage(res, book, true)
    }
  })
  
  function removeBookCover(fileName) {
    fs.unlink(path.join(uploadPath, fileName), err => {
      if (err) console.error(err)
    })
  }

async function renderNewPage(res, book,) {
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