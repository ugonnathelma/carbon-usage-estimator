import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App", () => {
  render(<App />);
  const chartElement = screen.getByTestId("chart");
  expect(chartElement).toBeInTheDocument();
  const formElement = screen.getByTestId("form");
  expect(formElement).toBeInTheDocument();
});
