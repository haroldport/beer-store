"use client";

import React from "react";
import Link from "next/link";
import { useOrders } from "@/hooks/useOrders";

const OrderList: React.FC = () => {
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) return <div className="text-center py-4">Cargando...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">
        Error al cargar las órdenes
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Lista de Órdenes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">
                ID
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">
                Fecha
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">
                Total
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    #{order.id}
                  </Link>
                </td>
                <td className="py-4 px-4 text-gray-500">
                  {new Date(order.created).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">
                  ${(order.subtotal + order.taxes - order.discounts).toFixed(2)}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.paid
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.paid ? "Pagado" : "Pendiente"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
