from typing import List, Protocol, Optional
from .models import Order


class OrderRepository(Protocol):
    def get_all(self) -> List[Order]:
        ...

    def get_by_id(self, order_id: str) -> Optional[Order]:
        ...
