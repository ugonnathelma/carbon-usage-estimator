import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../../redux/reducer";

const sagaMiddleware = createSagaMiddleware();
export const createTestStore = () => {
  return createStore(rootReducer, applyMiddleware(sagaMiddleware));
};
