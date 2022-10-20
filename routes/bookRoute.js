const express = require("express")
const router = express.Router()
const controller = require("../controllers/bookController")
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
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