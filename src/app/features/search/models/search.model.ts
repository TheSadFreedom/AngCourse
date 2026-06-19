import { Profile } from "../../profile/models/profile.model";

export interface SearchResponse {
  items: Profile[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
