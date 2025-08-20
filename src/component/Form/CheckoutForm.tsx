// components/forms/CheckoutForm.tsx
import React, { useState } from "react";
import { CreateOrderRequest, PaymentMethod } from "@/types/Order";
import { OrderService } from "@/services/OrderService";

interface CheckoutItem {
  productId: string;
  productName: string;
  price: number; // Giá đơn vị
  quantity: number;
  subTotal: number; // Tổng tiền cho sản phẩm này
}

interface CheckoutFormProps {
  cartItems: CheckoutItem[];
  totalAmount: number;
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: any) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  cartItems,
  totalAmount,
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    address: "",
    paymentMethod: "VNPAY" as PaymentMethod,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Cart items:", cartItems);
      console.log("Total amount:", totalAmount);
      const orderRequest: CreateOrderRequest = {
        total: totalAmount,
        paymentMethod: formData.paymentMethod,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        customerName: formData.customerName,
        email: formData.email,
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      console.log("Sending order request:", orderRequest);
      // ✅ Validation trước khi gửi
      if (totalAmount <= 0) {
        setError("Tổng tiền đơn hàng phải lớn hơn 0");
        return;
      }

      if (cartItems.length === 0) {
        setError("Giỏ hàng không có sản phẩm");
        return;
      }
      const response = await OrderService.createOrder(orderRequest);

      console.log("Order response:", response);

      if (response.code === 1000) {
        onOrderSuccess(response.result);

        // Xử lý theo payment method và status
        if (formData.paymentMethod === "VNPAY") {
          if (response.result.paymentUrl) {
            // VNPay URL có sẵn - sẽ redirect trong handleOrderSuccess
          } else {
            alert("Có lỗi khi tạo link thanh toán VNPay. Vui lòng thử lại.");
          }
        } else if (formData.paymentMethod === "COD") {
          // COD - thông báo đã được xử lý trong handleOrderSuccess
        }
      } else {
        setError(response.message || "Có lỗi xảy ra khi tạo đơn hàng");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi tạo đơn hàng"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Format giá tiền VND
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Xác nhận đặt hàng</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-3">Chi tiết đơn hàng</h3>
          <div className="space-y-3">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-2 last:border-b-0"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.productName}</p>
                    <p className="text-xs text-gray-600">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">
                      {formatPrice(item.subTotal)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t border-gray-300 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Tổng cộng:</span>
                <span className="font-bold text-lg text-red-600">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-semibold">Lỗi:</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên khách hàng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên *
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập họ và tên đầy đủ"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@email.com"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              pattern="[0-9]{10,11}"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập số điện thoại (10-11 số)"
            />
          </div>

          {/* Địa chỉ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ giao hàng *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập địa chỉ chi tiết (số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
            />
          </div>

          {/* Phương thức thanh toán */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phương thức thanh toán *
            </label>
            <div className="space-y-3">
              <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="VNPAY"
                  checked={formData.paymentMethod === "VNPAY"}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center mr-3 text-xs font-bold">
                    VNP
                  </div>
                  <div>
                    <p className="font-medium">Thanh toán qua VNPay</p>
                    <p className="text-xs text-gray-600">
                      Thanh toán online qua ví điện tử, ngân hàng
                    </p>
                  </div>
                </div>
              </label>

              <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={formData.paymentMethod === "COD"}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-600 text-white rounded flex items-center justify-center mr-3 text-xs">
                    💵
                  </div>
                  <div>
                    <p className="font-medium">
                      Thanh toán khi nhận hàng (COD)
                    </p>
                    <p className="text-xs text-gray-600">
                      Thanh toán bằng tiền mặt khi nhận hàng
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
              disabled={isLoading}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
            >
              {isLoading
                ? "Đang xử lý..."
                : formData.paymentMethod === "VNPAY"
                ? `Thanh toán ${formatPrice(totalAmount)}`
                : `Đặt hàng COD ${formatPrice(totalAmount)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
