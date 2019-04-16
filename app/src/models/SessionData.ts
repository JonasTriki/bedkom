import {User} from "./User";

export interface SessionData {
  user: User;
  csrfToken: string;
}
