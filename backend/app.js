const express = require("express")
const HttpError = require("./models/http-error")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const { createPlace } = require("./controller/placeController")
const placeRoute = require("./routes/placeRoute")
const userRoute = require("./routes/userRoute")
const bodyParser = require("body-parser")
const fs = require("fs")
const path = require("path")
const { initializeApp } = require("firebase/app")
const { getStorage } = require("firebase/storage")
dotenv.config()
const firebaseConfig = {
  apiKey: "AIzaSyAgaXlXv6dulYg-6IhXhT3PPAPfyXh8vgY",
  authDomain: "hopefully-can.firebaseapp.com",
  projectId: "hopefully-can",
  storageBucket: "hopefully-can.appspot.com",
  messagingSenderId: "412614367607",
  appId: "1:412614367607:web:72a42661d9885dfdcd2972",
}

initializeApp(firebaseConfig)

const app = express()

app.use(express.static(path.join(__dirname, "../", "build")))
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")

  next()
})

app.use("/api/places", placeRoute)
app.use("/api/users", userRoute)

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "build", "index.html"))
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500).json({ message: error.message })
})

mongoose
  .connect(process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASS))
  .then((res) => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("success start server & connected to database")
    })
  })
  .catch((err) => {
    console.log(err)
  })
