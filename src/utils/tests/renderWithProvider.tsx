import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { createTestStore } from "./createTestStore";

export const testStore = createTestStore();

export const renderWithProvider = (component: ReactNode) => {
  return render(<Provider store={testStore}> {component}</Provider>);
};
