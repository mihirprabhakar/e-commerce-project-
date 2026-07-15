const mongoose = require("mongoose");

const orderItemSchema=new mongoose.Schema({
  productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
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
  },
});

const orderSchema=new mongoose.Schema(
  {
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    items:[orderItemSchema],
    totalItems:{ 
      type: Number, 
      required: true, 
    },
    totalPrice:{ 
      type: Number, 
      required: true,
    },
    shippingAddress:{
      name:{
        type: String, 
        required: true, 
      },
      phone:{ 
        type: String, 
        required: true, 
      },
      address:{ 
        type: String, 
        required: true, 
      },
      city:{ 
        type: String, 
        required: true, 
      },
      state:{ 
        type: String, 
        required: true, 
      },
      pincode:{ 
        type: String, 
        required: true,
      },
    },
    status:{
      type:String,
      enum:["pending","confirmed","processing","shipped","delivered","cancelled"],
      default:"pending",
    },
    paymentMethod:{
      type: String,
      enum: ["cod", "online"],
      default: "cod",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid","paid","refunded"],
      default: "unpaid",
    }
  },
  { timestamps: true }
);

module.exports=mongoose.model("Order", orderSchema);