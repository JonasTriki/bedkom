import axios from "axios";
import Cookies from 'universal-cookie';
import {action} from 'typesafe-actions';
import {Constants} from "./types";
import {SessionData} from "../models/SessionData";
import {User} from "../models/User";
import {BedkomMember} from "../models/BedkomMember";

const cookies = new Cookies();

export function gotSession(data: SessionData) {

  // Set CSRF token in cookies and for all future axios requests.
  axios.defaults.headers.common['X-CSRF-TOKEN'] = data.csrfToken;
  if (data.user) {
    return action(Constants.GOT_SESSION, {user: data.user, isAuthenticated: true});
  } else {
    return action(Constants.GOT_SESSION, {});
  }
}

export function userAuthenticated(user: User) {
  return action(Constants.USER_AUTHENTICATED, {user, isAuthenticated: true});
}

export function userEdited(user: User) {
  return action(Constants.USER_EDITED, {user});
}

export function userSignedOut() {

  // Remove session cookie
  cookies.remove('sid');

  // Reducer will remove user from store
  return action(Constants.USER_SIGNED_OUT, {user: {} as User, isAuthenticated: false});
}
export function getBedkomMembers() {
  return action(Constants.GET_BEDKOM_MEMBERS);
}

export function fetchedBedkomMembers(bedkomMembers: BedkomMember[]) {
  return action(Constants.FETCHED_BEDKOM_MEMBERS, {bedkomMembers});
}

export function fetchingBedkomMembersFailed(error?: any) {
  return action(Constants.FETCHING_BEDKOM_MEMBERS_FAILED, {error});

}