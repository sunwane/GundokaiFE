import React, { useState } from 'react';
import { Product } from '@/types/Product';
import { ProductDetail } from '@/types/ProductDetail';
import { CartService } from '@/services/CartService';

interface ProductInfoProps {
  product: Product;
  productDetail?: ProductDetail | null;
  onAddToCart?: (productId: string, quantity: number) => void;
}

export default function ProductInfo({ product, productDetail, onAddToCart }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(prev + delta, product.stock_quantity || 1)));
  };

  const handleAddToCart = () => {
    try {
      CartService.addToCart(product, quantity);
      alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
      
      if (onAddToCart) {
        onAddToCart(product.id, quantity);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!');
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };

  const isOutOfStock = product.stock_quantity <= 0;

  // Render features based on ProductDetail data
  const renderFeatures = () => {
    if (!productDetail) {
      return (
        <ul style={styles.featureList}>
          <li>Đang tải thông tin chi tiết...</li>
        </ul>
      );
    }

    return (
      <ul style={styles.featureList}>
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
    <div style={styles.container}>
      {/* Product Title */}
      <h1 style={styles.title}>{product.product_Name}</h1>

      {/* Category Labels */}
      <div style={styles.labelRow}>
        <span style={styles.categoryLabel}>Gundam Model</span>
        <span style={styles.gradeLabel}>HG • High Grade</span>
      </div>

      {/* Price */}
      <div style={styles.priceRow}>
        <span style={styles.price}>{formatPrice(product.price)}</span>
      </div>

      {/* Stock Status */}
      <div style={styles.stockRow}>
        <span style={styles.stockLabel}>Tình trạng:</span>
        {isOutOfStock ? (
          <span style={styles.outOfStock}>Hết hàng</span>
        ) : (
          <span style={styles.inStock}>Còn hàng ({product.stock_quantity} sản phẩm)</span>
        )}
      </div>

      {/* Quantity and Add to Cart */}
      {!isOutOfStock && (
        <div style={styles.actionRow}>
          <div style={styles.quantitySection}>
            <span style={styles.quantityLabel}>Số lượng</span>
            <div style={styles.quantityControls}>
              <button 
                style={styles.quantityBtn} 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span style={styles.quantityValue}>{quantity}</span>
              <button 
                style={styles.quantityBtn} 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock_quantity}
              >
                +
              </button>
            </div>
          </div>
          <button 
            style={styles.addToCartBtn}
            onClick={handleAddToCart}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
          >
            Thêm giỏ hàng
          </button>
        </div>
      )}

      {/* Product Description Section */}
      <div style={styles.descriptionSection}>
        <h3 style={styles.sectionTitle}>Mô tả sản phẩm</h3>
        <div style={styles.description}>
          {product.description || 'Mô hình Gundam tỷ lệ 1/144 chất lượng cao từ Bandai. Sản phẩm được thiết kế chi tiết, có thể tùy chỉnh tư thế và trang bị vũ khí đa dạng. Phù hợp cho người sưu tập và những ai yêu thích dòng Gundam.'}
        </div>

        <h3 style={styles.sectionTitle}>Đặc điểm nổi bật:</h3>
        {renderFeatures()}
      </div>
    </div>
  );
}

// Styles giữ nguyên như cũ...
const styles = {
  container: {
    flex: 1,
    minWidth: 0,
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    padding: '32px',
    border: '1px solid #e5e7eb',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#111827',
    lineHeight: 1.3,
  },
  labelRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
    alignItems: 'center',
  },
  categoryLabel: {
    background: '#dbeafe',
    color: '#1e40af',
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
  },
  gradeLabel: {
    background: '#fef3c7',
    color: '#b45309',
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
  },
  priceRow: {
    marginBottom: '16px',
  },
  price: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#dc2626',
  },
  stockRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px',
  },
  stockLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
  },
  inStock: {
    color: '#059669',
    fontWeight: '600',
    fontSize: '16px',
  },
  outOfStock: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: '16px',
  },
  actionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid #e5e7eb',
  },
  quantitySection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  quantityLabel: {
    fontWeight: '600',
    fontSize: '16px',
    color: '#374151',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  quantityBtn: {
    width: '40px',
    height: '40px',
    border: 'none',
    background: '#f9fafb',
    color: '#374151',
    fontWeight: 'bold',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityValue: {
    width: '50px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px',
    background: '#fff',
    borderLeft: '1px solid #d1d5db',
    borderRight: '1px solid #d1d5db',
  },
  addToCartBtn: {
    padding: '12px 32px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  descriptionSection: {
    paddingTop: '24px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 12px 0',
    color: '#111827',
  },
  description: {
    fontSize: '15px',
    color: '#4b5563',
    marginBottom: '24px',
    lineHeight: 1.6,
  },
  featureList: {
    fontSize: '15px',
    color: '#4b5563',
    marginBottom: '0',
    paddingLeft: '20px',
    lineHeight: 1.8,
  },
};