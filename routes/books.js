var express = require("express");
var router = express.Router();
const Book = require("../models/book");

// all books route
router.get("/", async (req, res) => {
    
    
});
// New book Route
router.get('/new', (req, res) => {
   
});

// create new books route
router.post("/", async (req, res) => {
    
});

module.exports = router;