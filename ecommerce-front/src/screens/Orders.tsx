import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const OrdersPage = () => {
  const [orders, setOrders] = useState<
    { id: string; items: Product[]; total: number }[]
  >([]);
  useEffect(() => {
    async function getOrders() {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data.orders);
      } catch (error) {
        // eslint-disable-next-line
        console.log({ error });
      }
    }

    getOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 pt-24">
      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="grid gap-6">
          <Link className="flex items-center gap-4" to="/">
            <span className="text-xl">←</span>
            <h1 className="text-2xl font-bold tracking-tight">
              Continue to shopping
            </h1>
          </Link>
        </div>
      </div>
      {!!orders && orders.length === 0 ? (
        <h1>You still don't have orders</h1>
      ) : (
        <div className="grid gap-4 mt-6">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr className="bg-white border-b " key={order.id}>
                      <td className="px-6 py-4">{order.id}</td>
                      <td className="px-6 py-4">Processing</td>
                      <td className="px-6 py-4 text-right">
                        ${order.total.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
