import React, { useEffect, useState } from "react";
import { OrderService } from "@/services/OrderService";
import { Order } from "@/types/Order";

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(`Fetching page ${currentPage} with size ${itemsPerPage}`);

        // Gọi API lấy lịch sử mua hàng với phân trang
        const response: any = await OrderService.getOrderHistory(
          currentPage,
          itemsPerPage
        );

        console.log("API response:", response);

        // Xử lý response
        if (response && response.result) {
          if (response.result.content) {
            setOrders(response.result.content);

            // Lấy totalPages từ response
            let pages = 1;
            if (
              typeof response.result.totalPages === "number" &&
              response.result.totalPages > 0
            ) {
              pages = response.result.totalPages;
            } else if (typeof response.result.totalElements === "number") {
              pages = Math.ceil(response.result.totalElements / itemsPerPage);
            } else if (response.result.content.length === itemsPerPage) {
              // Nếu số lượng items = itemsPerPage, có thể có thêm trang
              pages = currentPage + 2; // Ít nhất có trang tiếp theo
            } else {
              pages = currentPage + 1; // Trang hiện tại là trang cuối
            }

            console.log("Setting totalPages to:", pages);
            setTotalPages(pages);
          } else {
            setOrders(response.result);
            setTotalPages(
              Math.ceil(response.result.length / itemsPerPage) || 1
            );
          }
        } else if (Array.isArray(response)) {
          setOrders(response);
          setTotalPages(Math.ceil(response.length / itemsPerPage) || 1);
        } else {
          console.error("Unexpected API response format:", response);
          setError("Định dạng dữ liệu không hợp lệ");
        }
      } catch (err) {
        console.error("Error fetching order history:", err);
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [currentPage]); // ✅ Thêm currentPage vào dependency array

  // Xử lý khi nhấn nút "Prev"
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Xử lý khi nhấn nút "Next"
  const handleNextPage = () => {
    console.log(
      "Next button clicked, current page:",
      currentPage,
      "total pages:",
      totalPages
    );
    if (currentPage < totalPages - 1) {
      console.log("Moving to next page:", currentPage + 1);
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      console.log("Cannot move to next page, already at last page");
    }
  };

  if (loading) {
    return <p>Đang tải lịch sử mua hàng...</p>;
  }

  if (error) {
    return <p className="text-red-500">Lỗi: {error}</p>;
  }

  if (orders.length === 0) {
    return <p>Bạn chưa có đơn hàng nào.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lịch sử mua hàng</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* // OrderHistory.tsx - Thêm debug info */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                Mã đơn hàng: {order.orderId}
              </h3>
              {/* Debug info - xóa sau khi fix
              <div className="text-xs text-gray-500 mb-1">
                Status từ API: "{order.status}"
              </div>
              // OrderHistory.tsx */}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "CONFIRMED"
                    ? "bg-blue-100 text-blue-800"
                    : order.status === "PROCESSING"
                    ? "bg-purple-100 text-purple-800"
                    : order.status === "SHIPPED"
                    ? "bg-indigo-100 text-indigo-800"
                    : order.status === "DELIVERED"
                    ? "bg-green-100 text-green-800"
                    : order.status === "COMPLETED" // ✅ Thêm COMPLETED
                    ? "bg-green-200 text-green-900"
                    : order.status === "CANCELLED"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {OrderService.getStatusText(order.status)}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Ngày đặt hàng: {OrderService.formatDate(order.orderDate)}
            </p>
            <p className="text-sm text-gray-600">
              Tổng tiền: {OrderService.formatPrice(order.totalAmount)}
            </p>
            <p className="text-sm text-gray-600">
              Phương thức thanh toán:{" "}
              {OrderService.getPaymentMethodText(order.paymentMethod)}
            </p>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentPage === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Trước
        </button>
        <span className="text-sm">
          Trang {currentPage + 1} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentPage >= totalPages - 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Tiếp
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;
