import { SupportedLocales } from "../index";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export interface LangState {
  locale: SupportedLocales;
}

export enum Constants {
  SET_LANGUAGE = "SET_LANGUAGE"
}

export type ApiActions = ActionType<typeof actions>;
