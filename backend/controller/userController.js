const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const HttpError = require("../models/http-error")
const jwt = require("jsonwebtoken")
const uuid = require("uuid").v1
const { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } = require("firebase/storage")
exports.register = async (req, res, next) => {
  const storage = getStorage()
  const storageRef = ref(
    storage,
    `react-nodejs/${uuid() + "." + req.file.originalname.split(".")[1]}`
  )
  const metadata = {
    ContentType: req.file.mimetype,
  }
  const snapshot = await uploadBytes(storageRef, req.file.buffer, metadata)
  const url = await getDownloadURL(snapshot.ref)
  const { name, email, password, confirmPassword, image } = req.body
  if (password == confirmPassword) {
    const newPass = await bcrypt.hash(password, 10)
    const createdUser = User({
      name,
      email,
      password: newPass,
      image: url,
      places: [],
    })

    await createdUser.save()
    res.status(201).json({ user: createdUser })
  } else {
    const err = new HttpError("password and confirm password does not match", 400)
    return next(err)
  }
}

exports.login = async (req, res, next) => {
  let token
  const { email, password } = req.body
  const user = await User.findOne({ email })
  token = jwt.sign({ userId: user._id, email: user.email }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  })

  if (user) {
    const compare = await bcrypt.compare(password, user.password)
    if (compare) {
      res.status(200).json({ userId: user._id, token, email: user.email })
    } else {
      const err = new HttpError("invalid password", 400)
      return next(err)
    }
  } else {
    const err = new HttpError("user not found", 404)
    return next(err)
  }
}

exports.getAllUser = async (req, res) => {
  const users = await User.find({}, "-password")
  res.status(200).json({ users })
}
