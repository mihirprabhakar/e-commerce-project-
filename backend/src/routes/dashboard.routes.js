const express=require("express");
const dashboardController=require("../controllers/dashboard.controller");
const router=express.Router();

// @GET dashboard data
router.get("/summary",dashboardController.getDashboardData);

module.exports=router;