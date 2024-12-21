import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AdminPanel = () => {
  const [carDetails, setCarDetails] = useState({
    model: '',
    image: '',
    price: '',
    company: '',
    features: '',
    moreDetails: '',
    category: '',
  });

  const [partDetails, setPartDetails] = useState({
    partNumber: '',
    image: '',
    details: '',
    category: '',
  });

  const [carList, setCarList] = useState([]);
  const [partList, setPartList] = useState([]);
  const [categoryList] = useState(['Sedan', 'SUV', 'Truck', 'Accessory']);
  const [editingCarId, setEditingCarId] = useState(null);
  const [editingPartId, setEditingPartId] = useState(null);

  const apiBaseUrl = 'http://localhost:5000/api'; // Update this to your actual API URL

  useEffect(() => {
    fetchCars();
    fetchParts();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/cars`);
      if (response.ok) {
        const data = await response.json();
        setCarList(data);
      } else {
        console.error('Error fetching cars:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const fetchParts = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/parts`);
      if (response.ok) {
        const data = await response.json();
        setPartList(data);
      } else {
        console.error('Error fetching parts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching parts:', error);
    }
  };

  const handleCarChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
  };

  const handlePartChange = (e) => {
    const { name, value } = e.target;
    setPartDetails({ ...partDetails, [name]: value });
  };

  const handleEditCar = (car) => {
    setCarDetails(car);
    setEditingCarId(car._id);
  };

  const handleUpdateCar = async (updatedCarDetails) => {
    try {
      const response = await fetch(`${apiBaseUrl}/cars/${editingCarId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCarDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to update car details');
      }

      const updatedCar = await response.json();
      
      // Update the cars list with the updated car
      setCarList(prevCars => prevCars.map(car => 
        car._id === updatedCar._id ? updatedCar : car
      ));

      // Reset editing state
      setEditingCarId(null);
      setCarDetails({
        model: '',
        image: '',
        price: '',
        company: '',
        features: '',
        moreDetails: '',
        category: ''
      });

      // Show success message
      alert('Car details updated successfully');
    } catch (error) {
      console.error('Error updating car details:', error);
      alert('Failed to update car details. Please try again.');
    }
  };

  const handleEditPart = (part) => {
    setPartDetails(part);
    setEditingPartId(part._id);
  };

  const handleUpdatePart = async (updatedPartDetails) => {
    try {
      const response = await fetch(`${apiBaseUrl}/parts/${editingPartId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPartDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to update part details');
      }

      const updatedPart = await response.json();
      
      // Update the parts list with the updated part
      setPartList(prevParts => prevParts.map(part => 
        part._id === updatedPart._id ? updatedPart : part
      ));

      // Reset editing state
      setEditingPartId(null);
      setPartDetails({
        partNumber: '',
        image: '',
        details: '',
        category: ''
      });

      // Show success message
      alert('Part details updated successfully');
    } catch (error) {
      console.error('Error updating part details:', error);
      alert('Failed to update part details. Please try again.');
    }
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const details = type === 'car' ? carDetails : partDetails;
    const setDetails = type === 'car' ? setCarDetails : setPartDetails;
    const list = type === 'car' ? carList : partList;
    const setList = type === 'car' ? setCarList : setPartList;
    const editingId = type === 'car' ? editingCarId : editingPartId;
    const setEditingId = type === 'car' ? setEditingCarId : setEditingPartId;

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `${apiBaseUrl}/${type}s/${editingId}`
        : `${apiBaseUrl}/${type}s`;
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        if (editingId) {
          setList(list.map(item => item._id === editingId ? updatedItem : item));
        } else {
          setList([...list, updatedItem]);
        }
        setDetails(type === 'car'
          ? { model: '', image: '', price: '', company: '', features: '', moreDetails: '', category: '' }
          : { partNumber: '', image: '', details: '', category: '' }
        );
        setEditingId(null);
      } else {
        console.error(`Error submitting ${type}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error submitting ${type}:`, error);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/cars/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCarList(carList.filter(car => car._id !== id));
      } else {
        console.error('Error deleting car:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleDeletePart = async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/parts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPartList(partList.filter(part => part._id !== id));
      } else {
        console.error('Error deleting part:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting part:', error);
    }
  };

  const carData = {
    labels: carList.map(car => car.model || 'Unknown Model'),
    datasets: [
      {
        label: 'Car Prices',
        data: carList.map(car => car.price || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const partData = {
    labels: partList.map(part => part.partNumber || 'Unknown Part'),
    datasets: [
      {
        label: 'Parts Distribution',
        data: partList.map(() => 1),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="bg-white w-64 p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">Admin Panel</h1>
        <ul className="space-y-4">
          <li><a href="#add-car" className="text-gray-600 hover:text-blue-500 transition">Add Car</a></li>
          <li><a href="#add-part" className="text-gray-600 hover:text-blue-500 transition">Add Part</a></li>
          <li><a href="#statistics" className="text-gray-600 hover:text-blue-500 transition">Statistics</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Add/Edit Car Form */}
        <div id="add-car" className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add/Edit Car</h2>
          <form onSubmit={(e) => handleSubmit(e, 'car')}>
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={carDetails.model}
              onChange={handleCarChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={carDetails.image}
              onChange={handleCarChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={carDetails.price}
              onChange={handleCarChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={carDetails.company}
              onChange={handleCarChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="features"
              placeholder="Features"
              value={carDetails.features}
              onChange={handleCarChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="moreDetails"
              placeholder="More Details"
              value={carDetails.moreDetails}
              onChange={handleCarChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="category"
              value={carDetails.category}
              onChange={handleCarChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Category</option>
              {categoryList.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded shadow hover:bg-blue-600 transition">
              {editingCarId ? 'Update Car' : 'Add Car'}
            </button>
          </form>
        </div>

        {/* Add/Edit Part Form */}
        <div id="add-part" className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add/Edit Part</h2>
          <form onSubmit={(e) => handleSubmit(e, 'part')}>
            <input
              type="text"
              name="partNumber"
              placeholder="Part Number"
              value={partDetails.partNumber}
              onChange={handlePartChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={partDetails.image}
              onChange={handlePartChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="details"
              placeholder="Details"
              value={partDetails.details}
              onChange={handlePartChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="category"
              value={partDetails.category}
              onChange={handlePartChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Category</option>
              {categoryList.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded shadow hover:bg-blue-600 transition">
              {editingPartId ? 'Update Part' : 'Add Part'}
            </button>
          </form>
        </div>

        {/* Statistics Section */}
        <div id="statistics" className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Car Prices</h3>
              <Bar data={carData} options={{ responsive: true }} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Parts Distribution</h3>
              <Pie data={partData} options={{ responsive: true }} />
            </div>
          </div>
        </div>

        {/* Car List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Car List</h2>
          <ul>
            {carList.map((car) => (
              <li key={car._id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-2 transition-transform transform hover:scale-105">
                <span className="text-gray-700">{car.model} - ${car.price}</span>
                <div>
                  <button onClick={() => handleEditCar(car)} className="bg-yellow-500 text-white p-2 mr-2 rounded shadow hover:bg-yellow-600 transition">Edit</button>
                  <button onClick={() => handleDeleteCar(car._id)} className="bg-red-500 text-white p-2 rounded shadow hover:bg-red-600 transition">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Part List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Part List</h2>
          <ul>
            {partList.map((part) => (
              <li key={part._id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-2 transition-transform transform hover:scale-105">
                <span className="text-gray-700">{part.partNumber}</span>
                <div>
                  <button onClick={() => handleEditPart(part)} className="bg-yellow-500 text-white p-2 mr-2 rounded shadow hover:bg-yellow-600 transition">Edit</button>
                  <button onClick={() => handleDeletePart(part._id)} className="bg-red-500 text-white p-2 rounded shadow hover:bg-red-600 transition">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;






































// import React, { useState, useEffect } from 'react';
// import { Bar, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register necessary components
// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// const AdminPanel = () => {
//   const [carDetails, setCarDetails] = useState({
//     model: '',
//     image: '',
//     price: '',
//     company: '',
//     features: '',
//     moreDetails: '',
//     category: '',
//   });

//   const [partDetails, setPartDetails] = useState({
//     partNumber: '',
//     image: '',
//     details: '',
//     category: '',
//   });

//   const [carList, setCarList] = useState([]);
//   const [partList, setPartList] = useState([]);
//   const [categoryList] = useState(['Sedan', 'SUV', 'Truck', 'Accessory']);
//   const [editingCarId, setEditingCarId] = useState(null);
//   const [editingPartId, setEditingPartId] = useState(null);

//   const apiBaseUrl = 'http://localhost:5000/api'; // Update this to your actual API URL

//   useEffect(() => {
//     fetchCars();
//     fetchParts();
//   }, []);

//   const fetchCars = async () => {
//     try {
//       const response = await fetch(`${apiBaseUrl}/cars`);
//       if (response.ok) {
//         const data = await response.json();
//         setCarList(data);
//       } else {
//         console.error('Error fetching cars:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error fetching cars:', error);
//     }
//   };

//   const fetchParts = async () => {
//     try {
//       const response = await fetch(`${apiBaseUrl}/parts`);
//       if (response.ok) {
//         const data = await response.json();
//         setPartList(data);
//       } else {
//         console.error('Error fetching parts:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error fetching parts:', error);
//     }
//   };

//   const handleCarChange = (e) => {
//     const { name, value } = e.target;
//     setCarDetails({ ...carDetails, [name]: value });
//   };

//   const handlePartChange = (e) => {
//     const { name, value } = e.target;
//     setPartDetails({ ...partDetails, [name]: value });
//   };

//   const handleEditCar = (car) => {
//     setCarDetails(car);
//     setEditingCarId(car._id);
//   };

//   const handleUpdateCar = async (updatedCarDetails) => {
//     try {
//       const response = await fetch(`${apiBaseUrl}/cars/${editingCarId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedCarDetails),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update car details');
//       }

//       const updatedCar = await response.json();
      
//       // Update the cars list with the updated car
//       setCarList(prevCars => prevCars.map(car => 
//         car._id === updatedCar._id ? updatedCar : car
//       ));

//       // Reset editing state
//       setEditingCarId(null);
//       setCarDetails({
//         model: '',
//         image: '',
//         price: '',
//         company: '',
//         features: '',
//         moreDetails: '',
//         category: ''
//       });

//       // Show success message
//       alert('Car details updated successfully');
//     } catch (error) {
//       console.error('Error updating car details:', error);
//       alert('Failed to update car details. Please try again.');
//     }
//   };

//   const handleEditPart = (part) => {
//     setPartDetails(part);
//     setEditingPartId(part._id);
//   };

//   const handleSubmit = async (e, type) => {
//     e.preventDefault();
//     const details = type === 'car' ? carDetails : partDetails;
//     const setDetails = type === 'car' ? setCarDetails : setPartDetails;
//     const list = type === 'car' ? carList : partList;
//     const setList = type === 'car' ? setCarList : setPartList;
//     const editingId = type === 'car' ? editingCarId : editingPartId;
//     const setEditingId = type === 'car' ? setEditingCarId : setEditingPartId;

//     try {
//       const method = editingId ? 'PUT' : 'POST';
//       const url = editingId
//         ? `${apiBaseUrl}/${type}s/${editingId}`
//         : `${apiBaseUrl}/${type}s`;
      
//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(details),
//       });

//       if (response.ok) {
//         const updatedItem = await response.json();
//         if (editingId) {
//           setList(list.map(item => item._id === editingId ? updatedItem : item));
//         } else {
//           setList([...list, updatedItem]);
//         }
//         setDetails(type === 'car'
//           ? { model: '', image: '', price: '', company: '', features: '', moreDetails: '', category: '' }
//           : { partNumber: '', image: '', details: '', category: '' }
//         );
//         setEditingId(null);
//       } else {
//         console.error(`Error submitting ${type}:`, response.statusText);
//       }
//     } catch (error) {
//       console.error(`Error submitting ${type}:`, error);
//     }
//   };

//   const handleDeleteCar = async (id) => {
//     try {
//       const response = await fetch(`${apiBaseUrl}/cars/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         setCarList(carList.filter(car => car._id !== id));
//       } else {
//         console.error('Error deleting car:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error deleting car:', error);
//     }
//   };

//   const handleDeletePart = async (id) => {
//     try {
//       const response = await fetch(`${apiBaseUrl}/parts/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         setPartList(partList.filter(part => part._id !== id));
//       } else {
//         console.error('Error deleting part:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error deleting part:', error);
//     }
//   };

//   const carData = {
//     labels: carList.map(car => car.model || 'Unknown Model'),
//     datasets: [
//       {
//         label: 'Car Prices',
//         data: carList.map(car => car.price || 0),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       },
//     ],
//   };

//   const partData = {
//     labels: partList.map(part => part.partNumber || 'Unknown Part'),
//     datasets: [
//       {
//         label: 'Parts Distribution',
//         data: partList.map(() => 1),
//         backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
//       },
//     ],
//   };

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       {/* Sidebar */}
//       <div className="bg-white w-64 p-6 shadow-lg">
//         <h1 className="text-2xl font-bold text-center mb-4">Admin Panel</h1>
//         <ul className="space-y-4">
//           <li><a href="#add-car" className="text-gray-600 hover:text-blue-500">Add Car</a></li>
//           <li><a href="#add-part" className="text-gray-600 hover:text-blue-500">Add Part</a></li>
//           <li><a href="#statistics" className="text-gray-600 hover:text-blue-500">Statistics</a></li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         {/* Car Form */}
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//           <h2 id="add-car" className="text-3xl font-semibold text-gray-800 mb-4">{editingCarId ? 'Edit Car' : 'Add Car'}</h2>
//           <form onSubmit={(e) => {
//             e.preventDefault();
//             handleUpdateCar(carDetails);
//           }}>
//             <input type="text" name="model" value={carDetails.model} onChange={handleCarChange} placeholder="Model" required className="border p-2 w-full mb-4" />
//             <input type="text" name="image" value={carDetails.image} onChange={handleCarChange} placeholder="Image URL" required className="border p-2 w-full mb-4" />
//             <input type="number" name="price" value={carDetails.price} onChange={handleCarChange} placeholder="Price" required className="border p-2 w-full mb-4" />
//             <input type="text" name="company" value={carDetails.company} onChange={handleCarChange} placeholder="Company" required className="border p-2 w-full mb-4" />
//             <textarea name="features" value={carDetails.features} onChange={handleCarChange} placeholder="Features" required className="border p-2 w-full mb-4" />
//             <textarea name="moreDetails" value={carDetails.moreDetails} onChange={handleCarChange} placeholder="More Details" required className="border p-2 w-full mb-4" />
//             <select name="category" value={carDetails.category} onChange={handleCarChange} required className="border p-2 w-full mb-4">
//               <option value="" disabled>Select Category</option>
//               {categoryList.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
//               {editingCarId ? 'Update Car' : 'Add Car'}
//             </button>
//           </form>
//         </div>

//         {/* Car List */}
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Car List</h2>
//           <ul>
//             {carList.map(car => (
//               <li key={car._id} className="border p-4 mb-2 flex justify-between items-center">
//                 <div>
//                   <strong>{car.model}</strong> - {car.company} - ${car.price}
//                 </div>
//                 <div>
//                   <button onClick={() => handleEditCar(car)} className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2">Edit</button>
//                   <button onClick={() => handleDeleteCar(car._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Part Form */}
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//           <h2 id="add-part" className="text-3xl font-semibold text-gray-800 mb-4">Add Part</h2>
//           <form onSubmit={(e) => handleSubmit(e, 'part')}>
//             <input type="text" name="partNumber" value={partDetails.partNumber} onChange={handlePartChange} placeholder="Part Number" required className="border p-2 w-full mb-4" />
//             <input type="text" name="image" value={partDetails.image} onChange={handlePartChange} placeholder="Image URL" required className="border p-2 w-full mb-4" />
//             <textarea name="details" value={partDetails.details} onChange={handlePartChange} placeholder="Details" required className="border p-2 w-full mb-4" />
//             <select name="category" value={partDetails.category} onChange={handlePartChange} required className="border p-2 w-full mb-4">
//               <option value="" disabled>Select Category</option>
//               {categoryList.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Part</button>
//           </form>
//         </div>

//         {/* Part List */}
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Part List</h2>
//           <ul>
//             {partList.map(part => (
//               <li key={part._id} className="border p-4 mb-2 flex justify-between items-center">
//                 <div>
//                   <strong>{part.partNumber}</strong> - {part.category}
//                 </div>
//                 <div>
//                   <button onClick={() => handleEditPart(part)} className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2">Edit</button>
//                   <button onClick={() => handleDeletePart(part._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Statistics */}
//         <div id="statistics" className="bg-white shadow-lg rounded-lg p-6 mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Statistics</h2>
//           <div className="flex space-x-8">
//             <div className="w-1/2">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Car Prices</h3>
//               <Bar data={carData} />
//             </div>
//             <div className="w-1/2">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Parts Distribution</h3>
//               <Pie data={partData} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;




// import React, { useState, useEffect } from 'react';
// import { Bar, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register necessary components
// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// const AdminPanel = () => {
//   const [carDetails, setCarDetails] = useState({
//     model: '',
//     image: '',
//     price: '',
//     company: '',
//     features: '',
//     moreDetails: '',
//     category: '',
//   });

//   const [partDetails, setPartDetails] = useState({
//     partNumber: '',
//     image: '',
//     details: '',
//     category: '',
//   });

//   const [carList, setCarList] = useState([]);
//   const [partList, setPartList] = useState([]);
//   const [categoryList] = useState(['Sedan', 'SUV', 'Truck', 'Accessory']);
//   const [editingCarId, setEditingCarId] = useState(null);
//   const [editingPartId, setEditingPartId] = useState(null);

//   const apiBaseUrl = 'http://localhost:5000/api'; // Update this to your actual API URL

//   useEffect(() => {
//     fetchCars();
//     fetchParts();
//   }, []);

//   const fetchCars = async () => {
//     try {
//       const response = await fetch(`${apiBaseUrl}/cars`);
//       if (response.ok) {
//         const data = await response.json();
//         setCarList(data);
//       } else {
//         console.error('Error fetching cars:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error fetching cars:', error);
//     }
//   };

//   const fetchParts = async () => {
//     try {
//       const response = await fetch(`${apiBaseUrl}/parts`);
//       if (response.ok) {
//         const data = await response.json();
//         setPartList(data);
//       } else {
//         console.error('Error fetching parts:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error fetching parts:', error);
//     }
//   };

//   const handleCarChange = (e) => {
//     const { name, value } = e.target;
//     setCarDetails({ ...carDetails, [name]: value });
//   };

//   const handlePartChange = (e) => {
//     const { name, value } = e.target;
//     setPartDetails({ ...partDetails, [name]: value });
//   };

//   const handleEditCar = (car) => {
//     setCarDetails(car);
//     setEditingCarId(car._id);
//   };

//   const handleUpdateCar = async (updatedCarDetails) => {
//     try {
//       const response = await fetch(`/api/cars/${editingCarId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedCarDetails),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update car details');
//       }

//       const updatedCar = await response.json();
      
//       // Update the cars list with the updated car
//       setCarList(prevCars => prevCars.map(car => 
//         car._id === updatedCar._id ? updatedCar : car
//       ));

//       // Reset editing state
//       setEditingCarId(null);
//       setCarDetails(null);

//       // Show success message
//       alert('Car details updated successfully');
//     } catch (error) {
//       console.error('Error updating car details:', error);
//       alert('Failed to update car details. Please try again.');
//     }
//   };

//   const handleEditPart = (part) => {
//     setPartDetails(part);
//     setEditingPartId(part._id);
//   };

//   const handleSubmit = async (e, type) => {
//     e.preventDefault();
//     const details = type === 'car' ? carDetails : partDetails;
//     const setDetails = type === 'car' ? setCarDetails : setPartDetails;
//     const list = type === 'car' ? carList : partList;
//     const setList = type === 'car' ? setCarList : setPartList;
//     const editingId = type === 'car' ? editingCarId : editingPartId;
//     const setEditingId = type === 'car' ? setEditingCarId : setEditingPartId;

//     try {
//       const method = editingId ? 'PUT' : 'POST';
//       const url = editingId
//         ? `${apiBaseUrl}/${type}s/${editingId}`
//         : `${apiBaseUrl}/${type}s`;
      
//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(details),
//       });

//       if (response.ok) {
//         const updatedItem = await response.json();
//         if (editingId) {
//           setList(list.map(item => item._id === editingId ? updatedItem : item));
//         } else {
//           setList([...list, updatedItem]);
//         }
//         setDetails(type === 'car'
//           ? { model: '', image: '', price: '', company: '', features: '', moreDetails: '', category: '' }
//           : { partNumber: '', image: '', details: '', category: '' }
//         );
//         setEditingId(null);
//       } else {
//         console.error(`Error submitting ${type}:`, response.statusText);
//       }
//     } catch (error) {
//       console.error(`Error submitting ${type}:`, error);
//     }
//   };

//   const handleDeleteCar = async (id) => {
//     try {
//       const response = await fetch(`${apiBaseUrl}/cars/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         setCarList(carList.filter(car => car._id !== id));
//       } else {
//         console.error('Error deleting car:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error deleting car:', error);
//     }
//   };

//   const handleDeletePart = async (id) => {
//     try {
//       const response = await fetch(`${apiBaseUrl}/parts/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         setPartList(partList.filter(part => part._id !== id));
//       } else {
//         console.error('Error deleting part:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error deleting part:', error);
//     }
//   };

//   const carData = {
//     labels: carList.map(car => car.model || 'Unknown Model'),
//     datasets: [
//       {
//         label: 'Car Prices',
//         data: carList.map(car => car.price || 0),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       },
//     ],
//   };

//   const partData = {
//     labels: partList.map(part => part.partNumber || 'Unknown Part'),
//     datasets: [
//       {
//         label: 'Parts Distribution',
//         data: partList.map(() => 1),
//         backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
//       },
//     ],
//   };

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       {/* Sidebar */}
//       <div className="bg-white w-64 p-6 shadow-lg">
//         <h1 className="text-2xl font-bold text-center mb-4">Admin Panel</h1>
//         <ul className="space-y-4">
//           <li><a href="#add-car" className="text-gray-600 hover:text-blue-500">Add Car</a></li>
//           <li><a href="#add-part" className="text-gray-600 hover:text-blue-500">Add Part</a></li>
//           <li><a href="#statistics" className="text-gray-600 hover:text-blue-500">Statistics</a></li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         {/* Car Form */}
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//           <h2 id="add-car" className="text-3xl font-semibold text-gray-800 mb-4">{editingCarId ? 'Edit Car' : 'Add Car'}</h2>
//           <form onSubmit={(e) => {
//             e.preventDefault();
//             handleUpdateCar(carDetails);
//           }}>
//             <input type="text" name="model" value={carDetails.model} onChange={handleCarChange} placeholder="Model" required className="border p-2 w-full mb-4" />
//             <input type="text" name="image" value={carDetails.image} onChange={handleCarChange} placeholder="Image URL" required className="border p-2 w-full mb-4" />
//             <input type="number" name="price" value={carDetails.price} onChange={handleCarChange} placeholder="Price" required className="border p-2 w-full mb-4" />
//             <input type="text" name="company" value={carDetails.company} onChange={handleCarChange} placeholder="Company" required className="border p-2 w-full mb-4" />
//             <textarea name="features" value={carDetails.features} onChange={handleCarChange} placeholder="Features" required className="border p-2 w-full mb-4" />
//             <textarea name="moreDetails" value={carDetails.moreDetails} onChange={handleCarChange} placeholder="More Details" required className="border p-2 w-full mb-4" />
//             <select name="category" value={carDetails.category} onChange={handleCarChange} required className="border p-2 w-full mb-4">
//               <option value="">Select Category</option>
//               {categoryList.map((category, index) => (
//                 <option key={index} value={category}>{category}</option>
//               ))}
//             </select>
//             <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
//               {editingCarId ? 'Update Car' : 'Add Car'}
//             </button>
//           </form>
//         </div>

//         {/* Part Form */}
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//           <h2 id="add-part" className="text-3xl font-semibold text-gray-800 mb-4">{editingPartId ? 'Edit Part' : 'Add Part'}</h2>
//           <form onSubmit={(e) => handleSubmit(e, 'part')}>
//             <input type="text" name="partNumber" value={partDetails.partNumber} onChange={handlePartChange} placeholder="Part Number" required className="border p-2 w-full mb-4" />
//             <input type="text" name="image" value={partDetails.image} onChange={handlePartChange} placeholder="Image URL" required className="border p-2 w-full mb-4" />
//             <textarea name="details" value={partDetails.details} onChange={handlePartChange} placeholder="Details" required className="border p-2 w-full mb-4" />
//             <select name="category" value={partDetails.category} onChange={handlePartChange} required className="border p-2 w-full mb-4">
//               <option value="">Select Category</option>
//               {categoryList.map((category, index) => (
//                 <option key={index} value={category}>{category}</option>
//               ))}
//             </select>
//             <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
//               {editingPartId ? 'Update Part' : 'Add Part'}
//             </button>
//           </form>
//         </div>

//         {/* Cars List */}
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Cars List</h2>
//           <div className="space-y-4">
//             {carList.map((car) => (
//               <div key={car._id} className="border rounded-lg p-4 flex justify-between items-center">
//                 <div>
//                   <h4 className="font-bold">{car.model} ({car.category})</h4>
//                   <p>Price: ${car.price}</p>
//                 </div>
//                 <div>
//                   <button onClick={() => handleEditCar(car)} className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
//                   <button onClick={() => handleDeleteCar(car._id)} className="text-red-500 hover:text-red-700">Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Parts List */}
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Parts List</h2>
//           <div className="space-y-4">
//             {partList.map((part) => (
//               <div key={part._id} className="border rounded-lg p-4 flex justify-between items-center">
//                 <div>
//                   <h4 className="font-bold">{part.partNumber} ({part.category})</h4>
//                 </div>
//                 <div>
//                   <button onClick={() => handleEditPart(part)} className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
//                   <button onClick={() => handleDeletePart(part._id)} className="text-red-500 hover:text-red-700">Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Statistics */}
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-8" id="statistics">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Statistics</h2>
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <h3 className="text-xl font-semibold">Car Prices</h3>
//               <Bar data={carData} />
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold">Parts Distribution</h3>
//               <Pie data={partData} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;