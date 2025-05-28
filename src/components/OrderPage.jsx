import { useEffect, useState } from 'react';
import axios from 'axios';

function OrderPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get('https://netbackend-efeae5gcgad3hbf6.canadacentral-01.azurewebsites.net/order', {
      withCredentials: true, // Allow sending cookies/auth if needed
    })
    .then((response) => {
      setOrder(response.data);
    })
    .catch((error) => {
      console.error('Error fetching order data', error);
    });
  }, []);

  if (!order) {
    return <p>Loading order details...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Order Summary</h2>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Order ID:</span> {order.orderId}</p>
          <p><span className="font-semibold">Product:</span> {order.productName}</p>
          <p><span className="font-semibold">Quantity:</span> {order.quantity}</p>
          <p><span className="font-semibold">Price:</span> ₹{order.price}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
