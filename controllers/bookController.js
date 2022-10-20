const { default: mongoose } = require("mongoose")
const Books = require("../model/bookSchema")

const addBook = async(req, res) => {
    const bookData = req.body
    bookData.bookImg = req.file.path
    console.log(bookData)
    const book = await new Books(bookData).save()
    res.send(book)
}

const updateBook = async(req, res) => {
    // delete previous image in uploads
    const bookUpdated = req.body
    bookUpdated.bookImg = req.file.path
    const book = await Books.findOneAndUpdate(
        {"_id": req.params.id},
        bookUpdated,
        {returnOriginal: false}
    )
    res.send(book)
}

const deleteBook = async(req, res) => {
    // delete image in uploads
    await Books.deleteOne({"_id": req.params.id})
    res.status(200).json("Book deleted")
}

const getAllBooks = async(req, res) => {
    const listBooks = await Books.find({})
    //console.log(listBooks)
    res.status(200).json(listBooks)
}

module.exports = {
    addBook, 
    updateBook, 
    deleteBook, 
    getAllBooks
}