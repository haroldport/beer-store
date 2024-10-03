import { useQuery } from "react-query";
import { getOrders, getOrderById } from "../lib/api";

export const useOrders = () => {
  return useQuery("orders", getOrders);
};

export const useOrder = (id: string) => {
  return useQuery(["order", id], () => getOrderById(id));
};
