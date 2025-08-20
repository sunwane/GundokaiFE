"use client";
import React, { useState, useEffect } from "react";
import PageHeader from "@/component/layout/header/PageHeader";
import CartItem from "@/component/features/cart/CartItem";
import LoadingSpinner from "@/component/ui/LoadingSpinner";
import PopupMessage from "@/component/ui/PopupMessage";
import { useCartPage } from "@/hooks/cart/useCartPage";
import { CartItem as CartItemType } from "@/types/Cart";
import { CheckoutForm } from "../../component/Form/CheckoutForm";
import { OrderService } from "@/services/OrderService";

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

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const calculateTotalAmount = () => {
    if (!cart.items || cart.items.length === 0) return 0;

    return cart.items.reduce(
      (
        total: number,
        item: { product: { price: number }; quantity: number }
      ) => {
        return total + item.product.price * item.quantity;
      },
      0
    );
  };

  const handleOrderSuccess = (order: any) => {
    console.log("Đặt hàng thành công:", order);

    try {
      const statusText = OrderService.getPaymentStatusText(order.paymentStatus);
      const formattedAmount = OrderService.formatPrice(order.totalAmount);

      if (order.paymentMethod === "VNPAY" && order.paymentUrl) {
        alert(
          `Đơn hàng đã được tạo thành công!\nMã đơn hàng: ${order.orderId}\nSố tiền: ${formattedAmount}\nTrạng thái: ${statusText}\nBạn sẽ được chuyển đến trang thanh toán VNPay.`
        );

        setTimeout(() => {
          window.location.href = order.paymentUrl;
        }, 2000);
      } else if (order.paymentMethod === "COD") {
        alert(
          `Đặt hàng COD thành công!\nMã đơn hàng: ${order.orderId}\nSố tiền: ${formattedAmount}\nTrạng thái: ${statusText}\nChúng tôi sẽ liên hệ với bạn sớm nhất.`
        );
      }

      setShowCheckoutForm(false);
    } catch (error) {
      console.error("Error in handleOrderSuccess:", error);
      alert(
        `Đặt hàng thành công!\nMã đơn hàng: ${
          order.orderId
        }\nSố tiền: ${order.totalAmount.toLocaleString("vi-VN")}₫`
      );
      setShowCheckoutForm(false);
    }
  };

  const prepareCheckoutItems = () => {
    if (!cart.items || cart.items.length === 0) return [];

    return cart.items.map(
      (item: {
        product: { id: any; product_Name: any; price: number };
        quantity: number;
      }) => ({
        productId: item.product.id,
        productName: item.product.product_Name,
        price: item.product.price,
        quantity: item.quantity,
        subTotal: item.product.price * item.quantity,
      })
    );
  };

  const totalAmount = calculateTotalAmount();

  const canCheckout = () => {
    return (
      cart.items &&
      cart.items.length > 0 &&
      cart.items.every(
        (item: {
          quantity: number;
          product: { stockQuantity: any };
          is_out_of_stock: any;
        }) =>
          item.quantity > 0 &&
          item.quantity <= (item.product.stockQuantity || 0) &&
          !item.is_out_of_stock
      )
    );
  };

  const handleCheckoutClick = () => {
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để thanh toán.");
      router.push("/auth");
      return;
    }

    if (canCheckout()) {
      setShowCheckoutForm(true);
    } else {
      alert(
        "Vui lòng kiểm tra lại giỏ hàng. Có sản phẩm hết hàng hoặc số lượng không hợp lệ."
      );
    }
  };

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

      <div
        style={{
          ...styles.container,
          padding: isMobile ? "16px 4vw" : "24px 5vw",
        }}
      >
        <div style={styles.header}>
          <h1 style={styles.title}>Giỏ hàng của bạn</h1>
          {cart?.items?.length > 0 && (
            <button
              style={styles.clearButton}
              onClick={handleClearCart}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fef2f2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              🗑️ Xóa toàn bộ
            </button>
          )}
        </div>

        {!cart?.items || cart.items.length === 0 ? (
          <div style={styles.emptyCart}>
            <div style={styles.emptyCartIcon}>🛒</div>
            <h2 style={styles.emptyCartTitle}>Giỏ hàng trống</h2>
            <p style={styles.emptyCartText}>
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm
              Gundam tuyệt vời của chúng tôi!
            </p>
            <button
              style={styles.shopNowButton}
              onClick={() => router.push("/products")}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1d4ed8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
              }}
            >
              Mua sắm ngay
            </button>
          </div>
        ) : (
          <div
            style={{
              ...styles.cartContent,
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "24px" : "32px",
            }}
          >
            <div style={styles.cartItems}>
              <div style={styles.itemsHeader}>
                <span style={styles.itemsCount}>
                  {cart.total_quantity || 0} sản phẩm
                </span>
              </div>

              <div style={styles.itemsList}>
                {cart.items?.map((item: CartItemType) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </div>

            <div style={styles.cartSummary}>
              <div style={styles.summaryCard}>
                <h3 style={styles.summaryTitle}>Tóm tắt đơn hàng</h3>

                <div style={styles.summaryContent}>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Tạm tính:</span>
                    <span style={styles.summaryValue}>
                      {formatPrice(cart.subtotal || 0)}
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
                      {formatPrice(cart.total_amount || 0)}
                    </span>
                  </div>
                </div>

                <button
                  style={{
                    ...styles.checkoutButton,
                    width: "100%",
                    backgroundColor: !canCheckout() ? "#9ca3af" : "#2563eb",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "16px",
                    fontWeight: "600",
                    marginTop: "16px",
                    cursor: !canCheckout() ? "not-allowed" : "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onClick={handleCheckoutClick}
                  disabled={!canCheckout()}
                  onMouseEnter={(e) => {
                    if (canCheckout()) {
                      e.currentTarget.style.backgroundColor = "#1d4ed8";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (canCheckout()) {
                      e.currentTarget.style.backgroundColor = "#2563eb";
                    }
                  }}
                >
                  {!canCheckout()
                    ? "Kiểm tra giỏ hàng"
                    : `Thanh toán (${formatPrice(cart.total_amount || 0)})`}
                </button>

                <button
                  style={styles.continueShoppingButton}
                  onClick={() => router.push("/products")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <PopupMessage
        popup={popupMessage.popup}
        onClose={popupMessage.hidePopup}
      />

      {showCheckoutForm && (
        <CheckoutForm
          cartItems={prepareCheckoutItems()}
          totalAmount={totalAmount}
          isOpen={showCheckoutForm}
          onClose={() => setShowCheckoutForm(false)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    minHeight: "70vh",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: "16px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#111827",
    margin: 0,
  },
  clearButton: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "#dc2626",
    border: "1px solid #dc2626",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  emptyCart: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    textAlign: "center" as const,
  },
  emptyCartIcon: {
    fontSize: "80px",
    marginBottom: "24px",
    opacity: 0.5,
  },
  emptyCartTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#374151",
    marginBottom: "12px",
  },
  emptyCartText: {
    fontSize: "16px",
    color: "#6b7280",
    marginBottom: "32px",
    maxWidth: "500px",
    lineHeight: 1.6,
  },
  shopNowButton: {
    padding: "12px 32px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
  cartContent: {
    display: "flex",
    alignItems: "flex-start",
  },
  cartItems: {
    flex: 1,
    minWidth: 0,
  },
  itemsHeader: {
    marginBottom: "20px",
  },
  itemsCount: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#374151",
  },
  itemsList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
  cartSummary: {
    width: "350px",
    flexShrink: 0,
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    padding: "24px",
    position: "sticky" as const,
    top: "100px",
  },
  summaryTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#111827",
    marginBottom: "20px",
  },
  summaryContent: {
    marginBottom: "24px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  summaryLabel: {
    fontSize: "16px",
    color: "#6b7280",
  },
  summaryValue: {
    fontSize: "16px",
    color: "#374151",
    fontWeight: "500",
  },
  summaryDivider: {
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "16px 0",
  },
  totalLabel: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#111827",
  },
  totalValue: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#dc2626",
  },
  checkoutButton: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s ease",
    marginBottom: "12px",
  },
  continueShoppingButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "transparent",
    color: "#6b7280",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};
