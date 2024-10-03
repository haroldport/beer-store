import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrderDetail from "../OrderDetail";
import { useOrder } from "@/hooks/useOrders";

jest.mock("@/hooks/useOrders");
jest.mock(
  "next/link",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      children
);

describe("OrderDetail", () => {
  it("should render loading state", () => {
    (useOrder as jest.Mock).mockReturnValue({ isLoading: true });
    render(<OrderDetail id="1" />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useOrder as jest.Mock).mockReturnValue({
      error: new Error("Failed to fetch"),
    });
    render(<OrderDetail id="1" />);
    expect(screen.getByText("Error al cargar la orden")).toBeInTheDocument();
  });

  it("should render order details", () => {
    const mockOrder = {
      id: "1",
      created: "2023-01-01T00:00:00Z",
      subtotal: 100,
      taxes: 10,
      discounts: 5,
      paid: true,
      items: [{ name: "Item 1", quantity: 2, price_per_unit: 50, total: 100 }],
      rounds: [
        {
          created: "2023-01-01T01:00:00Z",
          items: [{ name: "Item 1", quantity: 2 }],
        },
      ],
    };
    (useOrder as jest.Mock).mockReturnValue({ data: mockOrder });
    render(<OrderDetail id="1" />);

    expect(screen.getByText("Resumen de la Orden")).toBeInTheDocument();
    expect(screen.getByText("PAGADO")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
    expect(screen.getByText("$5.00")).toBeInTheDocument();
    expect(screen.getByText("$105.00")).toBeInTheDocument();
    expect(
      screen.getByText(/Item 1.+2.+\$50\.00.+\$100\.00/)
    ).toBeInTheDocument();

    expect(screen.getByText(/Ronda 1/)).toBeInTheDocument();

    const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;

    const roundElement = screen.getByText((content: string) => {
      return content.includes("Ronda 1") && dateRegex.test(content);
    });
    expect(roundElement).toBeInTheDocument();
  });
});
