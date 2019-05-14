import Cookies from "universal-cookie";
import {SupportedLocales} from "..";
import {Constants} from "./types";
import {action} from "typesafe-actions";
import {Settings} from "luxon";

const cookies = new Cookies();

export function setLanguage(locale: SupportedLocales) {
  cookies.set("lang", locale);
  Settings.defaultLocale = locale;
  return action(Constants.SET_LANGUAGE, {locale});
}