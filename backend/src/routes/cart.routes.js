const express=require("express");
const cartController=require("../controllers/cart.controller");
const authMiddleware=require("../middlewares/auth.middleware");
const router=express.Router();


// @get get customer card 
router.get("/",authMiddleware,cartController.getCart);

// @post add product to cart
router.post("/items",authMiddleware,cartController.addToCart);

// @patch update product quantity in cart
router.patch("/items/:productId",cartController.updateCartItem);

// @delete remove product from cart
router.delete("/items/:productId",authMiddleware,cartController.removeFromCart);


module.exports=router;
