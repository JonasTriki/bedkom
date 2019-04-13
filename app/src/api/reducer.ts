import {ApiActions, ApiState, Constants} from "./types";

const init: ApiState = {
  user: null,
  isAuthenticated: false,
};

export function apiReducer(state: ApiState = init, action: ApiActions): ApiState {
  switch (action.type) {
    case Constants.FETCHED_USER:
      return {...state, ...action.payload};
    default:
      return state;
  }
}