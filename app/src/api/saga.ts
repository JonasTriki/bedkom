import { takeEvery, put, select } from "redux-saga/effects";
import { Constants } from "./types";
import {
  fetchedBedkomMembers,
  fetchedCompanies,
  fetchedMenus,
  fetchedNews,
  fetchedPresentations,
  fetchedUsers,
  fetchingBedkomMembersFailed,
  fetchingCompaniesFailed,
  fetchingMenusFailed,
  fetchingNewsFailed,
  fetchingPresentationsFailed,
  fetchingSessionFailed,
  fetchingUsersFailed,
  getBedkomMembers,
  getNews,
  getPresentations,
  gotSession
} from "./actions";
import {
  companiesList,
  menusList,
  newsList,
  presentationsList,
  sessionsGet,
  usersBedkom,
  usersList
} from "./endpoints";
import { RootState } from "../store";

function* fetchPublicData() {
  // News for home page
  yield put(getNews());

  // Presentations for home/presentations page
  yield put(getPresentations());

  // Bedkom-members for about page
  yield put(getBedkomMembers());
}

function* fetchSessionData() {
  try {
    // Fetch session from API
    const response = yield sessionsGet();
    if (!response || response.status !== 200) {
      return put(fetchingSessionFailed());
    }
    const session = response.data.data;
    yield put(gotSession(session));
  } catch (err) {
    return put(fetchingSessionFailed(err));
  }
}

function* fetchNews() {
  try {
    // Fetch news from API
    const response = yield newsList();
    if (!response || response.status !== 200) {
      return put(fetchingNewsFailed());
    }
    const news = response.data.data;
    yield put(fetchedNews(news));
  } catch (err) {
    return put(fetchingNewsFailed(err));
  }
}

function* fetchBedkomMembers() {
  try {
    // Check if we need to fetch members
    let members = yield select((state: RootState) => state.api.bedkomMembers);
    if (members) return;

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

function* fetchPresentations() {
  try {
    // Check if we need to fetch presentations
    let presentations = yield select(
      (state: RootState) => state.api.presentations
    );
    if (presentations) return;

    // Fetch presentations from API
    const response = yield presentationsList();
    if (!response || response.status !== 200) {
      return put(fetchingPresentationsFailed());
    }
    presentations = response.data.data;
    yield put(fetchedPresentations(presentations));
  } catch (err) {
    yield put(fetchingPresentationsFailed(err));
  }
}

function* fetchCompanies() {
  try {
    // Check if we need to fetch companies
    let companies = yield select((state: RootState) => state.api.companies);
    if (companies) return;

    // Fetch companies from API
    const response = yield companiesList();
    if (!response || response.status !== 200) {
      return put(fetchingCompaniesFailed());
    }
    companies = response.data.data;
    yield put(fetchedCompanies(companies));
  } catch (err) {
    yield put(fetchingCompaniesFailed(err));
  }
}

function* fetchMenus() {
  try {
    // Check if we need to fetch menus
    let menus = yield select((state: RootState) => state.api.menus);
    if (menus) return;

    // Fetch menus from API
    const response = yield menusList();
    if (!response || response.status !== 200) {
      return put(fetchingMenusFailed());
    }
    menus = response.data.data;
    yield put(fetchedMenus(menus));
  } catch (err) {
    yield put(fetchingMenusFailed(err));
  }
}

function* fetchUsers() {
  try {
    // Check if we need to fetch users
    let users = yield select((state: RootState) => state.api.users);
    if (users) return;

    // Fetch users from API
    const response = yield usersList();
    if (!response || response.status !== 200) {
      return put(fetchingUsersFailed());
    }
    users = response.data.data;
    yield put(fetchedUsers(users));
  } catch (err) {
    yield put(fetchingUsersFailed(err));
  }
}

function* apiSaga() {
  yield takeEvery(Constants.GET_SESSION, fetchSessionData);
  yield takeEvery(Constants.GET_PUBLIC_DATA, fetchPublicData);
  yield takeEvery(Constants.GET_NEWS, fetchNews);
  yield takeEvery(Constants.GET_PRESENTATIONS, fetchPresentations);
  yield takeEvery(Constants.GET_BEDKOM_MEMBERS, fetchBedkomMembers);
  yield takeEvery(Constants.GET_COMPANIES, fetchCompanies);
  yield takeEvery(Constants.GET_MENUS, fetchMenus);
  yield takeEvery(Constants.GET_USERS, fetchUsers);
}

export default apiSaga;
