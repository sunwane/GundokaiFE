export interface SubCategory {
  id: string;
  category_id: string;
  subCategory_Name: string;
  subCategory_img: string;
  description: string;
}

export interface SubCategoryResponse {
  data: SubCategory[];
  total: number;
  message?: string;
}