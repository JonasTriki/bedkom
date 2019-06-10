import { User } from "../models/User";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { BedkomMember } from "../models/BedkomMember";
import { Presentation } from "../models/Presentation";
import { Company } from "../models/Company";
import { Menu } from "../models/Menu";
import { Article } from "../models/Article";

export interface ApiState {
  user: User;
  isAuthenticated: boolean;
  bedkomMembers: BedkomMember[] | null;
  news: Article[] | null;
  presentations: Presentation[] | null;
  companies: Company[] | null;
  menus: Menu[] | null;
  users: User[] | null;
}

export enum Constants {
  GET_SESSION = "GET_SESSION",
  FETCHING_SESSION_FAILED = "FETCHING_SESSION_FAILED",
  GOT_SESSION = "GOT_SESSION",

  USER_AUTHENTICATED = "USER_AUTHENTICATED",
  USER_EDITED = "USER_EDITED",
  USER_SIGNED_OUT = "USER_SIGNED_OUT",

  GET_BEDKOM_MEMBERS = "GET_BEDKOM_MEMBERS",
  FETCHED_BEDKOM_MEMBERS = "FETCHED_BEDKOM_MEMBERS",
  FETCHING_BEDKOM_MEMBERS_FAILED = "FETCHING_BEDKOM_MEMBERS_FAILED",

  GET_PUBLIC_DATA = "GET_PUBLIC_DATA",

  GET_NEWS = "GET_NEWS",
  FETCHED_NEWS = "FETCHED_NEWS",
  FETCHING_NEWS_FAILED = "FETCHING_NEWS_FAILED",

  GET_PRESENTATIONS = "GET_PRESENTATIONS",
  FETCHED_PRESENTATIONS = "FETCHED_PRESENTATIONS",
  FETCHING_PRESENTATIONS_FAILED = "FETCHING_PRESENTATIONS_FAILED",

  GET_COMPANIES = "GET_COMPANIES",
  FETCHED_COMPANIES = "FETCHED_COMPANIES",
  FETCHING_COMPANIES_FAILED = "FETCHING_COMPANIES_FAILED",

  GET_MENUS = "GET_MENUS",
  FETCHED_MENUS = "FETCHED_MENUS",
  FETCHING_MENUS_FAILED = "FETCHING_MENUS_FAILED",

  GET_USERS = "GET_USERS",
  FETCHED_USERS = "FETCHED_USERS",
  FETCHING_USERS_FAILED = "FETCHING_USERS_FAILED"
}

export type ApiActions = ActionType<typeof actions>;
