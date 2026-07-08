const Terms = require("../models/terms.model");

// @GET /api/terms

exports.getTerms = async (req, res) => {
  try {
    const terms = await Terms.findOne({ isActive: true });

    if (!terms) {
      return res.status(404).json({
        success: false,
        message: "terms data not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "terms data fetched successfully",
      data: terms
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @POST /api/terms

exports.createTerms = async (req, res) => {
  try {
    const existing = await Terms.findOne();
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "terms data already exists try update instead."
      });
    }

    const terms = await Terms.create(req.body);

    res.status(201).json({
      success: true,
      message: "terms data created successfully",
      data: terms
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @PUT /api/terms

exports.updateTerms = async (req, res) => {
  try {
    const terms = await Terms.findOneAndUpdate(
      { isActive: true },
      req.body,
      { new: true }
    );

    if (!terms) {
      return res.status(404).json({
        success: false,
        message: "terms data not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "terms data updated successfully",
      data: terms
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};