const mongoose = require("mongoose");

//schema

const foodSchema = new mongoose.Schema(
  {
    title:{
        type:String,
        required:[true,"Food title is requried"]
    },
    description:{
        type:String,
        required:[true,"Food description is required"]
    },
    price:{
        type:Number,
        required:[true,"Food price is required"]
    },
    imageUrl:{
        type:String,
        default:"https://i.etsystatic.com/21215114/r/il/d0c7bd/4104680841/il_fullxfull.4104680841_hxug.jpg"
    },
    foodTags:{
        type:String,
    },
    category:{
        type:String,
    },
    code:{
        type:String,
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resturant"
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    }
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Foods", foodSchema);
