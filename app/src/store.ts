import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga'
import saga from './saga';
import {ApiState} from "./api/types";
import {apiReducer} from "./api/reducer";

export interface RootState {
  api: ApiState;
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore<RootState, any, any, any>(
  combineReducers<RootState>({
    api: apiReducer,
  }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(saga);

export default store;