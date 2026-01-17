export interface SubCategory {
  id: string;
  subCategoryName: string;   
  subCategoryImg: string;    
  description: string;
  mainCategoryId?: string;
  mainCategory?: {             
    id: string;
    categoryName: string;
    categoryImg: string;
  };
}

export interface SubCategoryResponse {
  data?: SubCategory[];
  result?: SubCategory[];      // ✅ Đổi từ data thành result nếu cần
  total?: number;
  message?: string;
}