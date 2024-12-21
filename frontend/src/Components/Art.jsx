import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { motion, useScroll } from "framer-motion";
import Navbar from "./Navbar";

// Car Model Component
function CarModel({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

// 3D Car Gallery Component
const CarGallery = ({ carModelUrl }) => {
  return (
    <div className="w-full h-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <CarModel url={carModelUrl} />
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
};

// Art Gallery Page Component
const ArtGallery = () => {
  // Sample data for car models and their creators
  const cars = [
    {
      modelUrl: "/gltf/goat.gltf", // Replace with the path to your car model
      creator: "John Doe",
      title: "Ferrari",
    },
    // Add more cars here
  ];

  const { scrollYProgress } = useScroll();

  return (
    <>
      <div className="w-full min-h-screen bg-gray-900 text-white">
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold">3D Car Art Gallery</h1>
          <p className="text-lg mt-2">Explore the featured car</p>
        </header>

        <motion.div
          className="flex w-full h-screen flex-col items-center space-y-10 overflow-y-auto"
          style={{ opacity: scrollYProgress }}
        >
          <motion.div
            className="relative w-full h-100% max-w-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              transform: `translateY(${scrollYProgress * 100}px)`,
            }}
          >
            {/* 3D Car Display */}
            <CarGallery carModelUrl={cars[0].modelUrl} />

            {/* Creator Details Overlay */}
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white p-4 opacity-0 hover:opacity-100 transition-opacity duration-500">
              <h3 className="text-lg font-bold">{cars[0].title}</h3>
              <p>Creator: {cars[0].creator}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

// Main Page for the Art Gallery
const Art = () => {
  return <ArtGallery />;
};

export default Art;