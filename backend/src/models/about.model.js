const mongoose=require("mongoose");
const aboutSchema=new mongoose.Schema(
  {
    companyName:{
      type: String,
      required: true
    },
    tagline:
    {
      type: String,
      required: true
    },
    description:
    {
      type: String,
      required: true
    },
    mission: 
    { type: String,
      required: true
    },
    vision:
    { type: String,
      required: true
    },
    foundedYear:
    { type: Number,
      required: true
    },
    email:
    { type: String,
      required: true
    },
    phone:
    { type: String,
      required: true
    },
    address:
    { type: String,
      required: true
    },
    isActive:
    { type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);