const express=require("express");
const authController=require("../controllers/auth.controller");
const router=express.Router();

//@ Post /api/auth/register
router.post("/register",authController.register);

//@ Post /api/auth/login
router.post("/login",authController.login);

//@ Get /api/auth/profile
router.get("/profile",authController.profile);

module.exports=router;
