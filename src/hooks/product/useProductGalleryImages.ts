import { useState, useMemo } from 'react';
import { ProductImg } from '@/types/Product';

export function useProductGalleryImages(images: ProductImg[], thumbnail?: string) {
  // Thêm thumbnail vào đầu danh sách nếu có và chưa có trong images
  const allImages = useMemo(() => {
    const imgLinks = images.map(img => img.img_link);
    if (thumbnail && !imgLinks.includes(thumbnail)) {
      return [thumbnail, ...imgLinks];
    }
    return imgLinks.length > 0 ? imgLinks : thumbnail ? [thumbnail] : [];
  }, [images, thumbnail]);

  // Ảnh chính mặc định là thumbnail (nếu có)
  const [mainImage, setMainImage] = useState(allImages[0] || '');
  const [thumbIndex, setThumbIndex] = useState(0);

  const maxThumbs = 4;
  const canScrollLeft = thumbIndex > 0;
  const canScrollRight = allImages.length > maxThumbs && thumbIndex < allImages.length - maxThumbs;

  const handleThumbClick = (img: string) => {
    setMainImage(img);
  };

  const handleScrollLeft = () => {
    setThumbIndex(prev => Math.max(prev - 1, 0));
  };

  const handleScrollRight = () => {
    setThumbIndex(prev => Math.min(prev + 1, allImages.length - maxThumbs));
  };

  return {
    allImages,
    mainImage,
    setMainImage,
    thumbIndex,
    setThumbIndex,
    maxThumbs,
    canScrollLeft,
    canScrollRight,
    handleThumbClick,
    handleScrollLeft,
    handleScrollRight,
  };
}