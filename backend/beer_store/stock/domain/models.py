from dataclasses import dataclass, field
from typing import List
from datetime import datetime


@dataclass
class Beer:
    name: str
    price: float
    quantity: int


@dataclass
class Stock:
    last_updated: datetime
    beers: List[Beer] = field(default_factory=list)
