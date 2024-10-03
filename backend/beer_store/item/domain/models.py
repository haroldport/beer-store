from dataclasses import dataclass


@dataclass
class Item:
    name: str
    quantity: int
    price_per_unit: float = 0
    total: float = 0

    def calculate_total(self):
        self.total = self.quantity * self.price_per_unit
