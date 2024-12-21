const mongoose = require("mongoose");

// Define the User schema.
const userSchema = new mongoose.Schema(
  {
    // User's first name
    firstname: {
      type: String,
      required: true,
    },
    // User's last name
    lastname: {
      type: String,
      required: true,
    },
    // User's unique username
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // User's email address
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // User's hashed password
    password: {
      type: String,
      required: true,
    },
    // User's gender
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"], // Optional enum for gender validation
      required: true,
    },
    // User's address
    address: {
      type: String,
      required: true,
    },
    // User's mobile number
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "SUBADMIN"], // Optional enum for gender validation
      required: true,
      default:"USER",
    },
    
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    collection: "User"
  }
);

// Create a model from the schema and export it.
const User = mongoose.model("User", userSchema);

module.exports = User;
