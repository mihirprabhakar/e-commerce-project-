const Product = require("../models/product.model");
const bulkInsertProducts = async (req, res) => {
  try {
    const { vendorId, key, parameter } = req.body;
    if (!vendorId || !key) {
      return res.send("invalid");
    }
    var products = [];
    for (var i = 0; i < parameter.length; i++) {
      var product = parameter[i];
      product.vendorId = vendorId;
      products.push(product);
    }
    var result = await Product.insertMany(products);
    res.send(result.length + " products inserted successfully");
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = { bulkInsertProducts };