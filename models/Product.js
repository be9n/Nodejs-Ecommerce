const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide the product name"],
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Please provide the product price"],
    },
    description: {
      type: String,
      maxLength: [1000, "Description can't be more than 1000 characters"],
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: true,
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 1,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

ProductSchema.methods.getImagePath = function () {
  const startIndex = this.image.indexOf("com/") + 4;
  return this.image.substring(startIndex);
};

module.exports = mongoose.model("Product", ProductSchema);
