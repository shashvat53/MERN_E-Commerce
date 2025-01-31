const mongoose = require("mongoose");

const addToCartSchema = new mongoose.Schema(
  {
    productId: {
      ref: "Product",
      type: String,
    },
    quantity: Number,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const addToCartModel = mongoose.model("AddToCart", addToCartSchema);
module.exports = addToCartModel;
