import rootReducer from "./redux/reducer";

declare global {
  interface ICountries {
    name: string;
    code: string;
  }

  interface IAction {
    type: string;
    payload: any;
  }

  type DefaultRootState = ReturnType<typeof rootReducer>;
}
