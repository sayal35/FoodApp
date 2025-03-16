const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//create food
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;
    if (!title || !description || !price || !resturant) {
      res.status(500).send({
        success: false,
        message: "Please provide all details",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: "new food item added",
      newFood,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in create food api",
        error,
      });
  }
};

//getAll
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "no food items found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in getAll food api",
        error,
      });
  }
};

//getsinglefood
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food found with this id",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in get single food api",
        error,
      });
  }
};

//get food by resturant
const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    const food = await foodModel.find({ resturant: resturantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food found with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "food based on resturant",
      food,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in get single food api",
        error,
      });
  }
};

//update food
const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "no food id was found",
      });
    }
    const food = await foodModel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food  was found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        resturant,
        rating,
        ratingCount,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "food updated successfully",
      updatedFood,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in update food api",
        error,
      });
  }
};

//delete food
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "food item deleted",
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in delete food api",
        error,
      });
  }
};

//place order
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart) {
      return res.status(400).send({
        success: false,
        message: "please provide a food cart or payment method",
      });
    }
    let total = 0;
    // Extract only food IDs and calculate total price
    const foodIds = cart.map((item) => {
      total += item.price;
      return item.id; // Ensure this is the correct ObjectId
    });
    const newOrder = new orderModel({
      foods: foodIds,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in order food api",
        error,
      });
  }
};

//change order status
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide valid order id",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Order Status API",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
