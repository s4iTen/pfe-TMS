const mongoose = require("mongoose");

const maintainerSchema = new mongoose.Schema(
  {
    image: {
      type: [String],
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Maintainer = mongoose.model("Maintainer", maintainerSchema);
module.exports = Maintainer;
