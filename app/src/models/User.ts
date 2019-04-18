export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  org: string;
  studyProgram: string;
  startYear: number;
  startSemester: string;
  year: number;
  role: string;
  imgUrl?: string;
  committeePosition?: string;
}