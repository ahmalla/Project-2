const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const episodeSchema = new Schema({
    id: { type: Number },
    name: { type: String },
    air_date: { type: String },
    episode: { type: String},
    characters: { type: [] },
    url: { type: String}
})

module.exports = mongoose.model("Episode", episodeSchema);