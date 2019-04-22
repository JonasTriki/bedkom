import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import config from "../config";
import {ApiResponse} from '../models/ApiResponse';

// Helper method to create endpoints to API.
async function endpoint<T>(method: string, endpoint: string, payload: any = {}) {
  let response: AxiosResponse<T> | undefined;
  try {
    const axiosParams: AxiosRequestConfig = {
      method,
      url: config.apiBaseUrl + endpoint,
      data: payload,
      withCredentials: true
    };

    response = await axios.request<T>(axiosParams);
  } catch (error) {
    if (error.response) {

      // Non-2xx status code received
      response = error.response;
    } else {

      // No response from server/unexpected error occurred.
      response = undefined;
    }
  }
  return response;
}

/* -- users -- */
export function usersLogin(username: string, password: string, org: string) {
  return endpoint<ApiResponse>(
    "POST",
    "/users/login",
    {username, password, org}
  );
}

export function usersSetup(username: string, password: string, verificationToken: string, email: string) {
  return endpoint<ApiResponse>(
    "POST",
    "/users/setup",
    {username, password, verificationToken, email}
  );
}

export function usersVerify(username: string, password: string) {
  return endpoint<ApiResponse>(
    "POST",
    "/users/verify",
    {username, password}
  );
}

export function usersEdit(firstName: string, lastName: string, email: string) {
  return endpoint<ApiResponse>(
    "PUT",
    "/users/edit",
    {firstName, lastName, email}
  );
}

export function usersChangePassword(currentPassword: string, newPassword: string) {
  return endpoint<ApiResponse>(
    "PUT",
    "/users/change-password",
    {currentPassword, newPassword}
  );
}

export function usersResetPassword(username?: string) {
  if (username) {
    return endpoint<ApiResponse>("POST", "/users/reset-password", {username});
  } else {
    return endpoint<ApiResponse>("POST", "/users/reset-password");

  }
}

export function usersLogout() {
  return endpoint<ApiResponse>("POST", "/users/logout");
}

export function usersBedkom() {
  return endpoint<ApiResponse>("GET", "/users/bedkom");
}

/* -- sessions -- */
export function sessionsGet() {
  return endpoint<ApiResponse>("GET", "/sessions/get");
}

/* -- about -- */
export function aboutContact(name: string, email: string, message: string) {
  return endpoint<ApiResponse>(
    "POST",
    "/about/contact",
    {name, email, message}
  );
}