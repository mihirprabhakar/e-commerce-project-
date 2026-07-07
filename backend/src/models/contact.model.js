const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, default: null },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    mapLink: { type: String, default: null },
    supportHours: { type: String, required: true },
    socialLinks: {
      facebook: { type: String, default: null },
      instagram: { type: String, default: null },
      twitter: { type: String, default: null },
      linkedin: { type: String, default: null }
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);