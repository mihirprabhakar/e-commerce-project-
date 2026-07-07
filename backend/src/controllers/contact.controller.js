const Contact = require("../models/contact.model");

// @GET /api/contact

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ isActive: true });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "contact data not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "contact data fetched successfully",
      data: contact
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @POST /api/contact
exports.createContact = async (req, res) => {
  try {
    const existing = await Contact.findOne();
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "contact data already exists"
      });
    }

    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: "contact data created successfully",
      data: contact
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @PUT /api/contact

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { isActive: true },
      req.body,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "contact data not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "contact data updated successfully",
      data: contact
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};