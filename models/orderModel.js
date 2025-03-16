const mongoose = require("mongoose");

//schema
const ordersSchema = new mongoose.Schema(
  {
    foods: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Foods", required: true },
    ],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["preparing", "prepare", "on the way", "deliverd"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Orders", ordersSchema);
