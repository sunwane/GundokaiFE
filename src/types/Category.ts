export interface Category {
  id: string;
  categoryName: string;
  categoryImg: string;
}

export interface CategoryResponse {
  data: Category[];
  total: number;
  message?: string;
}