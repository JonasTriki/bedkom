import {User} from "../models/User";
import {ActionType} from "typesafe-actions";
import * as actions from './actions';

export interface ApiState {
  user: User | null;
  isAuthenticated: boolean;
}

export enum Constants {
  FETCH_USER = 'FETCH_USER',
  FETCHED_USER = 'FETCHED_USER',
}

export type ApiActions = ActionType<typeof actions>;