const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createCatController, getAllCategoryController, updateCategoryController, deleteCategoryController } = require("../controllers/categoryController");

const router = express.Router();

//routes
//create category
router.post("/create",authMiddleware,createCatController)

//get all cat
router.get("/getAll",getAllCategoryController)


//update cat
router.put("/update/:id",authMiddleware,updateCategoryController)

//delete cat
router.delete("/delete/:id",authMiddleware,deleteCategoryController)


module.exports = router;
