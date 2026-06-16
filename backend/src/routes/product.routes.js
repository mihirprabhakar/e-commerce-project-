const express = require("express");
const productController = require("../controllers/product.controller");

const router = express.Router();

// @GET all products
router.get("/",productController.getAllProducts);

// @GET product by id
router.get("/:id",productController.getProductById);

// @POST create product 
router.post("/",productController.createProduct);

// @PUT update product 
router.put("/:id",productController.updateProduct);

// @Delete delete the product
router.delete("/:id",productController.deleteProduct);

// @post bulk insert products
router.post("/bulk-insert",productController.bulkInsertProducts);

module.exports = router;