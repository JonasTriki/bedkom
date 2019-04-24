import {ApiActions, ApiState, Constants} from "./types";
import {User} from "../models/User";

const init: ApiState = {
  user: {} as User,
  bedkomMembers: null,
  isAuthenticated: false,
  presentations: null,
  companies: null,
  menus: null,
  users: null,
};

export function apiReducer(state: ApiState = init, action: ApiActions): ApiState {
  switch (action.type) {
    case Constants.GOT_SESSION:
    case Constants.USER_AUTHENTICATED:
    case Constants.USER_EDITED:
    case Constants.USER_SIGNED_OUT:
    case Constants.FETCHED_BEDKOM_MEMBERS:
    case Constants.FETCHED_PRESENTATIONS:
    case Constants.FETCHED_COMPANIES:
    case Constants.FETCHED_MENUS:
    case Constants.FETCHED_USERS:
      return {...state, ...action.payload};
    default:
      return state;
  }
}