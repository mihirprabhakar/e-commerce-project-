const About = require("../models/about.model");

// @GET /api/about
exports.getAbout=async (req, res)=>{
  try {
    const about=await About.findOne({ isActive: true });
    if(!about){
      return res.status(404).json({
        success: false,
        message: "about data not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "about data fetched successfully",
      data: about
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @POST /api/about

exports.createAbout = async(req, res)=>{
  try {
    const existing=await About.findOne();
    if(existing)
    {
      return res.status(400).json({
        success: false,
        message: "about data already exists use update instead."
      });
    }

    const about=await About.create(req.body);
    res.status(201).json({
      success: true,
      message: "about data created successfully",
      data: about
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @PUT /api/about
// @desc Update about us data
// @access Private/Admin
exports.updateAbout = async (req, res) => {
  try {
    const about=await About.findOneAndUpdate(
      { isActive: true },
      req.body,
      { new: true }
    );
    if(!about){
      return res.status(404).json({
        success: false,
        message: "about data not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "about data updated successfully",
      data: about
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};