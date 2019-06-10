export interface ContactPerson {
  name: string;
  position: string;
  email: string;
  phone: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  website: string;
  bannerImgUrl: string;
  contactPersons: ContactPerson[];
}
