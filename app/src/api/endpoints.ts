import axios, {AxiosRequestConfig} from 'axios';
import config from "../config";
import {ApiResponse} from '../models/ApiResponse';

// Helper method to create endpoints to API.
function endpoint<T>(method: string, endpoint: string, payload: any, authToken?: string) {
  const axiosParams: AxiosRequestConfig = {
    method,
    url: config.apiBaseUrl + endpoint,
    data: payload,
  };

  // Apply authentication JWT if we are accessing restricted endpoints.
  if (authToken) {
    axiosParams.headers = {"Authorization": "JWT " + authToken};
  }

  return axios.request<T>(axiosParams);
}

/* -- users -- */
export function usersLogin(username: string, password: string, org: string) {
  return endpoint<ApiResponse>(
    "POST",
    "/users/login",
    {username, password, org}
  );
}