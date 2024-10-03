import json
from typing import Dict, List, Optional
from datetime import datetime
from beer_store.order.domain.models import Order, Round, Item
from beer_store.order.domain.protocols import OrderRepository


class InMemoryOrderRepository(OrderRepository):
    def __init__(self):
        self.orders: Dict[str, Order] = {}
        self._load_sample_data()

    def _load_sample_data(self):
        with open('beer_store/order/infrastructure/data/sample_orders.json', 'r') as file:
            data = json.load(file)
            for order_data in data['orders']:
                order = self._create_order_from_dict(order_data)
                self.orders[order.id] = order

    def _create_order_from_dict(self, order_data: dict) -> Order:
        items = [Item(**item) for item in order_data['items']]
        rounds = [
            Round(
                created=datetime.fromisoformat(round_data['created']),
                items=[Item(**item) for item in round_data['items']]
            ) for round_data in order_data['rounds']
        ]
        return Order(
            id=order_data['id'],
            created=datetime.fromisoformat(order_data['created']),
            paid=order_data['paid'],
            subtotal=order_data['subtotal'],
            taxes=order_data['taxes'],
            discounts=order_data['discounts'],
            items=items,
            rounds=rounds
        )

    def get_all(self) -> List[Order]:
        return list(self.orders.values())

    def get_by_id(self, order_id: str) -> Optional[Order]:
        return self.orders.get(order_id)
