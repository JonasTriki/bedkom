import axios from "axios";
import Cookies from 'universal-cookie';
import {action} from 'typesafe-actions';
import {Constants} from "./types";
import {SessionData} from "../models/SessionData";
import {User} from "../models/User";
import {BedkomMember} from "../models/BedkomMember";
import {Presentation} from "../models/Presentation";
import {Company} from "../models/Company";
import {Menu} from "../models/Menu";

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

// GET members
export function getBedkomMembers() {
  return action(Constants.GET_BEDKOM_MEMBERS);
}

export function fetchedBedkomMembers(bedkomMembers: BedkomMember[]) {
  return action(Constants.FETCHED_BEDKOM_MEMBERS, {bedkomMembers});
}

export function fetchingBedkomMembersFailed(error?: any) {
  return action(Constants.FETCHING_BEDKOM_MEMBERS_FAILED, {error});

}

// GET presentations
export function getPresentations() {
  return action(Constants.GET_PRESENTATIONS);
}

export function fetchedPresentations(presentations: Presentation[]) {
  return action(Constants.FETCHED_PRESENTATIONS, {presentations});
}

export function fetchingPresentationsFailed(error?: any) {
  return action(Constants.FETCHING_PRESENTATIONS_FAILED, {error});

}

// GET companies
export function getCompanies() {
  return action(Constants.GET_COMPANIES);
}

export function fetchedCompanies(companies: Company[]) {
  return action(Constants.FETCHED_COMPANIES, {companies});
}

export function fetchingCompaniesFailed(error?: any) {
  return action(Constants.FETCHING_COMPANIES_FAILED, {error});

}

// GET menus
export function getMenus() {
  return action(Constants.GET_MENUS);
}

export function fetchedMenus(menus: Menu[]) {
  return action(Constants.FETCHED_MENUS, {menus});
}

export function fetchingMenusFailed(error?: any) {
  return action(Constants.FETCHING_MENUS_FAILED, {error});
}

// GET users
export function getUsers() {
  return action(Constants.GET_USERS);
}

export function fetchedUsers(users: User[]) {
  return action(Constants.FETCHED_USERS, {users});
}

export function fetchingUsersFailed(error?: any) {
  return action(Constants.FETCHING_USERS_FAILED, {error});
}