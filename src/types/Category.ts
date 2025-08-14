export interface Category {
  id: string;
  category_Name: string;
  icon_img: string;
}

export interface CategoryResponse {
  data: Category[];
  total: number;
  message?: string;
}