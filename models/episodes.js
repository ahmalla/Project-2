const mongoose = require("mongoose");
var plumbus = require('rickmortyapi')

const episodeSchema = new Schema({
    id: { type: Number },
    name: { type: String },
    air_date: { type: String },
    episode: { type: String},
    characters: { type: Array },
    url: { type: String}
})

module.exports = mongoose.model("Episode", episodeSchema);