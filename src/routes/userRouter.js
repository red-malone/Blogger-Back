const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/jwt");
const {
  loginValidator,
  registerValidator,
  editUserValidator,
  validateUserMiddleware,
} = require("../validators/userValidator");

const {
  registerUser,
  loginUser,
  getUserDetails,
  editUserDetails
} = require("../controller/userController");
// User Registration Route
router.post(
  "/register",
  registerValidator,
  validateUserMiddleware,
  registerUser
);
// User Login Route
router.post("/login", loginValidator, validateUserMiddleware, loginUser);

//User Details Route
router.get("/profile", authMiddleware, getUserDetails);

//Edit User Details Route
router.put("/profile", authMiddleware, editUserValidator, validateUserMiddleware, editUserDetails);

module.exports = router;
