const mongoose = require("mongoose")

const Schema = mongoose.Schema

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imagePath: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
})

const Place = mongoose.model("Place", placeSchema)

module.exports = Place
