const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    productId: {
      //indexing this depends on the use case, for this we can skip this and save as string.
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true
    },
    title: { type: String, required: true },
    description: { type: String },
    photos: { type: Array },
    rating: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);
const Reviews = mongoose.model("Reviews", ReviewSchema);
module.exports = Reviews;
