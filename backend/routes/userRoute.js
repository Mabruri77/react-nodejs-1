const express = require("express")
const { register, login, getAllUser } = require("../controller/userController")
const fileUpload = require("../middleware/fileUpload")
const router = express.Router()
router.post("/register", fileUpload.single("image"), register)
router.post("/login", login)
router.get("/", getAllUser)

module.exports = router
