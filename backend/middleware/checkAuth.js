const jwt = require("jsonwebtoken")
const HttpError = require("../models/http-error")
const checkAuth = (req, res, next) => {
  if (req.method == "OPTIONS") {
    return next()
  }
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      throw new HttpError("token authentication fail", 401)
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    req.userData = { userId: decoded.userId }
    next()
  } catch (error) {
    const err = new HttpError("token authentication fail please refresh", 401)
    console.log(error)
    return next(err)
  }
}

module.exports = checkAuth
