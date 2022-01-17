import React from "react";
import { fireEvent, screen } from "@testing-library/react";

import { ConnectedForm } from "./Form";
import { renderWithProvider } from "../../utils/tests/renderWithProvider";
import * as actions from "../../redux/actions";

test("renders Form", () => {
  renderWithProvider(<ConnectedForm />);

  expect(screen.getByText("Carbon Usage Estimator")).toBeInTheDocument();

  expect(screen.getByTestId("electricity_unit")).toBeInTheDocument();
  expect(screen.getByRole("electricity-usage-input")).toBeInTheDocument();
  expect(screen.getByRole("location-dropdown")).toBeInTheDocument();
  expect(screen.getByTestId("submit-button")).toBeInTheDocument();
});

test("enables submit when required fields are valid", async () => {
  renderWithProvider(<ConnectedForm />);

  expect(screen.getByTestId("submit-button")).toBeDisabled();

  fireEvent.change(screen.getByRole("electricity-usage-input"), {
    target: { value: 0.2 },
  });
  expect(screen.getByTestId("submit-button")).toBeDisabled();

  const locationSelect = screen.getByRole("location-dropdown");

  fireEvent.mouseDown(locationSelect);
  fireEvent.click(screen.getByText("Cyprus"));

  expect(screen.getByTestId("submit-button")).not.toBeDisabled();
});

test("disables if fields are invalid", async () => {
  renderWithProvider(<ConnectedForm />);

  const locationSelect = screen.getByRole("location-dropdown");

  fireEvent.mouseDown(locationSelect);
  fireEvent.click(screen.getByText("Finland"));

  fireEvent.change(screen.getByRole("electricity-usage-input"), {
    target: { value: "f" },
  });
  expect(screen.getByTestId("submit-button")).toBeDisabled();

  fireEvent.change(screen.getByRole("electricity-usage-input"), {
    target: { value: "-1" },
  });
  expect(screen.getByTestId("submit-button")).toBeDisabled();

  fireEvent.change(screen.getByRole("electricity-usage-input"), {
    target: { value: "0.2" },
  });
  expect(screen.getByTestId("submit-button")).not.toBeDisabled();

  fireEvent.change(screen.getByRole("electricity-usage-input"), {
    target: { value: "0.2x" },
  });
  expect(screen.getByTestId("submit-button")).toBeDisabled();
});

test("submits form on button click", async () => {
  renderWithProvider(<ConnectedForm />);

  fireEvent.change(screen.getByRole("electricity-usage-input"), {
    target: { value: "0.2" },
  });

  const locationSelect = screen.getByRole("location-dropdown");

  fireEvent.mouseDown(locationSelect);
  fireEvent.click(screen.getByText("Germany"));

  expect(screen.getByTestId("submit-button")).not.toBeDisabled();

  const spy = jest.spyOn(actions, "submitFormWithValues");
  fireEvent.click(screen.getByTestId("submit-button"));

  expect(spy).toHaveBeenCalledWith({
    electricityUnit: "mwh",
    electricityUsage: "0.2",
    location: "DE",
  });
});
