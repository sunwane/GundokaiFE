'use client';
import CategoryNavBtn from '@/component/ui/CategoryNavBtn';
import SubCategoryDropdown from '@/component/navigation/SubCategoryDropDown';
import { useCategories } from '@/hooks/useCategories';
import { Category } from '@/types/Category';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function CategoryNavigation() {
  const { categories, loading, error } = useCategories();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const router = useRouter();

  const infoCategory: Category = {
    id: 'info',
    category_Name: 'THÔNG TIN',
    icon_img: '/images/icons/aboutIcon.png',
  };

  const allCategories = [...categories, infoCategory];

  const handleCategoryClick = (categoryId: string) => {
    // ✅ CHỈ xử lý click cho category "info"
    if (categoryId === 'info') {
      console.log('Navigate to info page');
      router.push('/about');
    }
    // ❌ Các category khác không làm gì cả
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    // ✅ Chuyển hướng đến /products với query parameter
    router.push(`/products?subcategory=${subCategoryId}`);
    setHoveredCategory(null); // Đóng dropdown sau khi click
  };

  const handleCategoryHover = (categoryId: string) => {
    // ✅ Chỉ show subcategories cho product categories
    if (categoryId !== 'info') {
      setHoveredCategory(categoryId);
    }
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
  };

  if (loading) return <div style={styles.loading}>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.navContainer}>
      <div style={styles.categoryContainer}>
        {allCategories.map((category) => (
          <div
            key={category.id}
            style={styles.categoryWrapper}
            onMouseEnter={() => handleCategoryHover(category.id)}
            onMouseLeave={handleCategoryLeave}
          >
            <CategoryNavBtn category={category} onClick={handleCategoryClick} />

            {/* Dropdown cho từng category riêng biệt */}
            {hoveredCategory === category.id && category.id !== 'info' && (
              <SubCategoryDropdown
                categoryId={hoveredCategory}
                onSubCategoryClick={handleSubCategoryClick}
                onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                onMouseLeave={handleCategoryLeave}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  navContainer: {
    position: 'relative' as const,
    width: '100%',
    backgroundColor: '#fff',
  },
  categoryContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0',
    gap: '0',
  },
  categoryWrapper: {
    flex: 1,
    position: 'relative' as const,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    color: '#1a1aff',
    fontWeight: 'bold',
  },
};

export default CategoryNavigation;