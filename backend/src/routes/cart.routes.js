const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// get all crat items
router.get("/", authMiddleware, cartController.getCart);
// add new itnem in cart
router.post("/add", authMiddleware, cartController.addToCart);
// update the cart items
router.put("/update", authMiddleware, cartController.updateCartItem);
// delete by productid
router.delete("/remove/:productId", authMiddleware, cartController.removeFromCart);
// clear all cart
router.delete("/clear", authMiddleware, cartController.clearCart);

module.exports = router;