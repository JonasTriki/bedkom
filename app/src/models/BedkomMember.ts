import CommitteePosition from "../types/CommitteePosition";

export interface BedkomMember {
  firstName: string;
  lastName: string;
  imgUrl?: string;
  position: CommitteePosition;
}
