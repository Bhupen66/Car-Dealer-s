import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Page/Signup"; // Import Signup component
import Login from "./Page/Login"; // Import Login component
import Dashboard from "./Page/Dashboard"; // Import Dashboard component
import Art from "./Components/Art";
import ContactUs from "./Page/contactus";
import Home from "./Page/home";
import Admindashboard from "./Page/Admindashboard";
import AdminPanel from "./Page/AdminPanel";
import Car from "./Page/Car";
import Part from "./Page/Part";
import Cart from "./Page/Cart";
import Process from "./Page/Checkout";
import Checkout from "./Page/Checkout";
import Payment from "./Page/Payment";

// Import the additional components for the new routes
// import Home from "./Page/Home";
// import Shop from "./Page/Shop";
// import AboutUs from "./Page/AboutUs";
// import Feedback from "./Page/Feedback";

function App() {
  return (
    <div className="App">
      {/* Add the Navbar so it appears on every page */}


      {/* Define routes to navigate to different pages */}
      <Routes>
        {/* Existing Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Art" element={<Art />} />
        <Route path="/Part" element={<Part />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Car" element={<Car />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/Admindashboard" element={<Admindashboard />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* New Routes for Home, Shop, About Us, and Feedback */}
        {/* <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/feedback" element={<Feedback />} /> */}

        {/* You can add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;