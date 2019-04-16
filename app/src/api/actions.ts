import {action} from 'typesafe-actions';
import {Constants} from "./types";
import {User} from "../models/User";

export function userAuthenticated(user: User) {
  return action(Constants.USER_AUTHENTICATED, {user, isAuthenticated: true});
}