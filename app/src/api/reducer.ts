import {ApiActions, ApiState, Constants} from "./types";
import {User} from "../models/User";

const init: ApiState = {
  user: {} as User,
  bedkomMembers: [],
  isAuthenticated: false,
};

export function apiReducer(state: ApiState = init, action: ApiActions): ApiState {
  switch (action.type) {
    case Constants.GOT_SESSION:
    case Constants.USER_AUTHENTICATED:
    case Constants.USER_EDITED:
    case Constants.USER_SIGNED_OUT:
    case Constants.FETCHED_BEDKOM_MEMBERS:
      return {...state, ...action.payload};
    default:
      return state;
  }
}