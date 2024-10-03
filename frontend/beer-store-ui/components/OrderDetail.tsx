'use client'

import { useOrder } from '@/hooks/useOrders';
import React from 'react';

interface OrderDetailProps {
  id: string;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ id }) => {
  const { data: order, isLoading, error } = useOrder(id);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar la orden</div>;
  if (!order) return null;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Orden #{order.id}</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="mb-2">Fecha: {new Date(order.created).toLocaleString()}</p>
        <p className="mb-2">Estado: {order.paid ? 'Pagado' : 'Pendiente'}</p>
        <p className="mb-2">Subtotal: ${order.subtotal.toFixed(2)}</p>
        <p className="mb-2">Impuestos: ${order.taxes.toFixed(2)}</p>
        <p className="mb-2">Descuentos: ${order.discounts.toFixed(2)}</p>
        <p className="mb-4 font-semibold">Total: ${(order.subtotal + order.taxes - order.discounts).toFixed(2)}</p>

        <h2 className="text-xl font-semibold mb-2">Artículos</h2>
        <ul className="mb-4">
          {order.items.map((item, index) => (
            <li key={index} className="mb-2">
              {item.name} - {item.quantity} x ${item.price_per_unit.toFixed(2)} = ${item.total.toFixed(2)}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-2">Rondas</h2>
        {order.rounds.map((round, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">Ronda {index + 1} - {new Date(round.created).toLocaleString()}</h3>
            <ul>
              {round.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item.name} - {item.quantity}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;