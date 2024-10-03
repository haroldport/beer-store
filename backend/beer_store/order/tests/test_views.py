from rest_framework.test import APITestCase, APIClient
from beer_store.order.infrastructure.api.views import OrderListView, OrderDetailView
from beer_store.order.domain.models import Order
from datetime import datetime


class MockOrderService:
    def get_all_orders(self):
        return [
            Order(id="1", created=datetime.now()),
            Order(id="2", created=datetime.now())
        ]

    def get_order(self, order_id):
        if order_id == "1":
            return Order(id="1", created=datetime.now())
        raise ValueError("Order not found")


class OrderViewTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.mock_service = MockOrderService()

    def test_list_orders(self):
        view = OrderListView()
        view.order_service = self.mock_service
        response = view.get(None)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_get_order(self):
        view = OrderDetailView()
        view.order_service = self.mock_service
        response = view.get(None, order_id="1")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], "1")

    def test_get_non_existent_order(self):
        view = OrderDetailView()
        view.order_service = self.mock_service
        response = view.get(None, order_id="non_existent")

        self.assertEqual(response.status_code, 404)
