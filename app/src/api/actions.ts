import axios from "axios";
import Cookies from 'universal-cookie';
import {action} from 'typesafe-actions';
import {Constants} from "./types";
import {SessionData} from "../models/SessionData";
const cookies = new Cookies();

export function userAuthenticated(data: SessionData) {
  console.log("Got session data: ", data);

  // Set CSRF token in cookies and for all future axios requests.
  cookies.set("_csrf", data.csrfToken, {path: "/"});
  axios.defaults.headers.common['X-CSRF-TOKEN'] = data.csrfToken;
  return action(Constants.USER_AUTHENTICATED, {user: data.user, isAuthenticated: true});
}