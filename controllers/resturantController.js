const resturantModel = require("../models/resturantModel");

//create resturant
const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageurl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    //validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }
    const newResturant = new resturantModel({
      title,
      imageurl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newResturant.save();
    res.status(200).send({
      success: true,
      message: "New resturant created successfully",
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in create resturant api",
        error,
      });
  }
};

//get all resturant
const getAllResturantController = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No resturant available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in get all resturant api",
        error,
      });
  }
};

//get resturant by id
const getResturantById = async (req, res) => {
  try {
    const resturantid = req.params.id;
    if (!resturantid) {
      return res.status(404).send({
        success: false,
        message: "please provide resturant id",
      });
    }
    //find resturant
    const resturant = await resturantModel.findById(resturantid);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "no resturant found",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in get  resturant api",
        error,
      });
  }
};

//deleteResturant
const deleteResturantController=async(req,res)=>{
  try {
    const resturantId=req.params.id
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "please provide resturant id|| No resturnat found" ,
      });
    }
     await resturantModel.findByIdAndDelete(resturantId)
     res.status(200).send({
      success:true,
      message:"Resturant deleted successfully"
     })
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in delete resturant api",
        error,
      });
  }
}




module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantById,
  deleteResturantController,
};
