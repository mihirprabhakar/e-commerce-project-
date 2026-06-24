const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },// useful urls 
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 1 },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0, min: 0 },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);