const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    businessName: { type: String, trim: true, default: null },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    mobileNo: { type: String, required: true, unique: true, trim: true },
    gstNo: { type: String, default: null, trim: true },
    password: { type: String, required: true , minlength: 8},
    address: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    pincode: { type: String, default: null },
    role: { type: String, enum: ["admin", "vendor", "customer"], default: "customer" },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);