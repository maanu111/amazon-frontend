import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerAnalytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const aclUserData = localStorage.getItem("aclUserData");
  const role = aclUserData ? JSON.parse(aclUserData).role : null;

  if (role !== "superadmin") {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        Access Denied: Management Only
      </div>
    );
  }
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/orders/sales-by-users"
        );
        console.log(response.data);

        setSalesData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (role === "superadmin") {
      fetchSalesData();
    } else {
      setLoading(false);
    }
  }, [role]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-md text-gray-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Customer Analytics
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-sm text-gray-600">User ID</th>

              <th className="px-4 py-2  text-sm text-gray-600">Total Sales</th>
              <th className="px-4 py-2  text-sm text-gray-600">Order Count</th>
            </tr>
          </thead>
          <tbody>
            {salesData.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-sm text-gray-600"
                >
                  No sales data available.
                </td>
              </tr>
            ) : (
              salesData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {item._id}
                  </td>

                  <td className="px-4 py-2 text-sm text-gray-800">
                    ₹{item.totalSales.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {item.count}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerAnalytics;
