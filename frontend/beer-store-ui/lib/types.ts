export interface Item {
  name: string;
  quantity: number;
  price_per_unit: number;
  total: number;
}

export interface Round {
  created: string;
  items: Item[];
}

export interface Order {
  id: string;
  created: string;
  paid: boolean;
  subtotal: number;
  taxes: number;
  discounts: number;
  items: Item[];
  rounds: Round[];
}
