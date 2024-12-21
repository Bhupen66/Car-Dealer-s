import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [emiDetails, setEmiDetails] = useState({
    loanAmount: 0,
    interestRate: 0,
    tenure: 12,
  });
  const [emiResult, setEmiResult] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item._id !== id));
    toast.success('Item removed from cart!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
  };

  const totalCartValue = cartItems.reduce((total, item) => total + item.price, 0);

  const handleEmiInputChange = (e) => {
    const { name, value } = e.target;
    setEmiDetails({ ...emiDetails, [name]: value });
  };

  const calculateEmi = () => {
    const P = parseFloat(totalCartValue);
    const annualInterestRate = parseFloat(emiDetails.interestRate);
    const tenureInMonths = parseInt(emiDetails.tenure);

    if (isNaN(P) || isNaN(annualInterestRate) || isNaN(tenureInMonths)) {
      toast.error('Please enter valid EMI details.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return;
    }

    const r = annualInterestRate / 12 / 100;
    const n = tenureInMonths;

    const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    setEmiResult(emi.toFixed(2));
    toast.success('EMI calculated successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
  };

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout', {
      state: { cartItems, totalCartValue, emiResult }
    });
  };
  

  // const handleCheckout = () => {
  //   navigate('/process', { state: { totalCartValue, emiResult } }); // Pass totalCartValue and emiResult
  //   toast.success(`You have purchased items worth $${totalCartValue}. EMI: $${emiResult}/month`, {
  //     position: "top-right",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     draggable: true,
  //   });
  //   setCartItems([]);
  //   setEmiResult(0);
  //   localStorage.removeItem('cartItems');
  // };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-pink-100 p-6">
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-10 animate-bounce">
        Your Shopping Cart
      </h1>

      {/* Cart Items */}
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-2xl mb-10 transition-all duration-500 transform hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Items in Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="bg-white/40 p-6 rounded-lg shadow-lg flex justify-between items-center transition-transform duration-500 hover:scale-105"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {item.model || item.partNumber}
                  </h3>
                  <p className="text-gray-700 text-lg">${item.price}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-transform duration-300 transform hover:scale-110"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 text-2xl font-semibold text-gray-900">
          Total Cart Value: <span className="text-blue-600">${totalCartValue}</span>
        </div>
      </div>

      {/* EMI Calculator */}
      {cartItems.length > 0 && (
        <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-2xl mb-10 transition-all duration-500 transform hover:scale-105">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">EMI Calculator</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <input
              type="number"
              name="loanAmount"
              placeholder="Loan Amount"
              value={totalCartValue}
              disabled
              className="border border-gray-300 p-4 rounded-lg focus:ring-4 focus:ring-blue-500 bg-white/50"
            />
            <input
              type="number"
              name="interestRate"
              placeholder="Interest Rate (%)"
              value={emiDetails.interestRate}
              onChange={handleEmiInputChange}
              className="border border-gray-300 p-4 rounded-lg focus:ring-4 focus:ring-blue-500 bg-white/50"
            />
            <input
              type="number"
              name="tenure"
              placeholder="Tenure (Months)"
              value={emiDetails.tenure}
              onChange={handleEmiInputChange}
              className="border border-gray-300 p-4 rounded-lg focus:ring-4 focus:ring-blue-500 bg-white/50"
            />
          </div>
          <button
            className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110 w-full"
            onClick={calculateEmi}
          >
            Calculate EMI
          </button>
          {emiResult > 0 && (
            <p className="mt-4 text-2xl font-semibold text-center text-green-600">
              Estimated EMI: <span>${emiResult}/month</span>
            </p>
          )}
        </div>
      )}

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <button
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-4 rounded-lg shadow-lg hover:from-green-600 hover:to-teal-600 transition-transform transform hover:scale-110 w-full text-2xl font-bold animate-pulse"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      )}

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default Cart;
