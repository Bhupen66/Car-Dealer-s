// Import the mongoose module.
// Mongoose is an ODM that helps in working with MongoDB in an organized and simple way.
const mongoose = require("mongoose");

// Load environment variables from the .env file.
// This will allow access to the variables defined in the .env file via process.env.
require("dotenv").config();

// Define a function to connect to the MongoDB database.
// This function can be called to establish the connection whenever needed.
const connectDB = async () => {
  try {
    // Use the mongoose connect method to connect to the MongoDB database.
    // The MongoDB connection string is now retrieved from the environment variables.
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/demo1", //yout db name here after 27017/
      {
        useNewUrlParser: true, // Use the new MongoDB driver's URL string parser.
        useUnifiedTopology: true, // Use the new MongoDB driver's server discovery and monitoring engine.
      }
    );

    // If the connection is successful, log the MongoDB host name.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // If there is an error during the connection, log the error and exit the process with failure (1).
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

// Export the connectDB function so that it can be used in other parts of the application.
module.exports = connectDB;