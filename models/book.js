const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    { 
        name: String,
        author: String,
        publishDate: Date,
        publishYear: Number,
    })

    module.exports = mongoose.model("Book", bookSchema);