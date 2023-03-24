const express = require("express")
const {
  createPlace,
  deletePlace,
  getMyPlace,
  updatePlace,
  uploadImageController,
} = require("../controller/placeController")
const checkAuth = require("../middleware/checkAuth")
const fileUpload = require("../middleware/fileUpload")

const router = express.Router()

router.get("/:userId", getMyPlace)
router.use(checkAuth)
router.post("/", fileUpload.single("image"), createPlace)
router.delete("/:id", deletePlace)
router.patch("/:id", updatePlace)
module.exports = router
