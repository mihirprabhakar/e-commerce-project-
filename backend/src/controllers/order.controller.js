const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

// @POST /api/orders/place

exports.placeOrder=async (req, res)=>{
  try{
    const {shippingAddress,paymentMethod="cod"}=req.body;

    // Validate shipping address
    if(!shippingAddress){
      return res.status(400).json({ success: false, message: "shipping address is required" });
    }

    const {name,phone,address,city,state,pincode}=shippingAddress;

    if(!name||!phone||!address||!city||!state||!pincode){
      return res.status(400).json({ success: false, message: "all shipping address fields are required" });
    }

    // user cart
    const cart=await Cart.findOne({ userId: req.user._id });
    if(!cart||cart.items.length===0){
      return res.status(400).json({ success: false, message: "cart is empty" });
    }

    // Create order from cart items
    const order=await Order.create({
      userId: req.user._id,
      items: cart.items.map((item) =>({
        productId: item.productId,
        name: item.name,
        price: item.price,
        discount: item.discount,
        finalPrice: item.finalPrice,
        quantity: item.quantity
      })),
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
      shippingAddress,
      paymentMethod,
      status: "pending",
      paymentStatus: paymentMethod ==="cod"?"unpaid":"paid"
    });

    // Clear cart after order placed
    cart.items=[];
    cart.totalItems=0;
    cart.totalPrice=0;
    await cart.save();
    res.status(201).json({
      success: true,
      message: "order placed successfully",
      data: order
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @GET /api/orders/my-orders

exports.getMyOrders=async (req, res)=>{
  try{
    const orders=await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "orders fetched successfully",
      data: orders
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @GET /api/orders/:id

exports.getOrderById=async (req, res)=>{
  try{
    const order=await Order.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if(!order){
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @PATCH /api/orders/:id/cancel

exports.cancelOrder=async (req, res) => {
  try {
    const order=await Order.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    if(!order){
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (order.status!=="pending") {
      return res.status(400).json({
        success: false,
        message: "only pending orders can be cancelled"
      });
    }
    order.status="cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @PATCH /api/orders/:id/status
//
exports.updateOrderStatus=async (req, res)=>{
  try{
    const {status}=req.body;
    if(!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }
    const order=await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if(!order){
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};