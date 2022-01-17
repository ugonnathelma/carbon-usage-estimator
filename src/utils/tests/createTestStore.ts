import { createStore } from "redux";

import rootReducer from "../../redux/reducer";

export const createTestStore = () => {
  return createStore(rootReducer);
};
