const express=require("express");
const orderController=require("../controllers/order.controller");
const authMiddleware=require("../middlewares/auth.middleware");
const allowRoles=require("../middlewares/role.middleware");
const router=express.Router();


// @post create order
router.post("/",authMiddleware,orderController.createOrder);

// @get get my orders 
router.get("/my-orders",authMiddleware,orderController.getMyOrders);

//@get admin get all orders
router.get("/",authMiddleware,allowRoles("admin"),orderController.getAllOrders);

//@patch admin update order status
router.patch("/:id/status",authMiddleware,allowRoles("admin"),orderController.updateOrderStatus);




module.exports=router;