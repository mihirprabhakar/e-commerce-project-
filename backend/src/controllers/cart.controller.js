const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

// helper to calculate cart totals
const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + Number(item.quantity), 0);
  const totalPrice = items.reduce((sum, item) => sum + Number(item.finalPrice) * Number(item.quantity), 0);
  return { totalItems, totalPrice };
};

// @GET /api/cart

exports.getCart=async (req, res)=>{
  try{
    const cart=await Cart.findOne({ userId: req.user._id });

    if (!cart){
      return res.status(200).json({
        success: true,
        message: "cart is empty",
        data: { items: [], totalItems: 0, totalPrice: 0 }
      });
    }
    res.status(200).json({
      success: true,
      message: "cart fetched successfully",
      data: cart
    });
  } catch (err){
    res.status(500).json({ success: false, message: err.message });
  }
};

// @POST /api/cart/add

exports.addToCart=async (req, res)=>{
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId){
      return res.status(400).json({ success: false, message: "product id is required" });
    }

    // check if product exists and is active
    const product=await Product.findById(productId);
    if (!product||!product.isActive){
      return res.status(404).json({ success: false, message: "product not found" });
    }

    // check stock
    if (product.stock<quantity) {
      return res.status(400).json({ success: false, message: "no stock" });
    }

    // calculate final price after discount
    const price = Number(product.price);
    const discount = Number(product.discount) || 0;

    const finalPrice = discount > 0
      ? price - (price * discount) / 100
      : price;

    // ifnd or create cart
    let cart=await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    // check if product already in cart
    const existingItem = cart.items.find(
      (item)=>item.productId.toString()===productId
    );

    if (existingItem) {
      // update quantity
      const newQuantity=existingItem.quantity+quantity;
      if (newQuantity>product.stock) {
        return res.status(400).json({ success: false, message: "no stock" });
      }
      existingItem.quantity=newQuantity;
    }
    else {
      // add new item
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: price,
        discount: discount,
        finalPrice: finalPrice,
        quantity: quantity,
        stock: Number(product.stock)
      });
    }

    // update totals
    const { totalItems, totalPrice }=calculateTotals(cart.items);
    cart.totalItems=totalItems;
    cart.totalPrice=totalPrice;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "item added to cart successfully",
      data: cart
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @PUT /api/cart/update

exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ success: false, message: "product ID and quantity are required" });
    }

    if (quantity < 1) {
      return res.status(400).json({ success: false, message: "quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ success: false, message: "item not found in cart" });
    }

    // Check stock
    if (quantity > item.stock) {
      return res.status(400).json({ success: false, message: "insufficient stock" });
    }

    item.quantity = quantity;

    // Update totals
    const { totalItems, totalPrice } = calculateTotals(cart.items);
    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "cart updated successfully",
      data: cart
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @DELETE /api/cart/remove/:productId

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // Update totals
    const { totalItems, totalPrice } = calculateTotals(cart.items);
    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "item removed from cart successfully",
      data: cart
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @DELETE /api/cart/clear

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "cart not found" });
    }

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "cart cleared successfully",
      data: cart
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};