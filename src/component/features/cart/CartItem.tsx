import React from "react";
import { CartItem as CartItemType } from "@/types/Cart";
import CardLabel from "@/component/features/product/CardLabel";
import QuantitySelector from "@/component/ui/QuantitySelector";
import { useCategory } from "@/hooks/categories/useCategory";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({
  item,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + " VNĐ";
  };

  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(item.product.id, newQuantity);
  };

  const handleRemove = () => {
    onRemove(item.product.id);
  };

  // Hooks
  const { categoryName, subCategoryName, category, subCategory, loading } =
    useCategory(item.product.subcategory.id);

  console.log("id", item.product.subcategory.id);

  console.log({ categoryName, subCategoryName});

  return (
    <div style={styles.container}>
      {/* Product Image */}
      <div style={styles.imageContainer}>
        <img
          src={item.product.thumbnail}
          alt={item.product.productName}
          style={{
            ...styles.image,
            filter: item.is_out_of_stock ? "brightness(0.3)" : "none",
          }}
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder-product.jpg";
          }}
        />
        {item.is_out_of_stock && (
          <div style={styles.outOfStockOverlay}>
            <span style={styles.outOfStockText}>HẾT HÀNG</span>
          </div>
        )}

        {/* Stock status */}
        {item.is_out_of_stock ? (
          <div style={styles.stockStatus}>
            <span style={styles.outOfStockStatus}>
              Hết hàng
            </span>
          </div>
        ) : (
          <div style={styles.stockStatus}>
            <span style={styles.inStockStatus}>
              Còn {item.product.stockQuantity}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={styles.infoContainer}>
        <h3 style={styles.productName}>{item.product.productName}</h3>

        {/* Card Label */}
        <div style={styles.cardLabelContainer}>
          <CardLabel
            categoryId={categoryName || ""}
            subcategoryId={subCategoryName || ""}
          />
        </div>

        <div style={styles.priceRow}>
          <span style={styles.unitPrice}>
            Đơn giá: {formatPrice(item.product.price)}
          </span>
          <span style={styles.totalPrice}>
            Thành tiền: {formatPrice(item.total_price)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div style={styles.actionsContainer}>
        {/* Quantity Selector */}
        <div style={styles.quantityContainer}>
          <span style={styles.quantityLabel}>Số lượng:</span>
          <QuantitySelector
            quantity={item.quantity}
            onQuantityChange={handleQuantityChange}
            maxQuantity={item.product.stockQuantity}
            minQuantity={1}
            disabled={item.is_out_of_stock}
            size="small"
          />
        </div>

        {/* Remove Button */}
        <button
          style={styles.removeButton}
          onClick={handleRemove}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#fef2f2";
            e.currentTarget.style.color = "#dc2626";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#6b7280";
          }}
        >
          🗑️ Xóa
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "16px",
    padding: "20px 20px 20px 24px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    border: "1px solid #e5e7eb",
    alignItems: "flex-start",
  },
  imageContainer: {
    position: "relative" as const,
    flexShrink: 0,
    width: "120px",
    height: "120px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  outOfStockOverlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
  },
  outOfStockText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "14px",
    textAlign: "center" as const,
  },
  cardLabelContainer: {
    marginBottom: "12px",  
  },
  infoContainer: {
    flex: 1,
    minWidth: 0,
  },
  productName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#111827",
    marginBottom: "3px",
    lineHeight: 1.4,
  },
  priceRow: {
    display: "flex",
    flexDirection: "column" as const,
    marginBottom: "8px",
  },
  unitPrice: {
    fontSize: "14px",
    color: "#6b7280",
  },
  totalPrice: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#dc2626",
  },
  stockStatus: {
    position: "absolute" as const,
    top: "-6px",
    left: "-12px",
    zIndex: 2,
    color: "#fff",
  },
  inStockStatus: {
    fontSize: "14px",
    background: "#16a34a",
    fontWeight: "600",
    padding: "4px 6px",
    borderRadius: "8px",
  },
  outOfStockStatus: {
    fontSize: "14px",
    background: "#dc2626",
    fontWeight: "600",
    padding: "4px 6px",
    borderRadius: "8px",
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
    alignItems: "flex-end",
    minWidth: "140px",
  },
  quantityContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    alignItems: "flex-end",
  },
  quantityLabel: {
    fontSize: "14px",
    color: "#374151",
    fontWeight: "600",
  },
  removeButton: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "#6b7280",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
};
