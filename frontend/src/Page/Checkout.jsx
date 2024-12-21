import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [], totalCartValue = 0, emiResult = 0 } = location.state || {};

  // Handle "Go Back to Shop" or "View Orders" navigation
  const handleGoToShop = () => {
    navigate('/car'); // Replace with the actual shop route
  };

  const handleViewOrders = () => {
    navigate('/payment'); // Replace with the actual orders route
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-pink-100 p-10 flex flex-col items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You for Your Purchase!</h1>
        <p className="text-lg text-gray-600 mb-6">
          You’ve successfully purchased the following {cartItems.length > 1 ? 'items' : 'item'}:
        </p>

        {/* Order Summary */}
        <div className="bg-white/50 backdrop-blur-lg p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between items-center p-4 bg-white shadow-sm rounded-lg">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.model || item.partNumber}</h3>
                  <p className="text-gray-700">${item.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-xl font-semibold">
            Total Price: <span className="text-blue-600">${totalCartValue}</span>
          </div>
        </div>

        {/* EMI Details (if applicable) */}
        {emiResult > 0 && (
          <div className="bg-white/50 backdrop-blur-lg p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">EMI Details</h2>
            <p className="text-lg text-gray-700">
              Your estimated EMI is <span className="text-green-600 font-semibold">${emiResult}</span> per month.
            </p>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-white/50 backdrop-blur-lg p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Next Steps</h2>
          <p className="text-lg text-gray-700">
            We will send you an email with the order details and estimated delivery time. 
            If you chose EMI, we’ll share more information about your payment schedule soon.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex space-x-4 justify-center mt-6">
          <button
            onClick={handleGoToShop}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Go Back to Shop
          </button>
          <button
            onClick={handleViewOrders}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            View Your Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
