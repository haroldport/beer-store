"use client";

import { useOrder } from "@/hooks/useOrders";
import Link from "next/link";
import React from "react";

interface OrderDetailProps {
  id: string;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ id }) => {
  const { data: order, isLoading, error } = useOrder(id);

  if (isLoading) return <div className="text-center py-4">Cargando...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">
        Error al cargar la orden
      </div>
    );
  if (!order) return null;

  return (
    <section>
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <Link
          className="mb-8 inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
          href={`/`}
        >
          &larr; Volver
        </Link>

        <div className="flex items-start flex-col gap-6 xl:flex-row ">
          <div className="w-full max-w-sm md:max-w-3xl xl:max-w-sm flex items-start flex-col gap-8 max-xl:mx-auto">
            <div className="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200 ">
                Resumen de la Orden
              </h2>
              <div className="data py-6 border-b border-gray-200">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                    Fecha
                  </p>
                  <p className="font-medium text-lg leading-8 text-gray-900">
                    {new Date(order.created).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">
                    Estado
                  </p>
                  <p
                    className={`font-medium text-lg leading-8 ${
                      order.paid ? "text-green-500" : "text-yellow-500"
                    }`}
                  >
                    {order.paid ? "PAGADO" : "PENDIENTE"}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                    Subtotal
                  </p>
                  <p className="font-medium text-lg leading-8 text-gray-600">
                    ${order.subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                    Impuestos
                  </p>
                  <p className="font-medium text-lg leading-8 text-gray-600">
                    ${order.taxes.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                    Descuentos
                  </p>
                  <p className="font-medium text-lg leading-8 text-gray-600">
                    ${order.discounts.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="total flex items-center justify-between pt-6">
                <p className="font-normal text-xl leading-8 text-black ">
                  Total
                </p>
                <h5 className="font-manrope font-bold text-2xl leading-9 text-indigo-600">
                  ${(order.subtotal + order.taxes - order.discounts).toFixed(2)}
                </h5>
              </div>
            </div>
          </div>
          <div className="w-full max-w-sm md:max-w-3xl max-xl:mx-auto">
            <div className="rounded-3xl p-6 bg-gray-100 border border-gray-100 gap-5 transition-all duration-500 hover:border-gray-400">
              <h2 className="text-xl font-semibold mb-2">Artículos</h2>
              <ul className="mb-4">
                {order.items.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item.name} : {item.quantity} x $
                    {item.price_per_unit.toFixed(2)} = ${item.total.toFixed(2)}
                  </li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold mb-2">Rondas</h2>
              {order.rounds.map((round, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">
                    {`Ronda ${index + 1} : ${new Date(
                      round.created
                    ).toLocaleString()}`}
                  </h3>
                  <ul>
                    {round.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {item.name} : {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
