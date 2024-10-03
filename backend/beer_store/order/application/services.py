from typing import List
from beer_store.order.domain.models import Order
from beer_store.order.domain.protocols import OrderRepository


class OrderService:
    def __init__(self, order_repo: OrderRepository):
        self.order_repo = order_repo

    def get_all_orders(self) -> List[Order]:
        return self.order_repo.get_all()

    def get_order(self, order_id: str) -> Order:
        order = self.order_repo.get_by_id(order_id)
        if not order:
            raise ValueError("Order not found")
        return order
