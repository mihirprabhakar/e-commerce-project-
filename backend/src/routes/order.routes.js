const express=require("express");
const orderController=require("../controllers/order.controller");
const router=express.Router();


// @post create order
router.post("/",orderController.createOrder);

// @get get my orders 
router.get("/my-orders",orderController.getMyOrders);

//@get admin get all orders
router.get("/",orderController.getAllOrders);

//@patch admin update order status
router.patch("/:id/status",orderController.updateOrderStatus);




module.exports=router;