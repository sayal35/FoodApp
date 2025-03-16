const express = require("express")
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController } = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")


const router = express.Router()

//routes
//getuser

router.get("/getUser",authMiddleware,getUserController)

//updateprofile
router.put("/updateUser",authMiddleware,updateUserController)

//password update
router.post("/updatePassword", authMiddleware, updatePasswordController)

//Reset password
router.post("/resetPassword", authMiddleware, resetPasswordController)

//delete user
router.delete("/deleteUser/:id",authMiddleware,deleteProfileController)


module.exports= router;