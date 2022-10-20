const mongoose = require("mongoose")

// define a schema

const booksSchema = new mongoose.Schema({
    id: String,
    name: String,
    author: String,
    date: String,
    genre: String,
    bookImg: String
})

module.exports = mongoose.model("Books", booksSchema)