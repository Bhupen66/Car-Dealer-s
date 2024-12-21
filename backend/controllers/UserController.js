const User = require("../model/User"); // Import the User model
const jwt = require("jsonwebtoken");

// Register (Sign up) a new user
exports.registerUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      username,
      email,
      password, // Now storing the plain text password
      gender,
      address,
      mobile,
    } = req.body;

    // Check if the user already exists with the same email or username
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password, // Store the plain text password directly
      gender,
      address,
      mobile,
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored plain text password
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      "JWT_SECRET", // Secret key for signing the token (ensure this is stored in an environment variable)
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return the token and user info
    res.status(200).json({
      message: "Login successful",
      token, // Send token to the client
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};














// const User = require("../model/User"); // Import the User model
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// // For password hashing

// // Register (Sign up) a new user
// exports.registerUser = async (req, res) => {
//   try {

//     const {
//       firstname,
//       lastname,
//       username,
//       email,
//       password,
//       gender,
//       address,
//       mobile,
//     } = req.body;

//     // Check if the user already exists with the same email or username
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already in use." });
//     }

//     const newUser = new User({
//       firstname,
//       lastname,
//       username,
//       email,
//       password, // Store the hashed password
//       gender,
//       address,
//       mobile,
//     });

//     // Save the user to the database
//     await newUser.save();

//     res
//       .status(201)
//       .json({ message: "User registered successfully", user: newUser });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error registering user", error: error.message });
//   }
// };

// // Login a user
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Compare the provided password with the stored hashed password
//      const isPasswordMatch = await bcrypt.compare(password, user.password);
//      if (!isPasswordMatch) {
//        return res.status(401).json({ message: "Invalid credentials" });
//      }

//     // Generate a JWT token
//     const token = jwt.sign(
//       {
//         userId: user._id,
//         email: user.email,
//       },
//       process.env.JWT_SECRET, // Secret key for signing the token (ensure this is stored in an environment variable)
//       { expiresIn: "1h" } // Token expires in 1 hour
//     );

//     // Return the token and user info
//     res.status(200).json({
//       message: "Login successful",
//       token, // Send token to the client
//       user: {
//         id: user._id,
//         email: user.email,
//         name: user.name,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error: error.message });
//   }
// };