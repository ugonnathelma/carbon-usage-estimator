import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { AppSaga } from "./sagas";

import rootReducer from "./reducer";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(AppSaga);

export default store;
