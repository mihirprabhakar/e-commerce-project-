const express=require("express");
const authController=require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router=express.Router();

//@ Post /api/auth/register
router.post("/register", authController.register);

//@ Post /api/auth/login
router.post("/login",authController.login);

//@ Get /api/auth/profile
router.get("/profile",authMiddleware,authController.profile);

//@ post /api/auth/logout
router.post("/logout", authMiddleware, authController.logout);

module.exports=router;
