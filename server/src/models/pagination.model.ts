export type PaginatedType<T> = {
  page: number;
  pageSize: number;
  total: number;
  elements: T[];
};
