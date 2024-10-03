'use client'

import React from 'react';
import Link from 'next/link';
import { useOrders } from '@/hooks/useOrders';

const OrderList: React.FC = () => {
  const { data: orders, isLoading, error } = useOrders();
  console.log('orders', orders);
  console.log('isLoading', isLoading);
  console.log('error', error);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar las órdenes</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Órdenes</h1>
      <ul className="space-y-4">
        {orders?.map((order) => (
          <li key={order.id} className="bg-white shadow rounded-lg p-4">
            <Link href={`/orders/${order.id}`}>
              <h2 className="text-xl font-semibold">Orden #{order.id}</h2>
              <p className="text-gray-600">Fecha: {new Date(order.created).toLocaleString()}</p>
              <p className="text-gray-600">Total: ${order.subtotal.toFixed(2)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;