import {action} from 'typesafe-actions';
import {Constants} from "./types";
import {User} from "../models/User";

export function fetchUser() {
  return action(Constants.FETCH_USER);
}

export function fetchedUser(user: User) {
  return action(Constants.FETCHED_USER, {user});
}