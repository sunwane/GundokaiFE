'use client';
import { useState, useRef, useCallback } from 'react';

interface UseImageBackgroundColorReturn {
  backgroundColor: string;           // Màu background đã detect
  imgRef: React.RefObject<HTMLImageElement | null>; // Ref để attach vào img element
  handleImageLoad: () => void;       // Function xử lý khi ảnh load xong
}

export const useImageBackgroundColor = (
  subcategoryId: string,   // ID subcategory để fallback color
  defaultColor: string    // Màu mặc định nếu không detect được
): UseImageBackgroundColorReturn => {
  
  // 📊 STATE MANAGEMENT
  const [backgroundColor, setBackgroundColor] = useState(defaultColor); // Màu background hiện tại
  const imgRef = useRef<HTMLImageElement>(null); // Ref tới img element

  // 🎨 IMAGE COLOR DETECTION
  // useCallback để tối ưu performance, không tạo function mới mỗi lần render
  const handleImageLoad = useCallback(() => {
    // Kiểm tra img element có tồn tại không
    if (imgRef.current) {
      try {
        // 🖼️ Tạo canvas để phân tích ảnh
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) return;

        // 📏 Set kích thước canvas = kích thước ảnh
        canvas.width = imgRef.current.width;
        canvas.height = imgRef.current.height;
        
        // 🎨 Vẽ ảnh lên canvas để phân tích pixel
        ctx.drawImage(imgRef.current, 0, 0);

        // 📍 8 điểm sample: 4 góc + 4 điểm giữa các cạnh
        const backgroundSamplePoints = [
          // ✅ 4 góc
          [0, 0], // Góc trên trái
          [canvas.width - 1, 0], // Góc trên phải
          [0, canvas.height - 1], // Góc dưới trái
          [canvas.width - 1, canvas.height - 1], // Góc dưới phải
          
          // ✅ 4 điểm giữa các cạnh
          [Math.floor(canvas.width / 2), 0], // Giữa cạnh trên
          [Math.floor(canvas.width / 2), canvas.height - 1], // Giữa cạnh dưới
          [0, Math.floor(canvas.height / 2)], // Giữa cạnh trái
          [canvas.width - 1, Math.floor(canvas.height / 2)], // Giữa cạnh phải
        ];

        const colorCounts = new Map<string, number>(); // Đếm tần suất màu

        // 🔍 Lấy màu từ từng điểm sample - KHÔNG LỌC BẤT KỲ ĐIỀU KIỆN NÀO
        backgroundSamplePoints.forEach(([x, y], index) => {
          if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
            // 🎨 Lấy pixel tại vị trí (x, y)
            const imageData = ctx.getImageData(x, y, 1, 1);
            const [r, g, b, a] = imageData.data; // RGBA values
            
            // ✅ LẤY TẤT CẢ PIXEL - KHÔNG LỌC ALPHA, KHÔNG LỌC GÌ CẢ
            const groupedColor = groupSimilarColors(r, g, b, 10);
            const colorKey = `${groupedColor.r},${groupedColor.g},${groupedColor.b}`;
            colorCounts.set(colorKey, (colorCounts.get(colorKey) || 0) + 1);
            
            // 🔍 Debug log - hiển thị TẤT CẢ màu
            console.log(`Point ${index + 1} (${x},${y}): rgba(${r},${g},${b},${a}) → grouped: ${colorKey}`);
          }
        });

        // 🏆 Tìm màu xuất hiện nhiều nhất = màu background
        let mostCommonColor = '248,249,250';
        let maxCount = 0;

        console.log('🎨 Color frequency analysis (ALL COLORS):');
        for (const [color, count] of colorCounts.entries()) {
          console.log(`  ${color}: ${count} times`);
          if (count > maxCount) {
            maxCount = count;
            mostCommonColor = color;
          }
        }

        console.log(`🏆 Most common color: ${mostCommonColor} (${maxCount} occurrences)`);

        // 🎨 Convert sang rgba để set background
        const [r, g, b] = mostCommonColor.split(',').map(Number);
        const detectedColor = `rgba(${r}, ${g}, ${b}, 1)`;
        setBackgroundColor(detectedColor);
        
        console.log(`✅ Final background color: ${detectedColor}`);
        
      } catch (error) {
        console.log('❌ Could not extract background color:', error);
        
        // 🎨 Enhanced fallback colors theo subcategory
        const fallbackColors: Record<string, string> = {
          'rg': 'rgba(240, 248, 255, 0.3)', // Xanh nhạt cho RG
          'mg': 'rgba(255, 245, 245, 0.3)', // Đỏ nhạt cho MG
          'hg': 'rgba(245, 255, 245, 0.3)', // Xanh lá nhạt cho HG
          'pg': 'rgba(250, 245, 255, 0.3)', // Tím nhạt cho PG
          'fg': 'rgba(255, 250, 240, 0.3)', // Cam nhạt cho Figure-rise
          'sd': 'rgba(245, 245, 255, 0.3)', // Xanh đậm nhạt cho SD
          'bb': 'rgba(255, 248, 220, 0.3)', // Vàng nhạt cho BB
          'tools': 'rgba(248, 248, 248, 0.3)', // Xám nhạt cho Tools
        };
        setBackgroundColor(fallbackColors[subcategoryId] || defaultColor);
      }
    }
  }, [subcategoryId, defaultColor]); // Dependencies cho useCallback

  // 🎯 Helper function: Nhóm các màu tương tự lại với nhau
  const groupSimilarColors = (r: number, g: number, b: number, tolerance: number) => {
    // ✅ Làm tròn màu theo tolerance để nhóm màu tương tự
    const roundToTolerance = (value: number) => Math.round(value / tolerance) * tolerance;
    
    return {
      r: Math.min(255, Math.max(0, roundToTolerance(r))),
      g: Math.min(255, Math.max(0, roundToTolerance(g))),
      b: Math.min(255, Math.max(0, roundToTolerance(b)))
    };
  };

  // 📤 Return những gì component cần
  return {
    backgroundColor,    // Màu để set cho container
    imgRef,            // Ref để attach vào <img>
    handleImageLoad    // Function để gọi onLoad
  };
};