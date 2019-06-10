import { all, call } from "redux-saga/effects";
import apiSaga from "./api/saga";

export default function* rootSaga() {
  // Calling all sagas!
  yield all([call(apiSaga)]);
}
