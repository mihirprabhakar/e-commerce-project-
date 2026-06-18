const express=require("express");
const dashboardController=require("../controllers/dashboard.controller");
const router=express.Router();
const authMiddleware=require("../middlewares/auth.middleware");
const allowRoles=require("../middlewares/role.middleware");

// @GET dashboard data
router.get("/summary",authMiddleware,allowRoles("admin"),dashboardController.getDashboardData);

module.exports=router;