const express=require("express");
const router=express.Router();
const authRoutes=require("./auth.routes");
const productRoutes=require("./product.routes");
const userRoutes=require("./user.routes");
const dashboardRoutes=require("./dashboard.routes");
const categoryRoutes=require("./category.routes");
const cartRoutes=require("./cart.routes");
const orderRoutes=require("./order.routes");
const aboutRoutes = require("./about.routes");
const contactRoutes = require("./contact.routes");


router.use("/auth",authRoutes);
router.use("/products",productRoutes)
router.use("/users",userRoutes);
router.use("/",dashboardRoutes);
router.use("/categories",categoryRoutes);
router.use("/cart",cartRoutes);
router.use("/orders",orderRoutes);
router.use("/about", aboutRoutes);
router.use("/contact", contactRoutes);
module.exports=router;