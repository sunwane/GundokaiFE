import React, { useState } from "react";
import { Product } from "@/types/Product";
import { ProductDetail } from "@/types/ProductDetail";
import { CartService } from "@/services/CartService";
import { useCategory } from "@/hooks/categories/useCategory";
import { usePopupMessage } from "@/hooks/ui/usePopupMessage";
import PopupMessage from "@/component/ui/PopupMessage";

interface ProductInfoProps {
  product: Product;
  productDetail?: ProductDetail | null;
  onAddToCart?: (productId: string, quantity: number) => void;
  isMobile: boolean;
}

export default function ProductInfo({
  isMobile,
  product,
  productDetail,
  onAddToCart,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const popupMessage = usePopupMessage();

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(prev + delta, product.stockQuantity || 1))
    );
  };

  // Hooks
  const { categoryName, subCategoryName } = useCategory(
    product.subcategory.id
  );

  const handleAddToCart = () => {
    try {
      CartService.addToCart(product, quantity);

      popupMessage.showSuccess({
        title: "Thành công!",
        message: `Đã thêm ${quantity} sản phẩm "${product.productName}" vào giỏ hàng`,
        duration: 3000,
      });

      setQuantity(1);

      if (onAddToCart) {
        onAddToCart(product.id, quantity);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);

      popupMessage.showError({
        title: "Lỗi!",
        message:
          "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại!",
        duration: 4000,
      });
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + " VNĐ";
  };

  // Logic xử lý trạng thái
  const isComingSoon = product.status === "Hàng sắp về";
  const isOutOfStock =
    !isComingSoon &&
    (product.stockQuantity <= 0 || product.status === "Hết hàng");
  const isInStock = !isComingSoon && !isOutOfStock;

  // Render features based on ProductDetail data
  const renderFeatures = () => {
    if (!productDetail) {
      return (
        <ul style={{
          ...styles.featureList,
          fontSize: isMobile ? '13px' : '15px',
        }}>
          <li style={{ fontStyle: "italic", color: "#9ca3af" }}>
            Đang tải thông tin chi tiết...
          </li>
        </ul>
      );
    }

    return (
      <ul style={{
        ...styles.featureList,
        fontSize: isMobile ? '13px' : '15px',
      }}>
        <li>Tỷ lệ {productDetail.ratio}</li>
        <li>Chất liệu {productDetail.material}</li>
        <li>Nhà sản xuất: {productDetail.manufacturer}</li>
        <li>Xuất xứ: {productDetail.origin}</li>
        <li>Chiều cao hoàn thiện: {productDetail.height}</li>
        <li>Bao gồm vũ khí và phụ kiện</li>
        <li>Hướng dẫn lắp ráp chi tiết</li>
      </ul>
    );
  };

  return (
    <>
      <div style={styles.container}>
        {/* Product Title */}
        <h1 style={{
          ...styles.title,
          fontSize: isMobile ? '22px' : '28px',
        }}>
          {product.productName}
        </h1>

        {/* Category Labels */}
        <div style={styles.labelRow}>
          <span style={{
            ...styles.categoryLabel,
            fontSize: isMobile ? '10px' : '12px',
          }}>
            {categoryName}
          </span>
          <span style={{
            ...styles.gradeLabel,
            fontSize: isMobile ? '10px' : '12px',
          }}>
            {subCategoryName}
          </span>
        </div>

        {/* Price */}
        <div style={styles.priceRow}>
          <span style={{
            ...styles.price,
            fontSize: isMobile ? '26px' : '32px',
          }}>
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Stock Status */}
        <div style={styles.stockRow}>
          <span style={{
            ...styles.stockLabel,
            fontSize: isMobile ? '14px' : '16px',
          }}>
            Tình trạng:
          </span>
          {isComingSoon ? (
            <span style={{
              ...styles.comingSoon,
              fontSize: isMobile ? '14px' : '16px',
            }}>
              Hàng sắp về
            </span>
          ) : isOutOfStock ? (
            <span style={{
              ...styles.outOfStock,
              fontSize: isMobile ? '14px' : '16px',
            }}>
              Hết hàng
            </span>
          ) : (
            <span style={{
              ...styles.inStock,
              fontSize: isMobile ? '14px' : '16px',
            }}>
              Còn hàng ({product.stockQuantity} sản phẩm)
            </span>
          )}
        </div>

        {/* Quantity and Add to Cart - Chỉ hiện khi còn hàng */}
        {isInStock && (
          <div style={styles.actionRow}>
            <div style={styles.quantitySection}>
              <span style={{
                ...styles.quantityLabel,
                fontSize: isMobile ? '14px' : '16px',
              }}>
                Số lượng
              </span>
              <div style={styles.quantityControls}>
                <button
                  style={{
                    ...styles.quantityBtn,
                    fontSize: isMobile ? '16px' : '18px',
                    opacity: quantity <= 1 ? 0.5 : 1,
                    cursor: quantity <= 1 ? "not-allowed" : "pointer",
                  }}
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  onMouseEnter={(e) => {
                    if (quantity > 1) {
                      e.currentTarget.style.backgroundColor = "#e5e7eb";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                  }}
                >
                  -
                </button>
                <span style={{
                  ...styles.quantityValue,
                  fontSize: isMobile ? '14px' : '16px',
                }}>
                  {quantity}
                </span>
                <button
                  style={{
                    ...styles.quantityBtn,
                    fontSize: isMobile ? '16px' : '18px',
                    opacity: quantity >= product.stockQuantity ? 0.5 : 1,
                    cursor:
                      quantity >= product.stockQuantity
                        ? "not-allowed"
                        : "pointer",
                  }}
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockQuantity}
                  onMouseEnter={(e) => {
                    if (quantity < product.stockQuantity) {
                      e.currentTarget.style.backgroundColor = "#e5e7eb";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <button
              style={{
                ...styles.addToCartBtn,
                fontSize: '16px',
                padding: isMobile ? '10px 16px' : '12px 32px',
              }}
              onClick={handleAddToCart}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1d4ed8";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {isMobile ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '16px' }}>
                  + <img style={styles.iconCart} src={'./images/icons/whiteCart.png'} alt="Giỏ" />
                </div>
              ) : (
                "Thêm giỏ hàng"
              )}
            </button>
          </div>
        )}

        {/* Coming Soon Section */}
        {isComingSoon && (
          <div style={styles.comingSoonSection}>
            <button style={{
              ...styles.comingSoonBtn,
              fontSize: isMobile ? '14px' : '16px',
            }} disabled>
              Hàng sắp về
            </button>
            <p style={{
              ...styles.comingSoonText,
              fontSize: isMobile ? '12px' : '14px',
            }}>
              Sản phẩm đang được nhập về. Chúng tôi sẽ thông báo khi có hàng!
            </p>
          </div>
        )}

        {/* Out of Stock Section */}
        {isOutOfStock && (
          <div style={styles.outOfStockSection}>
            <button style={{
              ...styles.outOfStockBtn,
              fontSize: isMobile ? '14px' : '16px',
            }} disabled>
              Hết hàng
            </button>
            <p style={{
              ...styles.outOfStockText,
              fontSize: isMobile ? '12px' : '14px',
            }}>
              Sản phẩm tạm thời hết hàng. Vui lòng quay lại sau!
            </p>
          </div>
        )}

        {/* Product Description Section */}
        <div style={styles.descriptionSection}>
          <h3 style={{
            ...styles.sectionTitle,
            fontSize: isMobile ? '18px' : '20px',
          }}>
            Mô tả sản phẩm
          </h3>
          <div style={{
            ...styles.description,
            fontSize: isMobile ? '13px' : '15px',
          }}>
            {product.description ||
              "Mô hình Gundam tỷ lệ 1/144 chất lượng cao từ Bandai. Sản phẩm được thiết kế chi tiết, có thể tùy chỉnh tư thế và trang bị vũ khí đa dạng. Phù hợp cho người sưu tập và những ai yêu thích dòng Gundam."}
          </div>

          <h3 style={{
            ...styles.sectionTitle,
            fontSize: isMobile ? '18px' : '20px',
          }}>
            Đặc điểm nổi bật:
          </h3>
          {renderFeatures()}
        </div>
      </div>

      <PopupMessage
        popup={popupMessage.popup}
        onClose={popupMessage.hidePopup}
      />
    </>
  );
}

