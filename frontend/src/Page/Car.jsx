import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbarh';

const Car = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const apiBaseUrl = 'http://localhost:5000/api/cars';

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(apiBaseUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Fetch car details
  const fetchCarDetails = async (carId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/${carId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch car details');
      }
      const data = await response.json();
      setSelectedCar(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Add car to cart and store in localStorage
  const addToCart = (car) => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCart = [...savedCart, car];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    // Show a toast notification instead of alert
    toast.success(`${car.model} has been added to your cart!`, {
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
    <>
      <Navbar />
      <div className="container p-10 mx-auto ">

        <h1 className="text-4xl font-bold text-center mb-10">Available Cars</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white shadow-md rounded-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-lg hover:bg-blue-50"
            >
              <img
                src={car.image}
                alt={car.model}
                className="w-full h-48 object-cover mb-4 rounded-md transition duration-300 hover:opacity-90"
              />
              <h2 className="text-2xl font-bold mb-2">{car.model}</h2>
              <p className="text-gray-600">{car.company}</p>
              <p className="text-gray-800 font-semibold mt-2">Price: ${car.price}</p>
              <p className="text-gray-600 mt-2">{car.features.substring(0, 50)}...</p>

              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  onClick={() => fetchCarDetails(car._id)}
                >
                  View Details
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                  onClick={() => addToCart(car)} // Add car to cart and localStorage
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Viewing Car Details */}
        {selectedCar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={() => setSelectedCar(null)}
              >
                ✖️
              </button>
              <h2 className="text-3xl font-bold mb-4">{selectedCar.model}</h2>
              <img src={selectedCar.image} alt={selectedCar.model} className="w-full h-64 object-cover mb-4 rounded-md" />
              <p><strong>Company:</strong> {selectedCar.company}</p>
              <p><strong>Price:</strong> ${selectedCar.price}</p>
              <p className="mt-4"><strong>Features:</strong> {selectedCar.features}</p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={() => setSelectedCar(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Toast Notification Container */}
        <ToastContainer />
      </div>
    </>
  );
};

export default Car;