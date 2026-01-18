'use client';
import { useState, useEffect } from 'react';
import { Category } from '@/types/Category';
import { CategoryService } from '@/services/CategoryService';

/**
 * 🎯 Custom Hook để quản lý danh sách categories
 * 
 * 🔄 Hook này được sử dụng ở đâu?
 * - Trong các component cần hiển thị danh sách categories
 * - Ví dụ: Header navigation, Category filter, Product listing
 * 
 * 📋 Mục đích:
 * - Tách logic fetch categories ra khỏi component
 * - Có thể tái sử dụng ở nhiều nơi
 * - Quản lý state loading, error một cách tập trung
 */
export function useCategories() {
  // 📊 STATE MANAGEMENT
  // useState để lưu trữ data trong component
  const [categories, setCategories] = useState<Category[]>([]); // Mảng categories rỗng ban đầu
  const [loading, setLoading] = useState(true); // Ban đầu đang loading = true
  const [error, setError] = useState<string | null>(null); // Không có lỗi ban đầu

  // 🔄 FETCH FUNCTION
  // Function async để gọi API lấy categories
  const fetchCategories = async () => {
    try {
      setLoading(true); // Bắt đầu loading
      setError(null); // Reset lỗi cũ
      
      // 🌐 Gọi API thông qua CategoryService
      const response = await CategoryService.getCategories();
      // ✅ Cách ngắn gọn với optional chaining
      // const categoriesData = response.result || response.data || [];
      const categoriesData = response?.result || response || [];
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);

    } catch (err) {
      // ❌ Nếu có lỗi, lưu error message
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching categories:', err);
    } finally {
      // 🏁 Dù thành công hay thất bại, đều tắt loading
      setLoading(false);
    }
  };

  // 🚀 LIFECYCLE EFFECT
  // useEffect chạy khi component mount (lần đầu render)
  useEffect(() => {
    fetchCategories(); // Tự động fetch categories khi component load
  }, []); // [] = chỉ chạy 1 lần khi mount

  // 🔄 REFETCH FUNCTION
  // Function để fetch lại data (khi user click refresh)
  const refetch = async () => {
    await fetchCategories();
  };

  // 📤 RETURN VALUES
  // Trả về những gì component cần sử dụng
  return { 
    categories, // Mảng categories để hiển thị
    loading,    // Trạng thái loading để show spinner
    error,      // Error message để show thông báo lỗi
    refetch     // Function để refresh data
  };
}

/**
 * 📖 CÁCH SỬ DỤNG trong component:
 * 
 * function CategoryList() {
 *   // 🪝 "Hook vào" useCategories
 *   const { categories, loading, error, refetch } = useCategories();
 * 
 *   // 🔄 Hiển thị loading
 *   if (loading) return <div>Loading...</div>;
 * 
 *   // ❌ Hiển thị lỗi
 *   if (error) return <div>Error: {error}</div>;
 * 
 *   // ✅ Hiển thị danh sách
 *   return (
 *     <div>
 *       <button onClick={refetch}>Refresh</button>
 *       {categories.map(cat => <div key={cat.id}>{cat.name}</div>)}
 *     </div>
 *   );
 * }
 */