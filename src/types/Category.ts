export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CategoryResponse {
  data: Category[];
  total: number;
  message?: string;
}