import React from "react";
import { render, screen } from "@testing-library/react";
import OrderList from "../OrderList";
import { useOrders } from "@/hooks/useOrders";

jest.mock("@/hooks/useOrders");

describe("OrderList", () => {
  it("should render loading state", () => {
    (useOrders as jest.Mock).mockReturnValue({ isLoading: true });
    render(<OrderList />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useOrders as jest.Mock).mockReturnValue({
      error: new Error("Failed to fetch"),
    });
    render(<OrderList />);
    expect(screen.getByText("Error al cargar las órdenes")).toBeInTheDocument();
  });

  it("should render orders", () => {
    const mockOrders = [
      {
        id: "1",
        created: "2023-01-01T00:00:00Z",
        subtotal: 100,
        taxes: 10,
        discounts: 5,
        paid: true,
      },
      {
        id: "2",
        created: "2023-01-02T00:00:00Z",
        subtotal: 200,
        taxes: 20,
        discounts: 10,
        paid: false,
      },
    ];
    (useOrders as jest.Mock).mockReturnValue({ data: mockOrders });
    render(<OrderList />);
    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText("#2")).toBeInTheDocument();
    expect(screen.getByText("$105.00")).toBeInTheDocument();
    expect(screen.getByText("$210.00")).toBeInTheDocument();
    expect(screen.getByText("Pagado")).toBeInTheDocument();
    expect(screen.getByText("Pendiente")).toBeInTheDocument();
  });
});
