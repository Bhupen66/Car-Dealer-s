// Import the express module.
const express = require("express");

// Import the MongoDB connection function.
const connectDB = require("./config/dbConnect");

// Import the user routes.
const userRoutes = require("./routes/userRoutes");
const CarRoutes = require("./routes/CarRoutes"); 
const PartRoutes = require("./routes/PartRoutes");

// Import the CORS package.
const cors = require("cors");

// Create an instance of the express application.
const app = express();

// Use middleware to parse JSON.
app.use(express.json());

// Use CORS middleware to allow requests from your frontend.
app.use(
  cors({
    origin: "*", // Replace with your frontend URL if different
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Use car routes
app.use('/api/cars', CarRoutes);

app.use('/api/parts', PartRoutes);

// Connect to the MongoDB database.
connectDB();


//  http://localhost:5000
//  http://127.0.0.1:5000


// Use the user routes for any requests to /api/users.




// http://localhost:5000/api/users
app.use("/api/users", userRoutes);
app.use('/api/cars', CarRoutes);
app.use('/api/parts', PartRoutes);

// Start the server on port 5000.
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});












