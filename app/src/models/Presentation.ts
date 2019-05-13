import {FoodEntry} from "./Menu";

export interface Presentation {
  id: string;
  companyId: string;
  company?: {
    name: string;
    bannerImgUrl: string;
    website: string;
  },
  registrations: number;
  capacity: number;
  minStudyYear: number;
  year: number;
  semester: string;
  startTime: number;
  endTime: number;
  responsible: string[];
  contractPath?: string;
  contractUrl?: string;
  menuId?: string;
  menu?: {
    url: string;
    foodEntries: FoodEntry[];
  },
  description: string;
}