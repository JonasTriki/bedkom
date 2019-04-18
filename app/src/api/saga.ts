import {takeEvery, put, select} from "redux-saga/effects";
import {ApiState, Constants} from "./types";
import {fetchedBedkomMembers, fetchingBedkomMembersFailed} from "./actions";
import {usersBedkom} from "./endpoints";
import {RootState} from "../store";

function* fetchBedkomMembers() {
  try {

    // Check if we need to fetch members
    let members = yield select((state: RootState) => state.api.bedkomMembers);
    if (members.length > 0) return;

    // Fetch members from API
    const response = yield usersBedkom();
    if (!response || response.status !== 200) {
      return put(fetchingBedkomMembersFailed());
    }
    members = response.data.data;
    yield put(fetchedBedkomMembers(members));
  } catch (err) {
    yield put(fetchingBedkomMembersFailed(err));
  }
}

function* apiSaga() {
  yield takeEvery(Constants.GET_BEDKOM_MEMBERS, fetchBedkomMembers)
}

export default apiSaga;