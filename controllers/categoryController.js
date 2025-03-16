const categoryModel = require("../models/categoryModel");

//create category
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.send(500).send({
        success: false,
        message: "please provide category title or image",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category created",
      newCategory,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in create category api",
        error,
      });
  }
};

//getall category
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "no categories found",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in getall category api",
        error,
      });
  }
};

//updatecat
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "no category found",
      });
    }
    res.status(200).send({
      success: true,
      message: "category updated successfully",
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in update category api",
        error,
      });
  }
};

//deleteCat
const deleteCategoryController=async(req,res)=>{
try {
    const {id}= req.params
    if(!id){
        return res.status(500).send({
            success:false,
            message:"Please provide category id"
        })
    }
    const deleteCategory= await categoryModel.findById(id)
    if(!deleteCategory){
        res.status(500).send({
            success:false,
            message:"no category found"
        })
    }
    await categoryModel.findByIdAndDelete(id)
    res.status(200).send({
        success:true,
        message:"deleted category successfully"
    })
    
} catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in delete category api",
        error,
      });
}
}

module.exports = {
  createCatController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController
};
