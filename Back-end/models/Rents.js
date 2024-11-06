const mongoose = require("mongoose");

const rentsSchema = new mongoose.Schema({
  userRent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Properties",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Rents", rentsSchema);
