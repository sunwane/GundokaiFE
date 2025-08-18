import React from 'react';
import { Product } from '@/types/Product';

interface SearchDivProps {
  results: Product[];
  onSelect: (product: Product) => void;
  visible: boolean;
}

export default function SearchDiv({ results, onSelect, visible }: SearchDivProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };

  const handleSelectProduct = (product: Product) => {
    onSelect(product);
  };

  if (!visible || results.length === 0) {
    return null;
  }

  // Giới hạn hiển thị tối đa 5 kết quả
  const displayResults = results.slice(0, 10);

  return (
    <div style={styles.container}>
      <div style={styles.dropdown}>
        {displayResults.map((product) => (
          <div
            key={product.id}
            style={styles.resultItem}
            onClick={() => handleSelectProduct(product)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
            }}
          >
            {/* Product Image */}
            <div style={styles.imageContainer}>
              <img
                src={product.thumbnail}
                alt={product.product_Name}
                style={styles.image}
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder-product.jpg';
                }}
              />
            </div>

            {/* Product Info */}
            <div style={styles.infoContainer}>
              <h4 style={styles.productName}>
                {product.product_Name}
              </h4>
              <div style={styles.priceContainer}>
                <span style={styles.price}>
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Show more indicator if there are more results */}
        {results.length > 10 && (
          <div style={styles.moreResultsIndicator}>
            <span style={styles.moreResultsText}>
              Và {results.length - 10} sản phẩm khác...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  dropdown: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    marginTop: '4px',
    overflow: 'hidden',
    maxHeight: '400px', // Chiều cao cho phép hiển thị khoảng 5 kết quả
    overflowY: 'auto' as const,
  },
  resultItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    borderBottom: '1px solid #f3f4f6',
  },
  imageContainer: {
    flexShrink: 0,
    width: '50px',
    height: '50px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
  },
  infoContainer: {
    flex: 1,
    minWidth: 0,
  },
  productName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '4px',
    lineHeight: 1.3,
    // Text ellipsis for long names
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  price: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#dc2626',
  },
  moreResultsIndicator: {
    padding: '8px 16px',
    backgroundColor: '#f9fafb',
    borderTop: '1px solid #e5e7eb',
    textAlign: 'center' as const,
  },
  moreResultsText: {
    fontSize: '12px',
    color: '#6b7280',
    fontStyle: 'italic',
  },
};