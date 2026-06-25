const User = require("../models/user.model");

// Validation helpers
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidMobile = (mobile) => /^[6-9][0-9]{9}$/.test(mobile);
const isValidGST = (gst) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(gst);
const isValidPincode = (pin) => /^[1-9][0-9]{5}$/.test(pin);

// @POST /api/users/register
exports.registerUser = async (req, res) => {
  try {
    const { name, businessName, email, mobileNo, gstNo, password, address, city, state, pincode, role } = req.body;

    // Required field checks
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    if (!mobileNo) {
      return res.status(400).json({ success: false, message: "Mobile number is required" });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    // Format validations
    if (!isValidEmail(email.trim().toLowerCase())) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }
    if (!isValidMobile(mobileNo.trim())) {
      return res.status(400).json({ success: false, message: "Invalid mobile number. Must be 10 digits starting with 6, 7, 8 or 9" });
    }
    if (gstNo && !isValidGST(gstNo.trim().toUpperCase())) {
      return res.status(400).json({ success: false, message: "Invalid GST number" });
    }
    if (pincode && !isValidPincode(pincode.trim())) {
      return res.status(400).json({ success: false, message: "Invalid pincode. Must be 6 digits" });
    }

    // Duplicate checks
    const existingEmail = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    const existingMobile = await User.findOne({ mobileNo: mobileNo.trim() });
    if (existingMobile) {
      return res.status(400).json({ success: false, message: "Mobile number already exists" });
    }
    if (gstNo) {
      const existingGST = await User.findOne({ gstNo: gstNo.trim().toUpperCase() });
      if (existingGST) {
        return res.status(400).json({ success: false, message: "GST number already exists" });
      }
    }

    const user = await User.create({
      name: name.trim(),
      businessName: businessName ? businessName.trim() : null,
      email: email.trim().toLowerCase(),
      mobileNo: mobileNo.trim(),
      gstNo: gstNo ? gstNo.trim().toUpperCase() : null,
      password,
      address: address || null,
      city: city || null,
      state: state || null,
      pincode: pincode || null,
      role: role || "customer"
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobileNo: user.mobileNo,
        gstNo: user.gstNo,
        role: user.role,
        isActive: user.isActive
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @GET /api/users — with pagination, search and filter
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, isActive } = req.query;

    const query = { deletedAt: null };

    // Search by name, email or mobile
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobileNo: { $regex: search, $options: "i" } }
      ];
    }

    // Filter by isActive
    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select("-password")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @GET /api/users/:id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, deletedAt: null }).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User fetched successfully", data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @PUT /api/users/:id
exports.updateUser = async (req, res) => {
  try {
    const { name, businessName, email, mobileNo, gstNo, address, city, state, pincode } = req.body;
    const userId = req.params.id;

    const user = await User.findOne({ _id: userId, deletedAt: null });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Validate and duplicate check email
    if (email) {
      if (!isValidEmail(email.trim().toLowerCase())) {
        return res.status(400).json({ success: false, message: "Invalid email address" });
      }
      const existing = await User.findOne({ email: email.trim().toLowerCase(), _id: { $ne: userId } });
      if (existing) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      }
      user.email = email.trim().toLowerCase();
    }

    // Validate and duplicate check mobile
    if (mobileNo) {
      if (!isValidMobile(mobileNo.trim())) {
        return res.status(400).json({ success: false, message: "Invalid mobile number" });
      }
      const existing = await User.findOne({ mobileNo: mobileNo.trim(), _id: { $ne: userId } });
      if (existing) {
        return res.status(400).json({ success: false, message: "Mobile number already exists" });
      }
      user.mobileNo = mobileNo.trim();
    }

    // Validate and duplicate check GST
    if (gstNo) {
      if (!isValidGST(gstNo.trim().toUpperCase())) {
        return res.status(400).json({ success: false, message: "Invalid GST number" });
      }
      const existing = await User.findOne({ gstNo: gstNo.trim().toUpperCase(), _id: { $ne: userId } });
      if (existing) {
        return res.status(400).json({ success: false, message: "GST number already exists" });
      }
      user.gstNo = gstNo.trim().toUpperCase();
    }

    if (name) user.name = name.trim();
    if (businessName) user.businessName = businessName.trim();
    if (address) user.address = address;
    if (city) user.city = city;
    if (state) user.state = state;
    if (pincode) user.pincode = pincode;

    await user.save();

    res.status(200).json({ success: true, message: "User updated successfully", data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @DELETE /api/users/:id — soft delete
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, deletedAt: null });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.deletedAt = new Date();
    user.isActive = false;
    await user.save();
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @PATCH /api/users/:id/status — activate or deactivate
exports.updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    if (isActive === undefined) {
      return res.status(400).json({ success: false, message: "isActive field is required" });
    }

    const user = await User.findOne({ _id: req.params.id, deletedAt: null });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.isActive = isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${isActive ? "activated" : "deactivated"} successfully`,
      data: { id: user._id, isActive: user.isActive }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};