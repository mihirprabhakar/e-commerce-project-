const mongoose = require("mongoose");

const cartItemSchema=new mongoose.Schema({
  productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true,
  },
  name:{
    type: String,
    required: true,
  },
  price:{
    type: Number, 
    required: true, 
  },
  discount:{ 
    type: Number, 
    default: 0, 
  },
  finalPrice:{
     type: Number,
     required: true, 
  },
  quantity:{ 
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  stock:{
    type: Number,
    required: true, 
  },
});

const cartSchema=new mongoose.Schema(
  {
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
      unique:true,
    },
    items:[cartItemSchema],
    totalItems:{
      type: Number,
      default: 0, 
    },
    totalPrice:{ 
      type: Number, 
      default: 0, 
    },
  },
  {timestamps:true}
);

module.exports=mongoose.model("Cart", cartSchema);