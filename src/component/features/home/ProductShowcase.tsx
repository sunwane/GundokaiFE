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
        setHotProducts(hotResponse.result);
        setLatestProducts(latestResponse.result);
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
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Đang tải sản phẩm...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        
        {/* Hot Products Section */}
        <div style={styles.showcase}>
          {/* Hot Products Title - Style cháy */}
          <div style={styles.hotTitleContainer}>
            <div style={styles.hotTitleWrapper}>
              <span style={styles.hotIcon}>🔥</span>
              <h2 style={styles.hotTitle}>SẮP CHÁY HÀNG</h2>
              <span style={styles.hotIcon}>🔥</span>
            </div>
            <div style={styles.hotSubtitle}>Nhanh tay kẻo hết!</div>
            <div style={styles.hotGlow}></div>
          </div>
          
          {/* Hot Products List */}
          <div style={{
            ...styles.productGrid,
            justifyContent: isMobile ? "flex-start" : "center",
            overflowX: isMobile ? "auto" : "visible",
            gap: isMobile ? "12px" : "20px",
          }}>
            {hotProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
                isMobile={isMobile}
                style={{
                  flexShrink: 0,
                  ...(isMobile ? { width: "140px" } : {}),
                }}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={styles.divider}></div>

        {/* Latest Products Section */}
        <div style={styles.showcase}>
          {/* Latest Products Title - Style fresh */}
          <div style={styles.freshTitleContainer}>
            <div style={styles.freshTitleWrapper}>
              <span style={styles.freshIcon}>✨</span>
              <h2 style={styles.freshTitle}>HÀNG MỚI</h2>
              <span style={styles.freshIcon}>✨</span>
            </div>
            <div style={styles.freshSubtitle}>Mới về từ Nhật Bản</div>
            <div style={styles.freshGlow}></div>
          </div>
          
          {/* Latest Products List */}
          <div style={{
            ...styles.productGrid,
            justifyContent: isMobile ? "flex-start" : "center",
            overflowX: isMobile ? "auto" : "visible",
            gap: isMobile ? "12px" : "20px",
          }}>
            {latestProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
                isMobile={isMobile}
                style={{
                  flexShrink: 0,
                  ...(isMobile ? { width: "140px" } : {}),
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
    padding: "80px 0",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
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
  showcase: {
    marginBottom: "60px",
  },
  
  // Hot Products Styles - Cháy
  hotTitleContainer: {
    position: "relative" as const,
    textAlign: "center" as const,
    marginBottom: "40px",
  },
  hotTitleWrapper: {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    position: "relative" as const,
    zIndex: 2,
  },
  hotTitle: {
    fontSize: "36px",
    fontWeight: "900",
    background: "linear-gradient(45deg, #ff4444, #ff8800, #ffaa00)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    textShadow: "0 0 30px rgba(255, 68, 68, 0.5)",
    letterSpacing: "2px",
    margin: 0,
    animation: "hotPulse 2s ease-in-out infinite alternate",
  },
  hotIcon: {
    fontSize: "28px",
    animation: "bounce 1s ease-in-out infinite alternate",
  },
  hotSubtitle: {
    fontSize: "16px",
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
    width: "300px",
    height: "60px",
    background: "radial-gradient(ellipse, rgba(255, 68, 68, 0.3) 0%, transparent 70%)",
    filter: "blur(20px)",
    zIndex: 1,
  },

  // Fresh Products Styles - Fresh
  freshTitleContainer: {
    position: "relative" as const,
    textAlign: "center" as const,
    marginBottom: "40px",
  },
  freshTitleWrapper: {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    position: "relative" as const,
    zIndex: 2,
  },
  freshTitle: {
    fontSize: "36px",
    fontWeight: "900",
    background: "linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    textShadow: "0 0 30px rgba(16, 185, 129, 0.5)",
    letterSpacing: "2px",
    margin: 0,
    animation: "freshGlow 3s ease-in-out infinite alternate",
  },
  freshIcon: {
    fontSize: "28px",
    animation: "sparkle 2s ease-in-out infinite",
  },
  freshSubtitle: {
    fontSize: "16px",
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
    width: "300px",
    height: "60px",
    background: "radial-gradient(ellipse, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
    filter: "blur(20px)",
    zIndex: 1,
  },

  productGrid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap" as const,
    padding: "0 10px",
  },
  divider: {
    height: "2px",
    background: "linear-gradient(90deg, transparent 0%, #cbd5e1 50%, transparent 100%)",
    margin: "40px 0",
  },
};

// CSS Animations
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
  `;
  document.head.appendChild(style);
}