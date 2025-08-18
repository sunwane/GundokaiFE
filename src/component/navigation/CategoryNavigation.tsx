'use client';
import CategoryNavBtn from '@/component/features/header/CategoryNavBtn';
import SubCategoryDropdown from '@/component/navigation/SubCategoryDropDown';
import LoadingSpinner from '@/component/ui/LoadingSpinner'; // ✅ Import LoadingSpinner
import { useCategories } from '@/hooks/categories/useCategories';
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
    if (categoryId === 'info') {
      console.log('Navigate to info page');
      router.push('/about');
    }
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    router.push(`/products?subcategory=${subCategoryId}`);
    setHoveredCategory(null);
  };

  const handleCategoryHover = (categoryId: string) => {
    if (categoryId !== 'info') {
      setHoveredCategory(categoryId);
    }
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
  };

  // ✅ Sử dụng LoadingSpinner component
  if (loading) {
    return (
      <LoadingSpinner 
        text="ĐANG TẢI DANH MỤC..." 
        size="medium" 
        spinner={false} 
      />
    );
  }

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
};

export default CategoryNavigation;