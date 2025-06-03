import { useEffect, useState } from "react";
import axios from "axios";

function OrderPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/menu") // update URL as needed
      .then((response) => {
        setMenuItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu data", error);
        setError("Failed to load menu");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading menu...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  // Group items by category
  const groupedByCategory = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
        Restaurant Menu
      </h1>

      {Object.entries(groupedByCategory).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b border-red-400 pb-2">
            {category}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map(({ _id, name, description, price, imageUrl }) => (
              <div
                key={_id}
                className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{name}</h3>
                  {description && (
                    <p className="text-gray-600 mb-4">{description}</p>
                  )}
                  <p className="text-red-600 font-bold text-lg">₹{price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderPage;