// Styles (giữ nguyên, chỉ thêm responsive font size)
const styles = {
  container: {
    flex: 1,
    minWidth: 0,
    background: "#fff",
    marginTop: "8px",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#111827",
    lineHeight: 1.3,
  },
  labelRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
    alignItems: "center",
  },
  categoryLabel: {
    background: "#dbeafe",
    color: "#1e40af",
    padding: "6px 12px",
    borderRadius: "15px",
    fontWeight: "600",
  },
  gradeLabel: {
    background: "#fef3c7",
    color: "#b45309",
    padding: "6px 12px",
    borderRadius: "15px",
    fontWeight: "600",
  },
  priceRow: {
    marginBottom: "0px",
  },
  price: {
    fontWeight: "bold",
    color: "#FB2F38",
  },
  stockRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "24px",
  },
  stockLabel: {
    fontWeight: "600",
    color: "#a3a3a3",
  },
  inStock: {
    color: "#059669",
    fontWeight: "600",
  },
  outOfStock: {
    color: "#dc2626",
    fontWeight: "600",
  },
  comingSoon: {
    color: "#d97706",
    fontWeight: "600",
  },
  actionRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
    marginBottom: "32px",
    padding: "24px 0px",
    borderTop: "1px solid #e5e7eb",
    borderBottom: "1px solid #e5e7eb",
  },
  quantitySection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  quantityLabel: {
    fontWeight: "600",
    color: "#374151",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "0",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    overflow: "hidden",
  },
  quantityBtn: {
    width: "40px",
    height: "40px",
    border: "none",
    background: "#f9fafb",
    color: "#374151",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityValue: {
    width: "50px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    background: "#fff",
    borderLeft: "1px solid #d1d5db",
    borderRight: "1px solid #d1d5db",
  },
  addToCartBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
  },
  comingSoonSection: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "12px",
    marginBottom: "32px",
    padding: "24px 0px",
    borderTop: "1px solid #e5e7eb",
    borderBottom: "1px solid #e5e7eb",
  },
  comingSoonBtn: {
    padding: "12px 32px",
    background: "#fef3c7",
    color: "#b45309",
    border: "1px solid #fbbf24",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "not-allowed",
  },
  comingSoonText: {
    color: "#b45309",
    textAlign: "center" as const,
    margin: 0,
  },
  outOfStockSection: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "12px",
    marginBottom: "32px",
    padding: "24px 0px",
    borderTop: "1px solid #e5e7eb",
    borderBottom: "1px solid #e5e7eb",
  },
  outOfStockBtn: {
    padding: "12px 32px",
    background: "#f3f4f6",
    color: "#9ca3af",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "not-allowed",
  },
  outOfStockText: {
    color: "#6b7280",
    textAlign: "center" as const,
    margin: 0,
  },
  descriptionSection: {
    paddingTop: "24px",
  },
  sectionTitle: {
    fontWeight: "bold",
    margin: "0 0 12px 0",
    color: "#111827",
  },
  description: {
    color: "#4b5563",
    marginBottom: "24px",
    lineHeight: 1.6,
  },
  featureList: {
    color: "#4b5563",
    marginBottom: "0",
    paddingLeft: "20px",
    lineHeight: 1.8,
  },
  iconCart: {
    width: '24px',
    height: '24px',
  },
};
