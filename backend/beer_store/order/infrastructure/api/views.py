from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from beer_store.order.application.services import OrderService
from beer_store.order.infrastructure.repositories import InMemoryOrderRepository


class OrderView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        order_repo = InMemoryOrderRepository()
        self.order_service = OrderService(order_repo)

    def _order_to_dict(self, order):
        return {
            "id": order.id,
            "created": order.created,
            "paid": order.paid,
            "subtotal": order.subtotal,
            "taxes": order.taxes,
            "discounts": order.discounts,
            "items": [self._item_to_dict(item) for item in order.items],
            "rounds": [self._round_to_dict(round) for round in order.rounds]
        }

    def _item_to_dict(self, item):
        return {
            "name": item.name,
            "quantity": item.quantity,
            "price_per_unit": item.price_per_unit,
            "total": item.total
        }

    def _round_to_dict(self, round):
        return {
            "created": round.created,
            "items": [self._item_to_dict(item) for item in round.items]
        }


class OrderListView(OrderView):
    def get(self, request):
        orders = self.order_service.get_all_orders()
        return Response([self._order_to_dict(order) for order in orders])


class OrderDetailView(OrderView):
    def get(self, request, order_id):
        try:
            order = self.order_service.get_order(order_id)
            return Response(self._order_to_dict(order))
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
