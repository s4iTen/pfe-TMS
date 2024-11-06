const mongoose = require("mongoose");

const expenceSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "propreties",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  maintainer: {
    type: mongoose.Schema.Types.ObjectId,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("Expence", expenceSchema);
