import { call, put, takeEvery } from "redux-saga/effects";

import { calculateCarbonUsage } from "../utils/api/calculateCarbonUsage";
import {
  POST_CARBON_USAGE,
  POST_CARBON_USAGE_FAILURE,
  POST_CARBON_USAGE_SUCCESS,
  SUBMIT_FORM_WITH_VALUES,
} from "./constants";

interface IPostCarbonUsageResponse {
  data: {
    attributes: {
      carbon_g: number;
      carbon_kg: number;
      carbon_lb: number;
      carbon_mt: number;
      country: string;
      electricity_unit: string;
      electricity_value: number;
      estimated_at: string;
    };
    id: string;
    type: string;
  };
}

function* postCarbonUsage(action: IAction) {
  try {
    yield put({ type: POST_CARBON_USAGE });
    const { data }: IPostCarbonUsageResponse = yield call(
      calculateCarbonUsage,
      action.payload
    );
    const { id, attributes } = data;
    const date = new Date(attributes.estimated_at);
    yield put({
      type: POST_CARBON_USAGE_SUCCESS,
      payload: {
        ...attributes,
        id: id,
        estimated_at: `${date.toLocaleDateString()}(${date.toLocaleTimeString()})`,
      },
    });
  } catch (error: Error | unknown) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error?.message;
    yield put({ type: POST_CARBON_USAGE_FAILURE, message: message });
  }
}

export function* AppSaga() {
  yield takeEvery(SUBMIT_FORM_WITH_VALUES, postCarbonUsage);
}
