const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createResturantController,
  getAllResturantController,
  getResturantById,
  deleteResturantController,
} = require("../controllers/resturantController");

const router = express.Router();

//routes
//create resturant||Post

router.post("/createResturant", authMiddleware, createResturantController);

//get all resturant|||get
router.get("/getAll",getAllResturantController)


//get resutrant by id
router.get("/get/:id",getResturantById)

//resturant delete|| delete
router.delete('/delete/:id',authMiddleware,deleteResturantController)


module.exports = router;
