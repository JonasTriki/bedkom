export interface ApiResponse<D = any, S = string> {
  status: S;
  data: D;
}