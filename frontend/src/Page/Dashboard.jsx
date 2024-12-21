import React from "react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { view } from "framer-motion/client";



function Dashboard() { 
  
   const navigate = useNavigate();
  // Array of image URLs
  const carImages = [
    'https://i.pinimg.com/originals/2a/78/1a/2a781a9c1bb85036c7ef6cf42a649ef8.png',
    'https://vehicle-images.dealerinspire.com/stock-images/thumbnails/large/chrome/b7e30fcdf5493c31c3a872d108d3d25d.png',
    'https://i.pinimg.com/originals/b3/7b/86/b37b86a23eb4a02428c454d5c28bba27.png',
  ];

   const Contact = () => {
     navigate('/Contact')
   }

   const view = () => {
    navigate('/login')
  }



  // Array of alt texts for images
  const carAltTexts = [
    'Black Vintage Car',
    'Model Y - A sleek, eco-friendly SUV',
    'Model Z - The latest in electric luxury cars',
  ];

  const carModels = ['Model X', 'Model Y', 'Model Z'];

  // Car Parts Data
  const partsImages = [
    'https://png.pngtree.com/png-vector/20230925/ourmid/pngtree-heavy-truck-automatic-transmission-front-view-isolated-front-png-image_10033738.png',
    'https://png.pngtree.com/png-vector/20240905/ourmid/pngtree-3d-regenerative-hydrolic-braking-system-png-image_13756541.png',
    'https://www.fixmycarac.com/blog/wp-content/uploads/2023/05/AC-Compressor-web.png',
  ];

  const partsAltTexts = ['Tires for all-weather use', 'High-quality brakes', 'Bright LED headlights'];

  const partsNames = ['Tires', 'Brakes', 'Headlights'];
  
  return (
    <>
      <div id='home' className='w-full h-screen bg-slate-500 pt-1'>
        <Navbar />
        
        <div className="flex"> 
            <div className=' text mt-52 px-20 font-[NerkoOne-Regular] text-6xl'>
                  {["Welcome to","Shree Nath","car and parts dealers "].map((itme,index)=>{
                    return <div className='masker'>
                      <h1 className='uppercase transition-all duration-500 hover:text-amber-300 hover:scale-110'>
                        {itme}
                      </h1>
                    </div>
                  })}

            </div>
            <div className="mt-36 ml-20">
            <img src="https://png.pngtree.com/png-vector/20220912/ourmid/pngtree-single-car-tire-cgi-new-heap-vector-png-image_25388408.png" 
                 className="w-80 h-80 motion-safe:animate-[spin_20s_linear_infinite]" 
                 alt="logo" />
            </div>
              
        </div>

            
                <div className="w-full h-28 py-30 ">
                   <Marquee className="w-full h-28 group" pauseOnHover>
                       {[ 
                         "https://pngimg.com/d/car_logo_PNG1654.png",
                         "https://purepng.com/public/uploads/large/purepng.com-hyundai-logohyundaihyundai-carshyundai-manufacturerhyundai-automobileslogo-1701527487368owwnp.png",
                         "https://www.carlogos.org/logo/MG-logo-red-2010-1920x1080.png",
                         "https://purepng.com/public/uploads/large/purepng.com-renault-logorenaultgroupe-renaultautomobile-manufacturerrenault-automobilesrenault-logo-1701527610651gtmix.png",
                         "https://www.carlogos.org/logo/Rolls-Royce-symbol-2048x2048.png",
                         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png",
                         "https://logos-world.net/wp-content/uploads/2020/05/Ferrari-Emblem.png",
                         "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png",
                         "https://seeklogo.com/images/N/Nissan-logo-4B3C580C8A-seeklogo.com.png",
                         "https://www.carlogos.org/logo/Skoda-logo-2016-1920x1080.png",
                         "https://www.carlogos.org/logo/Suzuki-logo-1920x1080.png",
                         "https://download.logo.wine/logo/Lamborghini/Lamborghini-Logo.wine.png",
                         "https://upload.wikimedia.org/wikipedia/commons/a/a9/Bugatti_Logo.png",
                         "https://pngimg.com/d/car_logo_PNG1665.png",
                         "https://upload.wikimedia.org/wikipedia/commons/1/13/Kia-logo.png",
                         "https://www.carlogos.org/logo/Volkswagen-emblem-2014-1920x1080.png",
                         "https://i.pinimg.com/originals/d2/3a/ba/d23abaaf58c8d340da0c7d3b9f13e8f2.png",
                         "https://pngimg.com/d/maserati_PNG64.png",
                         "https://pngimg.com/d/land_rover_PNG39.png",
                         "https://www.carlogos.org/logo/Tata-Group-logo-3840x2160.png",
                         "https://i.pinimg.com/originals/6a/75/66/6a7566b6e66d3bd5400892c2983cf1ef.png",
                         "https://www.pngplay.com/wp-content/uploads/13/Honda-Symbol-Free-Picture-PNG.png"
                       ].map((src, index) => (
                         <div key={index} className="flex mx-7">
                           <img
                             src={src}
                             alt={`Car logo ${index + 1}`}
                             className="h-20 max-w-none transition-transform duration-300 hover:scale-125"
                           />
                         </div>
                       ))}
                    </Marquee> 
                    
               </div>
        
                    


    </div>
        
        <div  className="w-full h-100%">
            {/* About Section */}
      <section id="about" className="py-24 bg-gray-800">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-semibold mb-6">About Us</h3>
          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-10 mb-12">
            <img
              src="https://www.tomhartley.com/img/content/about.jpg"
              alt="About Car Dealer"
              className="w-full md:w-1/2 rounded-lg shadow-lg mb-6 md:mb-0"
            />
            <div className="text-lg text-gray-400 max-w-md">
              <p>
                Welcome to <span className="font-bold text-yellow-500">Car Dealer</span>, your trusted partner in the automotive world for over two decades. Established in 2000, we’ve grown from a small local dealership into a reputable and reliable name in the industry.
              </p>
              <p className="mt-4">
                We are driven by our commitment to quality, integrity, and customer satisfaction. Over the years, we’ve earned a loyal customer base through our transparent business practices, excellent customer service, and our unwavering dedication to helping clients find the right vehicle at the right price.
              </p>
              <p className="mt-4">
                Our company was founded on the belief that buying a car should be an exciting and stress-free experience. That's why we offer a wide variety of vehicles to meet every need—from eco-friendly hybrids to luxury SUVs and high-performance sports cars.
              </p>
              <p className="mt-4">
                We also understand that a car is more than just a vehicle; it's a part of your lifestyle. Whether you're looking for a family car or a ride that reflects your personal style, our expert team is here to guide you every step of the way.
              </p>
            </div>
          </div>

          {/* Additional Images */}
          <div  className="flex truncate flex-col md:flex-row justify-center items-center md:space-x-10 mb-12">
            <img
              src="https://www.bugatti.com/media/jwxegfi4/hero-desktop.jpeg?width=1920&height=800&rnd=133343618819170000"
              alt="Our Services"
              className="w-full md:w-1/3 rounded-lg shadow-lg mb-6 md:mb-0"
            />
            <img
              src="https://t4.ftcdn.net/jpg/07/50/07/47/360_F_750074784_2rH59sj5BrY5K88YR0YRsUApojO8kT3Y.jpg"
              alt="Dealership Building"
              className="w-full md:w-1/3 rounded-lg shadow-lg mb-6 md:mb-0"
            />
            <img
              src="https://www.shutterstock.com/image-photo/car-purchase-rental-positive-young-600nw-2153842705.jpg"
              alt="Customer Interaction"
              className="w-full md:w-1/3 rounded-lg shadow-lg mb-6 md:mb-0"
            />
          </div>

          <div className="flex flex-col md:flex-row-reverse justify-center items-center md:space-x-10">
            <img
              src="https://www.autosarena.com/wp-content/uploads/2021/07/Boys-and-Machines-opens-dedicated-after-sales-service-facility-2.jpeg"
              alt="Service Area"
              className="w-full md:w-1/2 rounded-lg shadow-lg mb-6 md:mb-0"
            />
            <div className="text-lg text-gray-400 max-w-md">
              <p>
                Beyond sales, our commitment to customer satisfaction extends to offering top-notch after-sales services. Our certified mechanics use the latest technology to maintain and repair your vehicles, ensuring they stay in peak condition.
              </p>
              <p className="mt-4">
                We also provide a range of flexible financing options tailored to meet your needs, making it easier than ever to get behind the wheel of your dream car.
              </p>
              <p className="mt-4">
                Our team is passionate about cars, and that passion drives everything we do. From our state-of-the-art showroom to our curated selection of parts and accessories, every aspect of our dealership is designed to give you a first-class experience.
              </p>
              <p className="mt-4">
                Thank you for choosing <span className="font-bold text-yellow-500">Car Dealer</span> as your automotive partner. We look forward to welcoming you to our dealership and helping you find the perfect vehicle for your journey.
              </p>
            </div>
          </div>

          {/* Community Events */}
          <div className="mt-12">
            <img
              src="https://static.wixstatic.com/media/2742e1_338366ecc3a449d7b4197d0c0104fae4~mv2.png/v1/fill/w_980,h_560,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/2742e1_338366ecc3a449d7b4197d0c0104fae4~mv2.png"
              alt="Community Event"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section id="cars" className="py-24 bg-gray-900">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-semibold mb-12">Featured Cars</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {carModels.map((model, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition duration-500 hover:rotate-3 hover:scale-105 hover:shadow-2xl group"
              >
                <div className="relative w-full h-100% overflow-hidden">
                  <img
                    src={carImages[index]}
                    alt={carAltTexts[index]}
                    className="w-full h-100% object-cover rounded-md mb-4 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
                      Quick View
                    </button>
                  </div>
                </div>
              
                <h4 className="text-2xl font-bold">{model}</h4>
                <p className="text-gray-300 mt-2">$50,000</p>
                <button onClick={view} className="mt-4 bg-blue-600  hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105 hover:rotate-3">
                  View Details
                </button>
                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Parts Section */}
      <section id="parts" className="bg-gradient-to-r py-24 from-gray-900 to-gray-800">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-semibold mb-12">Car Parts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partsNames.map((part, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:rotate-6 hover:scale-105 transition duration-500 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={partsImages[index]}
                    alt={partsAltTexts[index]}
                    className="w-full h-100% object-cover rounded-md mb-4 transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <h4 className="text-2xl font-bold">{part}</h4>
                <p className="text-gray-300 mt-2">$200</p>
                <button onClick={view} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105 hover:rotate-3">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Map */}
      <footer id="contact" className="bg-black  text-white py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-4">Get in Touch</h3>
          <p className="text-xl">Phone: 123-456-7890</p>
          <p className="text-xl mb-4">Email: support@cardealer.com</p>
          
          {/* Embedded Google Map */}
          <div className="mt-8">
            <iframe
              className="w-full h-72 md:w-1/2 mx-auto rounded-lg shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096174!2d144.95373531587442!3d-37.817209742008655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1d15b%3A0x2b1f3b771b4f997e!2sCar%20Dealer!5e0!3m2!1sen!2sus!4v1632509738047!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
              title="Dealer Location"
            />
          </div>

          <div className="mt-6">
            <button onClick={Contact} className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white px-6 py-2 rounded-full transition duration-300 transform hover:scale-110 hover:rotate-3">
              Contact Us
            </button>
          </div>
        </div>
      </footer> 
        </div>
    </>
    
  );
}

export default Dashboard;