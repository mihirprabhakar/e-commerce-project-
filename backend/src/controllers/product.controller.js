const Product = require("../models/product.model");
const Category = require("../models/category.model");

const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
};

// @GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate("categoryId", "name slug")
      .populate("vendorId", "name email");
    res.status(200).json({ success: true, message: "Products fetched successfully", data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("categoryId", "name slug")
      .populate("vendorId", "name email");
    if (!product || !product.isActive) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product fetched successfully", data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, discount, tax, stock, categoryId } = req.body;

    if (!name) return res.status(400).json({ success: false, message: "Product name is required" });
    if (!price || price <= 0) return res.status(400).json({ success: false, message: "Price must be greater than 0" });
    if (stock < 0) return res.status(400).json({ success: false, message: "Stock cannot be negative" });
    if (!categoryId) return res.status(400).json({ success: false, message: "Category is required" });

    const category = await Category.findById(categoryId);
    if (!category || !category.isActive) {
      return res.status(400).json({ success: false, message: "Category not found or inactive" });
    }

    const slug = generateSlug(name);

    // vendorId comes from JWT token, NOT from frontend
    const product = await Product.create({
      name, slug, description, price, discount, tax, stock,
      categoryId,
      vendorId: req.user._id
    });

    res.status(201).json({ success: true, message: "Product created successfully", data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, discount, tax, stock, categoryId } = req.body;

    if (price !== undefined && price <= 0) {
      return res.status(400).json({ success: false, message: "Price must be greater than 0" });
    }
    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ success: false, message: "Stock cannot be negative" });
    }

    const updateData = { description, price, discount, tax, stock, categoryId };
    if (name) { updateData.name = name; updateData.slug = generateSlug(name); }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, message: "Product updated successfully", data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @DELETE /api/products/:id (soft delete)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Bulk insert (keep existing)
exports.bulkInsertProducts = async (req, res) => {
  try {
    const { vendorId, key, parameter } = req.body;
    if (!vendorId || !key) {
      return res.status(400).json({ success: false, message: "vendorId and key are required" });
    }
    if (!Array.isArray(parameter) || parameter.length === 0) {
      return res.status(400).json({ success: false, message: "parameter must be a non-empty array" });
    }
    var products = [];
    for (var i = 0; i < parameter.length; i++) {
      var product = parameter[i];
      product.vendorId = vendorId;
      products.push(product);
    }
    var result = await Product.insertMany(products);
    res.status(201).json({ success: true, message: result.length + " products inserted successfully", totalInserted: result.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};