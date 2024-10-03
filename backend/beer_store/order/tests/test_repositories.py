import pytest
from beer_store.order.infrastructure.repositories import InMemoryOrderRepository
from beer_store.order.domain.models import Order


@pytest.fixture
def in_memory_repo():
    return InMemoryOrderRepository()


def test_get_all(in_memory_repo):
    orders = in_memory_repo.get_all()
    assert len(orders) > 0
    assert all(isinstance(order, Order) for order in orders)


def test_get_by_id(in_memory_repo):
    order = in_memory_repo.get_by_id("1")
    assert order is not None
    assert order.id == "1"


def test_get_non_existent_order(in_memory_repo):
    order = in_memory_repo.get_by_id("non_existent")
    assert order is None
