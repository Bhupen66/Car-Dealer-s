import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Mock QR Code Image (Replace this with an actual QR code)


const Payment = () => {
  const navigate = useNavigate();

  // State for payment details
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  });

  // State to toggle between QR code and payment form
  const [showQRCode, setShowQRCode] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  // Simple validation
  const validatePayment = () => {
    const { cardNumber, cardName, expiryDate, cvv, billingAddress } = paymentDetails;
    if (!cardNumber || !cardName || !expiryDate || !cvv || !billingAddress) {
      toast.error('Please fill out all fields', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    }
    if (cardNumber.length !== 16) {
      toast.error('Card number must be 16 digits', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    }
    if (cvv.length !== 3) {
      toast.error('CVV must be 3 digits', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePayment()) {
      toast.success('Payment successful!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      navigate('/confirmation'); // Replace with actual confirmation route
    }
  };

  // Toggle between QR Code and Payment Form
  const toggleQRCode = () => {
    setShowQRCode(!showQRCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-pink-100 p-10 flex flex-col items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Payment</h1>

        {/* Button to toggle between QR Code and Payment Form */}
        <div className="text-center mb-6">
          <button
            onClick={toggleQRCode}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {showQRCode ? 'Switch to Payment Form' : 'Switch to QR Code'}
          </button>
        </div>

        {/* Conditionally render QR Code or Payment Information */}
        {showQRCode ? (
          // QR Code Section
          <div className="mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Scan to Pay</h2>
            <div className="flex justify-center">
              <img src="/public/image/qr.jpg" alt="QR Code" className="w-64 h-64" />
            </div>
            <p className="text-center text-gray-500 mt-4">Scan the QR code to complete the payment.</p>
          </div>
        ) : (
          // Payment Form
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Number */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                maxLength="16"
                placeholder="1234 5678 9101 1121"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 bg-white/50"
                required
              />
            </div>

            {/* Cardholder Name */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Cardholder Name</label>
              <input
                type="text"
                name="cardName"
                value={paymentDetails.cardName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 bg-white/50"
                required
              />
            </div>

            {/* Expiry Date */}
            <div className="flex space-x-4">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="month"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 bg-white/50"
                  required
                />
              </div>

              {/* CVV */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleChange}
                  maxLength="3"
                  placeholder="123"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 bg-white/50"
                  required
                />
              </div>
            </div>

            {/* Billing Address */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Billing Address</label>
              <input
                type="text"
                name="billingAddress"
                value={paymentDetails.billingAddress}
                onChange={handleChange}
                placeholder="1234 Main St, City, Country"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 bg-white/50"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg shadow-lg hover:from-green-600 hover:to-teal-600 transition-transform transform hover:scale-105 text-lg font-semibold"
            >
              Complete Payment
            </button>
          </form>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Payment;

















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Payment = () => {
//   const navigate = useNavigate();

//   // State for payment details
//   const [paymentDetails, setPaymentDetails] = useState({
//     cardNumber: '',
//     cardName: '',
//     expiryDate: '',
//     cvv: '',
//     billingAddress: ''
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails({ ...paymentDetails, [name]: value });
//   };

//   // Simple validation
//   const validatePayment = () => {
//     const { cardNumber, cardName, expiryDate, cvv, billingAddress } = paymentDetails;
//     if (!cardNumber || !cardName || !expiryDate || !cvv || !billingAddress) {
//       toast.error('Please fill out all fields', {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         draggable: true,
//       });
//       return false;
//     }
//     if (cardNumber.length !== 16) {
//       toast.error('Card number must be 16 digits', {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         draggable: true,
//       });
//       return false;
//     }
//     if (cvv.length !== 3) {
//       toast.error('CVV must be 3 digits', {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         draggable: true,
//       });
//       return false;
//     }
//     return true;
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validatePayment()) {
//       // Simulate payment processing
//       toast.success('Payment successful!', {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         draggable: true,
//       });
//       navigate('/confirmation'); // Replace with actual confirmation route
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-pink-100 p-10 flex flex-col items-center">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Payment Information</h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Card Number */}
//           <div>
//             <label className="block text-lg font-medium text-gray-700 mb-2">Card Number</label>
//             <input
//               type="text"
//               name="cardNumber"
//               value={paymentDetails.cardNumber}
//               onChange={handleChange}
//               maxLength="16"
//               placeholder="1234 5678 9101 1121"
//               className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 bg-white/50"
//               required
//             />
//           </div>

//           {/* Cardholder Name */}
//           <div>
//             <label className="block text-lg font-medium text-gray-700 mb-2">Cardholder Name</label>
//             <input
//               type="text"
//               name="cardName"
//               value={paymentDetails.cardName}
//               onChange={handleChange}
//               placeholder="John Doe"
//               className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 bg-white/50"
//               required
//             />
//           </div>

//           {/* Expiry Date */}
//           <div className="flex space-x-4">
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-2">Expiry Date</label>
//               <input
//                 type="month"
//                 name="expiryDate"
//                 value={paymentDetails.expiryDate}
//                 onChange={handleChange}
//                 className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 bg-white/50"
//                 required
//               />
//             </div>

//             {/* CVV */}
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-2">CVV</label>
//               <input
//                 type="text"
//                 name="cvv"
//                 value={paymentDetails.cvv}
//                 onChange={handleChange}
//                 maxLength="3"
//                 placeholder="123"
//                 className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 bg-white/50"
//                 required
//               />
//             </div>
//           </div>

//           {/* Billing Address */}
//           <div>
//             <label className="block text-lg font-medium text-gray-700 mb-2">Billing Address</label>
//             <input
//               type="text"
//               name="billingAddress"
//               value={paymentDetails.billingAddress}
//               onChange={handleChange}
//               placeholder="1234 Main St, City, Country"
//               className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 bg-white/50"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg shadow-lg hover:from-green-600 hover:to-teal-600 transition-transform transform hover:scale-105 text-lg font-semibold"
//           >
//             Complete Payment
//           </button>
//         </form>

//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default Payment;
