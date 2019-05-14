import {ApiActions, LangState, Constants} from "./types";
import {SupportedLocales} from "../";

const init: LangState = {
  locale: 'nb',
};

export function langReducer(locale: SupportedLocales) {
  return (state: LangState = {locale}, action: ApiActions): LangState => {
    switch (action.type) {
      case Constants.SET_LANGUAGE:
        return {...state, ...action.payload};
      default:
        return state;
    }
  };
}