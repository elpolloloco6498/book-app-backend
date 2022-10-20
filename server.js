const express = require("express")
const app = express()
const cors = require('cors')
const bookRouter = require("./routes/bookRoute")
const mongoose = require("mongoose")
require("dotenv").config()
const port = process.env.PORT || 3000

const uri = "mongodb+srv://user:user@cluster0.ajoof.mongodb.net/bookManagement?retryWrites=true&w=majority";

// Connect to database
mongoose.connect(uri)
const db = mongoose.connection
db.once("open", ()=> {
    console.log("Connected")
})

app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"))
app.use("/books", bookRouter)

app.listen(port, ()=> {
    console.log(`Server runnning on port ${port}`)
})