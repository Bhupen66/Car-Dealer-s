import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbarh';

const Part = () => {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiBaseUrl = 'http://localhost:5000/api/parts'; // Replace with your actual API URL for parts

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await fetch(apiBaseUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch parts');
        }
        const data = await response.json();
        setParts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParts();
  }, []);

  // Add part to cart and store in localStorage
  const addToCart = (part) => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCart = [...savedCart, part];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    // Show a toast notification instead of alert
    toast.success(`${part.partNumber} has been added to your cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (loading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-2xl">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <Navbar/>
      <h1 className="text-4xl font-bold text-center mb-10">Available Parts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {parts.map((part) => (
          <div 
            key={part._id} 
            className="bg-white shadow-md rounded-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-lg hover:bg-blue-50"
          >
            <h2 className="text-2xl font-bold mb-2">{part.partNumber}</h2>
            <p className="text-gray-600">Manufacturer: {part.manufacturer}</p>
            <p className="text-gray-800 font-semibold mt-2">Price: ${part.price}</p>
            {/* Fix: Check if description exists before calling substring */}
            <p className="text-gray-600 mt-2">
              {part.description ? part.description.substring(0, 50) : 'No description available'}...
            </p>

            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                onClick={() => addToCart(part)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Part;
