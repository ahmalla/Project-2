const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coverImagePath = "uploads/bookCovers"

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    }
});



module.exports = mongoose.model("Book", bookSchema);
module.exports.coverImagePath = coverImagePath;