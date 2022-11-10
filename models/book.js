const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    { 
        title: { 
            type: String,
            required: true
        }, 
        author: { 
            type: String,
            required: true
        }, 
        description: { 
            type: String,
            required: true
        },
        publishDate: { 
            type: Date,
            default: Date.now,
            required: true
        }, 
    })

    module.exports = mongoose.model("Book", bookSchema);