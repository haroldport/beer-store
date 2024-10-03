import axios from "axios";
import { Order } from "./types";

const API_URL = "http://localhost:8000/api";

export const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get(`${API_URL}/orders/`);
  console.log("response", response);
  return response.data;
};

export const getOrderById = async (id: string): Promise<Order> => {
  const response = await axios.get(`${API_URL}/orders/${id}/`);
  return response.data;
};
