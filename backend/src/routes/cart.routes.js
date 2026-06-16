const express=require("express");
const cartController=require("../controllers/cart.controller");
const router=express.Router();


// @get get customer card 
router.get("/",cartController.getCart);

// @post add product to cart
router.post("/items",cartController.addToCart);

// @patch update product quantity in cart
router.patch("/items/:productId",cartController.updateCartItem);

// @delete remove product from cart
router.delete("/items/:productId",cartController.removeFromCart);


module.exports=router;
