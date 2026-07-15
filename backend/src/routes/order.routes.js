const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");

// customeer routes
// place an order
router.post("/place", authMiddleware, orderController.placeOrder);
// gte all the orders
router.get("/my-orders", authMiddleware, orderController.getMyOrders);
// get by id 
router.get("/:id", authMiddleware, orderController.getOrderById);
// cancel the order
router.patch("/:id/cancel", authMiddleware, orderController.cancelOrder);

// admin route
router.patch("/:id/status",authMiddleware,allowRoles("admin"), orderController.updateOrderStatus);

module.exports=router;