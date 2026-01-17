export interface Category {
  id: string;
  categoryName: string;
  categoryImg: string;
}

export interface CategoryResponse {
  data?: Category[];
  result?: Category[];      // ✅ Đổi từ data thành result nếu cần
  total: number;
  message?: string;
}