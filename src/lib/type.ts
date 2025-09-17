export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  status: "available" | "issued";
  createdAt?: string;
  updatedAt?: string;
}

export interface BookFilters {
  search: string;
  genre: string;
  status: string;
}

export interface PaginationInfo {
  page: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
