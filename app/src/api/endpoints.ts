import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import config from "../config";
import {ApiResponse} from '../models/ApiResponse';

// Helper method to create endpoints to API.
async function endpoint<T>(method: string, endpoint: string, payload: any, authToken?: string) {
  let response: AxiosResponse<T> | undefined;
  try {
    const axiosParams: AxiosRequestConfig = {
      method,
      url: config.apiBaseUrl + endpoint,
      data: payload,
    };

    // Apply authentication JWT if we are accessing restricted endpoints.
    if (authToken) {
      axiosParams.headers = {"Authorization": "JWT " + authToken};
    }

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

export function usersPasswordSetup(username: string, password: string, org: string, verificationToken: string, email: string) {
  return endpoint<ApiResponse>(
    "POST",
    "/users/login",
    {username, password, org, verificationToken, email}
  );
}

export function usersVerify(username: string, password: string, org: string) {
  return endpoint<ApiResponse>(
    "POST",
    "/users/verify",
    {username, password, org}
  );
}