const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const upload=require("../middlewares/upload.middleware");




// @GET all products
router.get("/",productController.getAllProducts);

// @GET product by id
router.get("/:id",productController.getProductById);


// admin protected route

// @POST create product 
router.post("/",authMiddleware, allowRoles("admin", "vendor"),upload.single("image"),productController.createProduct);

// @post bulk insert products
router.post("/bulk-insert",authMiddleware, allowRoles("admin", "vendor"),productController.bulkInsertProducts);

// @PUT update product 
router.put("/:id",authMiddleware, allowRoles("admin", "vendor"),productController.updateProduct);

// @Delete delete the product
router.delete("/:id",authMiddleware, allowRoles("admin", "vendor"),productController.deleteProduct);



module.exports = router;