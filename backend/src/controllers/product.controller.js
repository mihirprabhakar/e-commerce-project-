const mongoose=require("mongoose");
const Product = require("../models/product.model");



  exports.getAllProducts=(req,res)=>{
  res.json({
    success: true,
    message:"Product list Route is working"
  });
};

  exports.getProductById=(req,res)=>{
  res.json({
    success: true,
    message:"Product by id Route is working"
  });
};

exports.createProduct=(req,res)=>{
  res.json({
    success: true,
    message:"Create Product Route is working"
  });
};


exports.updateProduct=(req,res)=>{
  res.json({
    success: true,
    message:"Update Product Route is working"
  });
};

exports.deleteProduct=(req,res)=>{
  res.json({
    success: true,
    message:"Delete Product Route is working"
  });
};


exports.bulkInsertProducts= async (req,res)=>{
  try {
    const {vendorId,key,parameter}=req.body;
    if (!vendorId||!key){
      return res.status(400).json({ success: false, message: "vendorId and key are required" });
    }
    if (!Array.isArray(parameter)||parameter.length===0){
      return res.status(400).json({ success: false, message: "parameter must be a non-empty array" });
    }
    var products=[];
    for (var i=0;i<parameter.length;i++) {
      var product = parameter[i];
      product.vendorId = vendorId;
      products.push(product);
    }
    var result=await Product.insertMany(products);
    res.status(201).json({
      success: true,
      message: result.length + " products inserted successfully",
      totalInserted: result.length
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};







