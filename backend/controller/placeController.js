const { default: axios } = require("axios")
const Place = require("../models/placeModel")
const HttpError = require("../models/http-error")
const User = require("../models/userModel")
const fs = require("fs")
const uuid = require("uuid").v1

const { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } = require("firebase/storage")

exports.createPlace = async (req, res, next) => {
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
  const { title, description, imageUrl, address } = req.body
  const result = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaGlybzk5IiwiYSI6ImNraDA2ZmxsMzFhcjAydG9ld3B0azlrZHMifQ.Ubz7JOv5qvhB6YB1j_1QNA`
  )
  const coordinate = result.data.features[0].geometry.coordinates
  const lng = coordinate[0]
  const lat = coordinate[1]

  const newPlace = new Place({
    title,
    description,
    imageUrl: url,
    imagePath: storageRef._location.path_,
    address,
    location: {
      lat,
      lng,
    },
    creator: req.userData.userId,
  })

  const user = await User.findOne({ _id: req.userData.userId })
  if (user) {
    await newPlace.save()
    user.places.push(newPlace._id)
    await user.save()
    res.status(201).json({ place: newPlace })
  }
}

exports.deletePlace = async (req, res, next) => {
  const id = req.params.id
  const place = await Place.findOne({ _id: id })
  if (place) {
    const storage = getStorage()
    const storageRef = ref(storage, place.imagePath)
    await deleteObject(storageRef)
    await place.deleteOne()
    await User.findOneAndUpdate({ _id: place.creator }, { $pull: { places: place._id } })

    res.status(200).json({ message: "deleted place" })
  }
}
exports.getMyPlace = async (req, res, next) => {
  const userId = req.params.userId
  if (userId) {
    try {
      const place = await Place.find({ creator: userId })

      res.status(200).json(place)
    } catch (error) {
      const err = new HttpError("your not logged in", 500)
      return next(err)
    }
  } else {
    const error = new HttpError("your not logged in", 500)
    return next(error)
  }
}

exports.updatePlace = async (req, res, next) => {
  const id = req.params.id
  const { title, description } = req.body
  try {
    if (id) {
      await Place.findOneAndUpdate(id, { title, description })
      res.status(200).json({ message: "success updated" })
    }
  } catch (error) {}
}
