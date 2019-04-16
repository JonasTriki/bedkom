import {ApiActions, ApiState, Constants} from "./types";

const init: ApiState = {
  user: null,
  isAuthenticated: false,
};

export function apiReducer(state: ApiState = init, action: ApiActions): ApiState {
  console.log(state, action);
  switch (action.type) {
    case Constants.USER_AUTHENTICATED:
      return {...state, ...action.payload};
    default:
      return state;
  }
}