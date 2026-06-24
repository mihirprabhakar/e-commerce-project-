const express=require("express");
const categoryController=require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const router=express.Router();

// @GET all categories
router.get("/",categoryController.getCategories);

// @GET categories by id
router.get("/:id",categoryController.getCategoryById);

// @POST create a new category
router.post("/",authMiddleware, allowRoles("admin", "vendor"),categoryController.createCategory);

// @put update a category   
router.put("/:id",authMiddleware, allowRoles("admin", "vendor"),categoryController.updateCategory);

// @delete delete a category
router.delete("/:id",authMiddleware, allowRoles("admin", "vendor"),categoryController.deleteCategory);

module.exports=router;
