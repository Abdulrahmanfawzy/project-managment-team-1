/**
 * Standard Laravel paginated resource envelope.
 * Reusable across every list endpoint: `Paginated<ApiTask>`, `Paginated<Project>`, etc.
 */
export interface Paginated<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationMetaLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface PaginationMetaLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}
