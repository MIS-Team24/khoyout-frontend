export type API_Pagination = {
  current_page: number;
  total_pages: number;
  entry_counts: number;
  next_page: number | null;
  prev_page: number | null;
};
