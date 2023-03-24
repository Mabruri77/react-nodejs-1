const multer = require("multer")
const uuid = require("uuid").v1
const path = require("path")
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
}

const fileUpload = multer({
  limits: 500000,
  storage: multer.memoryStorage(),

  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype]
    const error = isValid ? null : new Error("invalid mime type")
    cb(error, isValid)
  },
})

module.exports = fileUpload
