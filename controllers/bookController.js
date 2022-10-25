const { default: mongoose } = require("mongoose")
const Books = require("../model/bookSchema")
const {uploadFile, deleteFile} = require("../s3")

const fs = require("fs")

const addBook = async(req, res) => {
    const file = req.file
    const uploadFileInfo = await uploadFile(file)
    console.log(uploadFileInfo)
    const bookData = req.body
    bookData.bookImg = uploadFileInfo.Location
    bookData.key = uploadFileInfo.key

    // deleting temp file
    fs.unlink(file.path, ()=>{
        console.log("temp file deleted")
    })
    const book = await new Books(bookData).save()
    res.send(book)
}

const updateBook = async(req, res) => {
    const id = req.params.id
    const file = req.file
    const uploadFileInfo = await uploadFile(file)
    // deleting temp file
    fs.unlink(file.path, ()=>{
        console.log("temp file deleted")
    })
    console.log(uploadFileInfo)

    // get previous book
    const bookToDelete = await Books.findById(id);

    // updating book
    const bookUpdated = req.body
    bookUpdated.bookImg = uploadFileInfo.Location
    bookUpdated.key = uploadFileInfo.key
    const book = await Books.findOneAndUpdate(
        {"_id": id},
        bookUpdated,
        {returnOriginal: false}
    )

    // delete previous cover image in s3 bucket
    await deleteFile(bookToDelete.key)

    res.send(book)
}

const deleteBook = async(req, res) => {
    console.log("Deleting book...")
    const id = req.params.id

    // get key from id in database
    const bookToDelete = await Books.findById(id);

    // delete image in s3 bucket
    await deleteFile(bookToDelete.key)

    // delete database entry
    await Books.deleteOne({"_id": id})
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