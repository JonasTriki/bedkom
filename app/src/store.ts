import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";
import { ApiState } from "./api/types";
import { apiReducer } from "./api/reducer";
import { LangState } from "./translations/types";
import { langReducer } from "./translations/reducer";
import { SupportedLocales } from "./";

export interface RootState {
  api: ApiState;
  lang: LangState;
}

const store = (initLocale: SupportedLocales) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore<RootState, any, any, any>(
    combineReducers<RootState>({
      api: apiReducer,
      lang: langReducer(initLocale)
    }),
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(saga);
  return store;
};

export default store;
