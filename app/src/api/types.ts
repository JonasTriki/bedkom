import {User} from "../models/User";
import {ActionType} from "typesafe-actions";
import * as actions from './actions';

export interface ApiState {
  user: User | null;
  isAuthenticated: boolean;
}

export enum Constants {
  USER_AUTHENTICATED = 'USER_AUTHENTICATED',
}

export type ApiActions = ActionType<typeof actions>;