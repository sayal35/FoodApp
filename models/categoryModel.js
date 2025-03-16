const mongoose = require("mongoose");

//schema

const categorySchema = new mongoose.Schema(
  {
    title:{
        type:String,
        required:[true,'category title is required']
    },
    imageUrl:{
        type:String,
        default:"https://i.etsystatic.com/21215114/r/il/d0c7bd/4104680841/il_fullxfull.4104680841_hxug.jpg"
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Category", categorySchema);
