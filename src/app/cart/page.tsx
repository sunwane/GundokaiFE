'use client';
import React from 'react';
import PageHeader from "@/component/layout/header/PageHeader";
import CartItem from "@/component/features/cart/CartItem";
import LoadingSpinner from "@/component/ui/LoadingSpinner";
import PopupMessage from "@/component/ui/PopupMessage";
import { useCartPage } from "@/hooks/cart/useCartPage";
import { CartItem as CartItemType } from '@/types/Cart';

export default function CartPage() {
  const {
    cart,
    loading,
    isMobile,
    router,
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
    handleCheckout,
    formatPrice,
    popupMessage,
  } = useCartPage();

  if (loading) {
    return (
      <div>
        <PageHeader />
        <div style={styles.loadingContainer}>
          <LoadingSpinner text="Đang tải giỏ hàng..." size="large" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader />
      
      <div style={{
        ...styles.container,
        padding: isMobile ? '16px 4vw' : '24px 5vw',
      }}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Giỏ hàng của bạn</h1>
          {cart.items.length > 0 && (
            <button 
              style={styles.clearButton}
              onClick={handleClearCart}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fef2f2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              🗑️ Xóa toàn bộ
            </button>
          )}
        </div>

        {/* Cart Content - giữ nguyên phần render */}
        {cart.items.length === 0 ? (
          <div style={styles.emptyCart}>
            <div style={styles.emptyCartIcon}>🛒</div>
            <h2 style={styles.emptyCartTitle}>Giỏ hàng trống</h2>
            <p style={styles.emptyCartText}>
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm Gundam tuyệt vời của chúng tôi!
            </p>
            <button 
              style={styles.shopNowButton}
              onClick={() => router.push('/products')}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
            >
              Mua sắm ngay
            </button>
          </div>
        ) : (
          <div style={{
            ...styles.cartContent,
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '24px' : '32px',
          }}>
            {/* Cart Items */}
            <div style={styles.cartItems}>
              <div style={styles.itemsHeader}>
                <span style={styles.itemsCount}>
                  {cart.total_quantity} sản phẩm
                </span>
              </div>
              
              <div style={styles.itemsList}>
                {cart.items.map((item: CartItemType) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div style={styles.cartSummary}>
              <div style={styles.summaryCard}>
                <h3 style={styles.summaryTitle}>Tóm tắt đơn hàng</h3>
                
                <div style={styles.summaryContent}>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Tạm tính:</span>
                    <span style={styles.summaryValue}>
                      {formatPrice(cart.subtotal)}
                    </span>
                  </div>
                  
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Phí vận chuyển:</span>
                    <span style={styles.summaryValue}>Miễn phí</span>
                  </div>
                  
                  <div style={styles.summaryDivider}></div>
                  
                  <div style={styles.summaryRow}>
                    <span style={styles.totalLabel}>Tổng cộng:</span>
                    <span style={styles.totalValue}>
                      {formatPrice(cart.total_amount)}
                    </span>
                  </div>
                </div>

                <button 
                  style={styles.checkoutButton}
                  onClick={handleCheckout}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1d4ed8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                  }}
                >
                  Thanh toán
                </button>

                <button 
                  style={styles.continueShoppingButton}
                  onClick={() => router.push('/products')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popup Message */}
      <PopupMessage 
        popup={popupMessage.popup} 
        onClose={popupMessage.hidePopup} 
      />
    </div>
  );
}

// Styles giữ nguyên...
const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    minHeight: '70vh',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    borderBottom: '2px solid #e5e7eb',
    paddingBottom: '16px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#111827',
    margin: 0,
  },
  clearButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#dc2626',
    border: '1px solid #dc2626',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  emptyCart: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    textAlign: 'center' as const,
  },
  emptyCartIcon: {
    fontSize: '80px',
    marginBottom: '24px',
    opacity: 0.5,
  },
  emptyCartTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: '12px',
  },
  emptyCartText: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '32px',
    maxWidth: '500px',
    lineHeight: 1.6,
  },
  shopNowButton: {
    padding: '12px 32px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  },
  cartContent: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  cartItems: {
    flex: 1,
    minWidth: 0,
  },
  itemsHeader: {
    marginBottom: '20px',
  },
  itemsCount: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#374151',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  cartSummary: {
    width: '350px',
    flexShrink: 0,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #e5e7eb',
    padding: '24px',
    position: 'sticky' as const,
    top: '100px',
  },
  summaryTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '20px',
  },
  summaryContent: {
    marginBottom: '24px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  summaryLabel: {
    fontSize: '16px',
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: '16px',
    color: '#374151',
    fontWeight: '500',
  },
  summaryDivider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '16px 0',
  },
  totalLabel: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#111827',
  },
  totalValue: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#dc2626',
  },
  checkoutButton: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    marginBottom: '12px',
  },
  continueShoppingButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};