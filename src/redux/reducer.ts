import {
  FILTER_BY_LOCATION,
  POST_CARBON_USAGE,
  POST_CARBON_USAGE_FAILURE,
  POST_CARBON_USAGE_SUCCESS,
  UPDATE_FORM_INPUT_VALUES,
} from "./constants";

const initialState = {
  location: "",
  electricityUnit: "mwh",
  electricityUsage: "",
  result: { isLoading: false, error: null },
  estimates: [],
  filteredEstimates: [],
  estimateCountries: [],
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case UPDATE_FORM_INPUT_VALUES:
      return { ...state, ...action.payload };
    case POST_CARBON_USAGE:
      return { ...state, isLoading: true, error: null };
    case POST_CARBON_USAGE_SUCCESS:
      return {
        ...state,
        result: { isLoading: false, error: null },
        estimates: [...state.estimates, action.payload],
        estimateCountries: Array.from(
          new Set([...state.estimateCountries, action.payload.country])
        ),
      };
    case POST_CARBON_USAGE_FAILURE:
      return { ...state, result: { isLoading: false, error: action.payload } };
    case FILTER_BY_LOCATION:
      return {
        ...state,
        filteredEstimates: action.payload.location
          ? state.estimates.filter(
              ({ country }) => country === action.payload.location.toLowerCase()
            )
          : [],
      };
    default:
      return state;
  }
};

export default reducer;
