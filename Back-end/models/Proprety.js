const mongoose = require("mongoose");

const propretiesSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bedrooms: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },
  rent: {
    type: Number,
  },
  adress: {
    type: String,
  },
  photos: {
    type: [String],
  },
  rentStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Propreties", propretiesSchema);
