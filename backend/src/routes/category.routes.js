const express=require("express");
const categoryController=require("../controllers/category.controller");
const router=express.Router();

// @GET all categories
router.get("/",categoryController.getAllCategories);

// @POST create a new category
router.post("/",categoryController.createCategory);

// @put update a category   
router.put("/:id",categoryController.updateCategory);

// @delete delete a category
router.delete("/:id",categoryController.deleteCategory);

module.exports=router;