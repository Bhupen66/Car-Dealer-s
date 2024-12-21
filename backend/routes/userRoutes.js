// Import the express module
const express = require("express");

// Create a router instance
const router = express.Router();

// Import the authentication controller
const authController = require("../controllers/UserController");

// Route for user registration (sign-up)


// http://localhost:5000/api/users/register
router.post("/register", authController.registerUser);    //POST

// Route for user login

// http://localhost:5000/api/users/login    // POST
router.post("/login", authController.loginUser);

// Export the router to be used in other parts of the application
module.exports = router;
