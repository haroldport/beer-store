import OrderDetail from '@/components/OrderDetail';

export default function OrderPage({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <OrderDetail id={params.id} />
    </main>
  );
}