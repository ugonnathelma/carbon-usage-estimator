import React from "react";
import { fireEvent, screen } from "@testing-library/react";

import { ConnectedChart } from "./Chart";
import {
  renderWithProvider,
  testStore,
} from "../../utils/tests/renderWithProvider";

import { POST_CARBON_USAGE_SUCCESS } from "../../redux/constants";

test("renders Chart", () => {
  renderWithProvider(<ConnectedChart />);

  expect(screen.getByTestId("chart")).toBeInTheDocument();
  expect(screen.getByRole("filter-dropdown")).toBeInTheDocument();
});

test("renders available estimate countries", () => {
  renderWithProvider(<ConnectedChart />);

  expect(screen.getByTestId("chart")).toBeInTheDocument();
  expect(screen.getByRole("filter-dropdown")).toBeInTheDocument();
  ["fi", "cz", "de"].forEach((country) => {
    testStore.dispatch({
      type: POST_CARBON_USAGE_SUCCESS,
      payload: {
        carbon_g: 772000,
        carbon_kg: 772,
        carbon_lb: 1701.97,
        carbon_mt: 0.77,
        country,
        electricity_unit: "mwh",
        electricity_value: 2,
        estimated_at: "17/01/2022(10:30:00)",
        id: "bd0d97a6-af60-4cb5-b1e7-d108a09ab0a9",
        state: null,
      },
    });
  });
  const filterLocationSelect = screen.getByRole("filter-dropdown");

  fireEvent.mouseDown(filterLocationSelect);

  expect(screen.getByText("Germany")).toBeInTheDocument();
  expect(screen.getByText("Finland")).toBeInTheDocument();
  expect(screen.getByText("Czech Republic")).toBeInTheDocument();
});

test("filters by countries", () => {
  renderWithProvider(<ConnectedChart />);

  expect(screen.getByTestId("chart")).toBeInTheDocument();
  expect(screen.getByRole("filter-dropdown")).toBeInTheDocument();
  ["sk", "us", "us"].forEach((country) => {
    testStore.dispatch({
      type: POST_CARBON_USAGE_SUCCESS,
      payload: {
        carbon_g: 772000,
        carbon_kg: 772,
        carbon_lb: 1701.97,
        carbon_mt: 0.77,
        country,
        electricity_unit: "mwh",
        electricity_value: 2,
        estimated_at: "17/01/2022(10:30:00)",
        id: "bd0d97a6-af60-4cb5-b1e7-d108a09ab0a9",
        state: null,
      },
    });
  });
  const filterLocationSelect = screen.getByRole("filter-dropdown");

  fireEvent.mouseDown(filterLocationSelect);

  fireEvent.click(screen.getByText("United States"));
  expect(testStore.getState().filteredEstimates.length).toBe(2);

  fireEvent.click(screen.getByText("Slovakia"));
  expect(testStore.getState().filteredEstimates.length).toBe(1);
});
