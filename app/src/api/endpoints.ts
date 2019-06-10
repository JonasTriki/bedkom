import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config";
import { ApiResponse } from "../models/ApiResponse";
import { ContactPerson } from "../models/Company";

// Helper method to create endpoints to API.
async function endpoint<T>(
  method: string,
  endpoint: string,
  data: any = {},
  multipart?: boolean
) {
  let response: AxiosResponse<T> | undefined;
  try {
    const axiosParams: AxiosRequestConfig = {
      method,
      url: config.apiBaseUrl + endpoint,
      data: data,
      withCredentials: true,
      headers: multipart ? { "Content-Type": "multipart/form-data" } : null
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
  return endpoint<ApiResponse>("POST", "/users/login", {
    username,
    password,
    org
  });
}

export function usersSetup(
  username: string,
  password: string,
  verificationToken: string,
  email: string,
  allergies: string
) {
  return endpoint<ApiResponse>("POST", "/users/setup", {
    username,
    password,
    verificationToken,
    email,
    allergies
  });
}

export function usersVerify(username: string, password: string) {
  return endpoint<ApiResponse>("POST", "/users/verify", { username, password });
}

export function usersEdit(
  firstName: string,
  lastName: string,
  email: string,
  allergies: string
) {
  return endpoint<ApiResponse>("PUT", "/users/edit", {
    firstName,
    lastName,
    email,
    allergies
  });
}

export function usersChangePassword(
  currentPassword: string,
  newPassword: string
) {
  return endpoint<ApiResponse>("PUT", "/users/change-password", {
    currentPassword,
    newPassword
  });
}

export function usersResetPassword(username?: string) {
  if (username) {
    return endpoint<ApiResponse>("POST", "/users/reset-password", { username });
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

export function usersList() {
  return endpoint<ApiResponse>("GET", "/users/list");
}

/* -- sessions -- */
export function sessionsGet() {
  return endpoint<ApiResponse>("GET", "/sessions/get");
}

/* -- about -- */
export function aboutContact(name: string, email: string, message: string) {
  return endpoint<ApiResponse>("POST", "/about/contact", {
    name,
    email,
    message
  });
}

/* -- companies -- */
export function companiesContact(
  name: string,
  company: string,
  email: string,
  message: string
) {
  return endpoint<ApiResponse>("POST", "/companies/contact", {
    name,
    company,
    email,
    message
  });
}

export function companiesList() {
  return endpoint<ApiResponse>("GET", "/companies/list");
}

export function companiesCreate(
  name: string,
  description: string,
  website: string,
  bannerImg: File,
  contactPersons: ContactPerson[]
) {
  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("website", website);
  data.append("bannerImg", bannerImg);

  // Append all contact persons to form data.
  contactPersons.forEach((cp, i) => {
    data.append(`contactPersons[${i}][name]`, cp.name);
    data.append(`contactPersons[${i}][position]`, cp.position);
    data.append(`contactPersons[${i}][email]`, cp.email);

    // TODO: Let admin choose others than +47 (what about Sweden/Denmark for instance?).
    data.append(`contactPersons[${i}][phone]`, "+47" + cp.phone);
  });

  return endpoint<ApiResponse>("POST", "/companies/create", data);
}

/* -- news -- */
export function newsList() {
  return endpoint<ApiResponse>("GET", "/news/list");
}

/* -- presentations -- */
export function presentationsList() {
  return endpoint<ApiResponse>("GET", "/presentations/list");
}

/* -- menus -- */
export function menusList() {
  return endpoint<ApiResponse>("GET", "/menus/list");
}

/* -- registrations -- */
export function registrationsRegister(presentationId: string, userId?: string) {
  return endpoint<ApiResponse>("POST", "/registrations/register", {
    presentationId,
    userId
  });
}
export function registrationsDeregister(
  presentationId: string,
  userId?: string
) {
  return endpoint<ApiResponse>("POST", "/registrations/deregister", {
    presentationId,
    userId
  });
}
