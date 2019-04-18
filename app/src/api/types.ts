import {User} from "../models/User";
import {ActionType} from "typesafe-actions";
import * as actions from './actions';
import {BedkomMember} from "../models/BedkomMember";

export interface ApiState {
  user: User;
  bedkomMembers: BedkomMember[],
  isAuthenticated: boolean;
}

export enum Constants {
  GOT_SESSION = 'GOT_SESSION',

  USER_AUTHENTICATED = 'USER_AUTHENTICATED',
  USER_EDITED = 'USER_EDITED',
  USER_SIGNED_OUT = 'USER_SIGNED_OUT',

  GET_BEDKOM_MEMBERS = 'GET_BEDKOM_MEMBERS',
  FETCHED_BEDKOM_MEMBERS = 'FETCHED_BEDKOM_MEMBERS',
  FETCHING_BEDKOM_MEMBERS_FAILED = 'FETCHING_BEDKOM_MEMBERS_FAILED',
}

export type ApiActions = ActionType<typeof actions>;