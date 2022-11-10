var express = require("express");
var router = express.Router();
const Book = require("../models/book");

router.get("/", function(req, res, next) {
    res.send('We are on books page')
});

router.get("/", async (req, res) => {
    const book = new Book({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        publishDate: req.body.publishDate
    })
    try{
    const savedBook = await book.save();
    res.json(savedBook);
    }catch(err) {
        res.json ({ message: err})
    }
});
  

module.exports = router;