export interface Product {
  id: string;
  productName: string;        // ✅ Đổi từ product_Name
  price: number;
  stockQuantity: number;      // ✅ Đổi từ stock_quantity  
  createdAt: string;         // ✅ Đổi từ created_at
  description: string;
  thumbnail: string;
  status: string; // 'Còn hàng', 'Hết hàng', 'Hàng sắp về'
  subcategory: {             // ✅ Thêm subcategory object thay vì subCategory_id
    id: string;
    subCategoryName: string;
    subCategoryImg: string;
    description: string;
    mainCategory: {
      id: string;
      categoryName: string;
      categoryImg: string;
    };
  };
}

export interface ProductResponse {
  // data: Product[];           // ✅ Hoặc result: Product[] tùy BE response structure
  result: Product[];           // ✅ Hoặc result: Product[] tùy BE response structure
  total: number;
  message?: string;
}

export type StockStatus = 'Tất cả' | 'Còn hàng' | 'Hết hàng' | 'Hàng sắp về';

export interface ProductImg {
  id: string;
  productId: string;        // ✅ Có thể cần đổi thành productId nếu BE thay đổi
  productImg: string;          // ✅ Có thể cần đổi thành imgLink nếu BE thay đổi
}