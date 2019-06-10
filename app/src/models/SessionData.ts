import { User } from "./User";

export interface SessionData {
  csrfToken: string;
  user?: User;
}
