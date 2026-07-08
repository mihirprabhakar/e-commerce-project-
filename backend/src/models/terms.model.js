const mongoose = require("mongoose");

const termsSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

const termsSchema = new mongoose.Schema(
  {
    pageTitle: { type: String, required: true },
    lastUpdated: { type: String, required: true },
    introduction: { type: String, required: true },
    sections: [termsSectionSchema],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Terms", termsSchema);