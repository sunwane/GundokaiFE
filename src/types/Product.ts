export interface Product {
  id: string;
  subCategory_id: string;
  product_Name: string;
  price: number;
  stock_quantity: number;
  created_at: string;
  description: string;
  thumbnail: string;
  status: string; // 'Còn hàng', 'Hết hàng', 'Hàng sắp về'
}

export interface ProductResponse {
  data: Product[];
  total: number;
  message?: string;
}