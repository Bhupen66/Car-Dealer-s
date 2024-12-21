import React, { useState } from 'react';
import Navbar from '../Components/Navbarh';

const Home = () => {
  // Car data
  const cars = [
    { id: 1, name: "Car Model 1", price: 20000, image: "https://via.placeholder.com/300x200" },
    { id: 2, name: "Car Model 2", price: 30000, image: "https://via.placeholder.com/300x200" },
    { id: 3, name: "Car Model 3", price: 25000, image: "https://via.placeholder.com/300x200" },
  ];

  const [cart, setCart] = useState([]); // Cart state
  const [emiDetails, setEmiDetails] = useState({
    carPrice: 0,
    downPayment: 0,
    interestRate: 0,
    tenure: 0,
    emi: 0,
  });

  // EMI calculation function
  const calculateEMI = (price, downPayment, rate, tenure) => {
    const loanAmount = price - downPayment;
    const monthlyRate = rate / 12 / 100;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return emi.toFixed(2);
  };

  // Add to cart
  const addToCart = (car) => {
    setCart([...cart, car]);
    alert(`${car.name} added to cart!`);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-700 min-h-screen p-6 pt-20">

        {/* Background video */}
        <div className='w-full h-screen bg-slate-700 overflow-hidden'>
          <video className='top-0 relative  left-0 w-full h-full object-cover' src='/videos/mercedes.mp4' autoPlay loop muted />

          {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Updated Welcome Section */}
            <section className="relative bg-transparent w-full h-auto p-8 mt-40 rounded-lg mb-6 text-center">
              <h1 className="relative text-7xl font-bold text-gray-800 mb-4 transition-transform transform hover:scale-105 duration-300">
                Welcome to Car Dealer
              </h1>
              <p className="relative text-2xl text-gray-50 max-w-3xl mx-auto transition-opacity duration-500 hover:text-lime-300 hover:opacity-90">
                Your one-stop destination for finding the best deals on cars and auto parts. Explore our collection and experience unparalleled service.
              </p>
              {/* CTA Button */}
              <div className="mt-8">
                <a href="#about" className="relative inline-block text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-green-500 px-6 py-3 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300">
                  Learn More
                </a>
              </div>
            </section>
          </div>
        </div>

         {/* Our Services Section */}
         <section className="bg-transparent shadow-lg p-8 rounded-lg text-left mt-6">
          <h2 className="text-3xl font-semibold text-gray-100 mb-4 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-transparent p-6 rounded-lg transition-transform transform hover:scale-105 duration-300">
              <img src="https://luxuryride.in/_next/image?url=https%3A%2F%2Fapi.luxuryride.in%2Fpublic%2Fcms-page%2Fwhy_choose_luxury_mobile-1689944764987-411363647-manmohan-mobile-banner-for-why-choose-su.png&w=3840&q=75" alt="Service 1" className="w-full h-40 object-cover  mb-4 rounded" />
              <h3 className="text-xl text-gray-100 font-semibold mb-2">Premium Car Sales</h3>
              <p className="text-gray-300">We offer a selection of premium cars tailored to your desires, ensuring a smooth and luxurious experience.</p>
            </div>
            <div className="bg-transparent p-6 rounded-lg transition-transform transform hover:scale-105 duration-300">
              <img src="https://cdn2.hubspot.net/hubfs/1878504/financial%20services%20marketing%20plan.jpg" alt="Service 2" className="w-full h-40 object-cover mb-4 rounded" />
              <h3 className="text-xl text-gray-100 font-semibold mb-2">Personalized Financing</h3>
              <p className="text-gray-300">Get personalized financing options to make your dream car a reality. Our team is here to assist you.</p>
            </div>
            <div className="bg-transparent p-6 rounded-lg transition-transform transform hover:scale-105 duration-300">
              <img src="https://autocarrepair.in/blog/wp-content/uploads/2024/05/Car-Maintenance.png" alt="Service 3" className="w-full h-40 object-cover mb-4 rounded" />
              <h3 className="text-xl text-gray-100 font-semibold mb-2">Exclusive Maintenance</h3>
              <p className="text-gray-300">Our exclusive maintenance services keep your luxury vehicle in pristine condition, ensuring longevity.</p>
            </div>
          </div>
        </section>

        {/* Luxury Experience Section */}
        <section className="bg-transparent shadow-lg p-8 rounded-lg text-left mt-6">
          <h2 className="text-3xl font-semibold text-gray-100 mb-4 text-center">Luxury Experience</h2>
          <p className="text-gray-300 text-lg mb-4 text-center">
            At Car Dealer, we believe in delivering a luxury experience that extends beyond the purchase. From personalized customer service to exclusive events, we ensure you feel valued and special. 
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <img src="https://www.asparkholidays.com/uploads/60507_Car%20Rental%20Service%205.jpg" alt="Luxury Service" className="w-full md:w-1/2 rounded-lg mb-4 md:mb-0 md:mr-4" />
            <img src="https://img.freepik.com/free-photo/man-driving-car-from-rear-view_1359-494.jpg" alt="Luxury Service" className="w-full md:w-1/2 rounded-lg mb-4 md:mb-0 md:mr-4" />
            
          </div>
        </section>

       
      </div>
    </>
  );
};

export default Home;