"use client";
export const dynamic = "force-dynamic";

import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");

    console.log("Payment result:", { status, orderId, amount });

    // ✅ Clear cart ngay lập tức nếu thanh toán thành công
    if (status === "success") {
      localStorage.removeItem("gundam_cart");

      // Trigger cart update event
      const event = new CustomEvent("cartUpdated");
      window.dispatchEvent(event);

      console.log("Payment successful, cart cleared");
    }

    // ✅ Auto redirect về trang chủ ngay lập tức
    setTimeout(() => {
      window.location.href = "http://localhost:3000/";
    }, 100); // Delay 100ms để đảm bảo localStorage được clear
  }, [searchParams]);

  // ✅ Hiển thị loading trong khi redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Đang xử lý kết quả thanh toán...</p>
        <p className="text-sm text-gray-500 mt-2">
          Bạn sẽ được chuyển về trang chủ ngay lập tức
        </p>
      </div>
    </div>
  );
}

const PaymentSuccessPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;
