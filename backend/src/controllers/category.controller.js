const Category = require("../models/category.model");

// Generate slug from name
const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
};

// @POST /api/categories
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ success: false, message: "Category name already exists" });
    }

    const slug = generateSlug(name);
    const category = await Category.create({ name, slug, description });

    res.status(201).json({ success: true, message: "Category created successfully", data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.status(200).json({ success: true, message: "Categories fetched successfully", data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @GET /api/categories/:id
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category || !category.isActive) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, message: "Category fetched successfully", data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @PUT /api/categories/:id
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updateData = { description };

    if (name) {
      updateData.name = name;
      updateData.slug = generateSlug(name);
    }

    const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, message: "Category updated successfully", data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @DELETE /api/categories/:id (soft delete)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};