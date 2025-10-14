"use client";
import React, { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import { ProductService } from "@/services/ProductService";
import ProductCard from "@/component/features/product/ProductCard";
import { useRouter } from "next/navigation";

interface ProductShowcaseProps {
  isMobile?: boolean;
}

export default function ProductShowcase({ isMobile = false }: ProductShowcaseProps) {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch cả 2 loại sản phẩm cùng lúc
        const [hotResponse, latestResponse] = await Promise.all([
          ProductService.getHotProducts(),
          ProductService.getLatestProducts()
        ]);
        setHotProducts(hotResponse?.result || hotResponse || []);
        setLatestProducts(latestResponse?.result || latestResponse || []);
      } catch (error) {
        console.error('Error fetching showcase products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    router.push(`/productDetail?id=${product.id}`);
  };

  if (loading) {
    return (
      <section style={{
        ...styles.section,
        padding: isMobile ? "40px 0" : "80px 0",
      }}>
        <div style={{
          ...styles.container,
          padding: isMobile ? "0 16px" : "0 24px",
        }}>
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Đang tải sản phẩm...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{
      ...styles.section,
      padding: isMobile ? "40px 0" : "80px 0",
    }}>
      <div style={{
        ...styles.container,
        padding: isMobile ? "0 16px" : "0 24px",
      }}>
        
        {/* Hot Products Section */}
        <div style={{
          ...styles.showcase,
          marginBottom: isMobile ? "40px" : "60px",
        }}>
          {/* Hot Products Title */}
          <div style={{
            ...styles.hotTitleContainer,
            marginBottom: isMobile ? "24px" : "40px",
          }}>
            <div style={styles.hotTitleWrapper}>
              <span style={{
                ...styles.hotIcon,
                fontSize: isMobile ? "20px" : "28px",
              }}>🔥</span>
              <h2 style={{
                ...styles.hotTitle,
                fontSize: isMobile ? "24px" : "36px",
                letterSpacing: isMobile ? "1px" : "2px",
              }}>SẮP CHÁY HÀNG</h2>
              <span style={{
                ...styles.hotIcon,
                fontSize: isMobile ? "20px" : "28px",
              }}>🔥</span>
            </div>
            <div style={{
              ...styles.hotSubtitle,
              fontSize: isMobile ? "14px" : "16px",
            }}>Nhanh tay kẻo hết!</div>
            <div style={{
              ...styles.hotGlow,
              width: isMobile ? "200px" : "300px",
              height: isMobile ? "40px" : "60px",
            }}></div>
          </div>
          
          {/* Hot Products Horizontal Scroll */}
          <div 
            className="product-grid"
            style={{
              ...styles.productGridHorizontal,
              gap: isMobile ? "24px" : "32px",
              justifyContent: isMobile? "flex-start" : "center",
              flexDirection: isMobile? "row" as const : "row" as const,
              flexWrap: isMobile? "nowrap" as const : "wrap" as const,
              padding: isMobile ? "0 5px 10px 5px" : "0 10px 15px 10px",
            }}
          >
            {hotProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
                isMobile={isMobile}
                style={{
                  flexShrink: 0,
                  width: isMobile ? "150px" : "200px",
                  scrollSnapAlign: "start",
                }}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          ...styles.divider,
          margin: isMobile ? "30px 0" : "40px 0",
        }}></div>

        {/* Latest Products Section */}
        <div style={{
          ...styles.showcase,
          marginBottom: isMobile ? "40px" : "60px",
        }}>
          {/* Latest Products Title */}
          <div style={{
            ...styles.freshTitleContainer,
            marginBottom: isMobile ? "24px" : "40px",
          }}>
            <div style={styles.freshTitleWrapper}>
              <span style={{
                ...styles.freshIcon,
                fontSize: isMobile ? "20px" : "28px",
              }}>✨</span>
              <h2 style={{
                ...styles.freshTitle,
                fontSize: isMobile ? "24px" : "36px",
                letterSpacing: isMobile ? "1px" : "2px",
              }}>HÀNG MỚI</h2>
              <span style={{
                ...styles.freshIcon,
                fontSize: isMobile ? "20px" : "28px",
              }}>✨</span>
            </div>
            <div style={{
              ...styles.freshSubtitle,
              fontSize: isMobile ? "14px" : "16px",
            }}>Mới về từ Nhật Bản</div>
            <div style={{
              ...styles.freshGlow,
              width: isMobile ? "200px" : "300px",
              height: isMobile ? "40px" : "60px",
            }}></div>
          </div>
          
          {/* Latest Products Horizontal Scroll */}
          <div 
            className="product-grid"
            style={{
              ...styles.productGridHorizontal,
              gap: isMobile ? "24px" : "32px",
              justifyContent: isMobile? "flex-start" : "center",
              flexDirection: isMobile? "row" as const : "row" as const,
              flexWrap: isMobile? "nowrap" as const : "wrap" as const,
              padding: isMobile ? "0 5px 10px 5px" : "0 10px 15px 10px",
            }}
          >
            {latestProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
                isMobile={isMobile}
                style={{
                  flexShrink: 0,
                  width: isMobile ? "150px" : "200px",
                  scrollSnapAlign: "start",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
  },
  container: {
    maxWidth: "1260px",
    margin: "0 auto",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 0",
  },
  loadingSpinner: {
    width: "40px",
    height: "40px",
    border: "3px solid rgba(37, 99, 235, 0.3)",
    borderTop: "3px solid #2563eb",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "16px",
  },
  loadingText: {
    color: "#6b7280",
    fontSize: "16px",
  },
  showcase: {},
  
  // Horizontal scrolling product grid
  productGridHorizontal: {
    display: "flex",
    alignItems: "center",
    overflowX: "auto" as const,
    overflowY: "hidden" as const,
    scrollBehavior: "smooth" as const,
    scrollSnapType: "x mandatory",
    WebkitOverflowScrolling: "touch" as const, // Smooth scrolling on iOS
    msOverflowStyle: "none" as const, // Hide scrollbar on IE
    scrollbarWidth: "thin" as const, // Thin scrollbar on Firefox
  },

  // Hot Products Styles
  hotTitleContainer: {
    position: "relative" as const,
    textAlign: "center" as const,
  },
  hotTitleWrapper: {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    position: "relative" as const,
    zIndex: 2,
    flexWrap: "nowrap" as const,
  },
  hotTitle: {
    fontWeight: "900",
    background: "linear-gradient(45deg, #ff4444, #ff8800, #ffaa00)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    textShadow: "0 0 30px rgba(255, 68, 68, 0.5)",
    margin: 0,
    animation: "hotPulse 2s ease-in-out infinite alternate",
    whiteSpace: "nowrap" as const,
  },
  hotIcon: {
    animation: "bounce 1s ease-in-out infinite alternate",
  },
  hotSubtitle: {
    color: "#dc2626",
    fontWeight: "600",
    marginTop: "8px",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
  },
  hotGlow: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "radial-gradient(ellipse, rgba(255, 68, 68, 0.3) 0%, transparent 70%)",
    filter: "blur(20px)",
    zIndex: 1,
  },

  // Fresh Products Styles
  freshTitleContainer: {
    position: "relative" as const,
    textAlign: "center" as const,
  },
  freshTitleWrapper: {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    position: "relative" as const,
    zIndex: 2,
    flexWrap: "nowrap" as const,
  },
  freshTitle: {
    fontWeight: "900",
    background: "linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    textShadow: "0 0 30px rgba(16, 185, 129, 0.5)",
    margin: 0,
    animation: "freshGlow 3s ease-in-out infinite alternate",
    whiteSpace: "nowrap" as const,
  },
  freshIcon: {
    animation: "sparkle 2s ease-in-out infinite",
  },
  freshSubtitle: {
    color: "#059669",
    fontWeight: "600",
    marginTop: "8px",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
  },
  freshGlow: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "radial-gradient(ellipse, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
    filter: "blur(20px)",
    zIndex: 1,
  },

  divider: {
    height: "2px",
    background: "linear-gradient(90deg, transparent 0%, #cbd5e1 50%, transparent 100%)",
  },
};

// CSS Animations và Scrollbar customization
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes hotPulse {
      0% { 
        transform: scale(1);
        text-shadow: 0 0 30px rgba(255, 68, 68, 0.5);
      }
      100% { 
        transform: scale(1.05);
        text-shadow: 0 0 40px rgba(255, 68, 68, 0.8);
      }
    }
    
    @keyframes bounce {
      0% { transform: translateY(0px); }
      100% { transform: translateY(-8px); }
    }
    
    @keyframes freshGlow {
      0% { 
        transform: scale(1);
        text-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
      }
      100% { 
        transform: scale(1.02);
        text-shadow: 0 0 35px rgba(16, 185, 129, 0.7);
      }
    }
    
    @keyframes sparkle {
      0%, 100% { 
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
      50% { 
        transform: scale(1.2) rotate(180deg);
        opacity: 0.8;
      }
    }

    /* Custom scrollbar styling */
    .product-grid::-webkit-scrollbar {
      height: 8px;
    }
    
    .product-grid::-webkit-scrollbar-track {
      background: rgba(241, 245, 249, 0.8);
      border-radius: 4px;
      margin: 0 10px;
    }
    
    .product-grid::-webkit-scrollbar-thumb {
      background: linear-gradient(90deg, #cbd5e1, #94a3b8);
      border-radius: 4px;
      transition: background 0.3s ease;
    }
    
    .product-grid::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(90deg, #94a3b8, #64748b);
    }

    /* Mobile specific styles */
    @media (max-width: 768px) {
      .product-grid::-webkit-scrollbar {
        height: 6px;
      }
      
      .product-grid::-webkit-scrollbar-track {
        margin: 0 5px;
      }
    }

    /* Firefox scrollbar */
    .product-grid {
      scrollbar-width: thin;
      scrollbar-color: #cbd5e1 rgba(241, 245, 249, 0.8);
    }
  `;
  document.head.appendChild(style);
}