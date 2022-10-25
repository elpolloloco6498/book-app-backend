const express = require("express")
const router = express.Router()
const controller = require("../controllers/bookController")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(path.join(__dirname, "../uploads"))
        if(!fs.existsSync(path.join(__dirname, "../uploads"))) {
          console.log("creating folder upload")
          fs.mkdirSync(path.join(__dirname, "../uploads"))
        }
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
const upload = multer({storage: storage})

router.get("/", controller.getAllBooks)
router.post("/", upload.single("bookImg"), controller.addBook)
router.put("/:id", upload.single("bookImg"), controller.updateBook)
router.delete("/:id", controller.deleteBook)

module.exports = router