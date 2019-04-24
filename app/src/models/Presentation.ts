export interface Presentation {
  id: string;
  companyId: string;
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
  description: string;
}