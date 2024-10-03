import pytest
from datetime import datetime
from beer_store.order.domain.models import Order, Round
from beer_store.item.domain.models import Item


def test_order_creation():
    order = Order(id="1", created=datetime.now())
    assert order.id == "1"
    assert not order.paid
    assert order.subtotal == 0
    assert order.taxes == 0
    assert order.discounts == 0
    assert len(order.items) == 0
    assert len(order.rounds) == 0


def test_add_round():
    order = Order(id="1", created=datetime.now())
    items = [
        Item(name="Pilsener", quantity=2, price_per_unit=2.50, total=5.00),
        Item(name="Club Premium", quantity=1, price_per_unit=3.00, total=3.00)
    ]
    round = Round(created=datetime.now(), items=items)

    order.add_round(round)

    assert len(order.rounds) == 1, f"Expected 1 round, but got {
        len(order.rounds)}"
    assert len(order.items) == 2, f"Expected 2 items, but got {
        len(order.items)}"
    assert order.subtotal == 8.00, f"Expected subtotal of 8.00, but got {
        order.subtotal}"


def test_calculate_totals():
    order = Order(id="1", created=datetime.now())
    items = [
        Item(name="Pilsener", quantity=2, price_per_unit=2.50, total=5.00),
        Item(name="Club Premium", quantity=1, price_per_unit=3.00, total=3.00)
    ]
    round = Round(created=datetime.now(), items=items)

    order.add_round(round)
    order.calculate_totals()

    assert order.subtotal == 8.00, f"Expected subtotal of 8.00, but got {
        order.subtotal}"
