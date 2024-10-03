import pytest
from beer_store.order.application.services import OrderService
from beer_store.order.domain.models import Order
from datetime import datetime


class MockOrderRepository:
    def __init__(self):
        self.orders = {
            "1": Order(id="1", created=datetime.now()),
            "2": Order(id="2", created=datetime.now())
        }

    def get_all(self):
        return list(self.orders.values())

    def get_by_id(self, order_id):
        return self.orders.get(order_id)


@pytest.fixture
def order_service():
    return OrderService(MockOrderRepository())


def test_get_all_orders(order_service):
    orders = order_service.get_all_orders()
    assert len(orders) == 2
    assert all(isinstance(order, Order) for order in orders)


def test_get_order(order_service):
    order = order_service.get_order("1")
    assert order.id == "1"


def test_get_non_existent_order(order_service):
    with pytest.raises(ValueError, match="Order not found"):
        order_service.get_order("non_existent")
