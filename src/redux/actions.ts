import {
  UPDATE_FORM_INPUT_VALUES,
  SUBMIT_FORM_WITH_VALUES,
  FILTER_BY_LOCATION,
} from "./constants";

export const updateFormInputValues = (values: { [x: string]: string }) => ({
  type: UPDATE_FORM_INPUT_VALUES,
  payload: values,
});

export const submitFormWithValues = (values: { [x: string]: string }) => ({
  type: SUBMIT_FORM_WITH_VALUES,
  payload: values,
});

export const filterByLocation = (value: { location: string }) => ({
  type: FILTER_BY_LOCATION,
  payload: value,
});
