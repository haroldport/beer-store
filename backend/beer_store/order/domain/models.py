from dataclasses import dataclass, field
from typing import List
from datetime import datetime
from beer_store.item.domain.models import Item


@dataclass
class Round:
    created: datetime
    items: List[Item]


@dataclass
class Order:
    id: str
    created: datetime
    paid: bool = False
    subtotal: float = 0
    taxes: float = 0
    discounts: float = 0
    items: List[Item] = field(default_factory=list)
    rounds: List[Round] = field(default_factory=list)

    def add_round(self, round: Round):
        self.rounds.append(round)
        for item in round.items:
            existing_item = next(
                (i for i in self.items if i.name == item.name), None)
            if existing_item:
                existing_item.quantity += item.quantity
                existing_item.total += item.total
            else:
                self.items.append(item)
        self.calculate_totals()

    def calculate_totals(self):
        self.subtotal = sum(item.total for item in self.items)
