const express = require("express")
const { registerController, loginContorller } = require("../controllers/authController")

const router = express.Router()

//routes
//Register||Post

router.post("/register",registerController)

//Login||post
router.post("/login",loginContorller)

module.exports= router