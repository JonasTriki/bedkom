import axios, {AxiosRequestConfig} from 'axios';
import config from "../config";

// Helper method to create endpoints to API.
function endpoint(method: string, endpoint: string, payload: any, authToken?: string) {
  const axiosParams: AxiosRequestConfig = {
    method,
    url: config.apiBaseUrl + endpoint,
    data: payload,
  };

  // Apply authentication JWT if we are accessing restricted endpoints.
  if (authToken) {
    axiosParams.headers = {"Authorization": "JWT " + authToken};
  }
  return axios(axiosParams);
}

/* -- users -- */
export function usersLogin(username: string, password: string) {
  return endpoint(
    "POST",
    "/users/login",
    {
      username,
      password
    }
  );
}