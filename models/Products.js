const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    tags: { type: Array },
    photos: { type: Array },
    noOfReviews: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    }
  },
  { timestamps: true }
);
const Products = mongoose.model("Products", ProductSchema);
module.exports = Products;
