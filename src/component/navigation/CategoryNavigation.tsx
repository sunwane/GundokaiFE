'use client';
import CategoryNavBtn from '@/component/ui/CategoryNavBtn';
import { useCategories } from '@/hooks/useCategories';
import { Category } from '@/types/Category';

function CategoryNavigation() {
  const { categories, loading, error } = useCategories();

  // Category THÔNG TIN cố định
  const infoCategory: Category = {
    id: 'info',
    name: 'THÔNG TIN',
    icon: '/images/icons/aboutIcon.png',
  };

  // Gộp categories từ API/mock với info category
  const allCategories = [...categories, infoCategory];

  const handleCategoryClick = (categoryId: string) => {
    console.log('Clicked category:', categoryId);
    
    // Handle khác biệt cho info category
    if (categoryId === 'info') {
      // Navigate to about page hoặc show info
      console.log('Navigate to info page');
    } else {
      // Handle normal categories
      console.log('Filter products by category:', categoryId);
    }
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.navContainer}>
      {allCategories.map((category) => (
        <CategoryNavBtn
          key={category.id}
          category={category}
          onClick={handleCategoryClick}
        />
      ))}
    </div>
  );
}

const styles = {
  navContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0',
    gap: '0',
    backgroundColor: '#fff',
  }
};

export default CategoryNavigation;