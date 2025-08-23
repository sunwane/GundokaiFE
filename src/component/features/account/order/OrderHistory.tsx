import React, { useEffect, useState } from "react";
import { OrderService } from "@/services/OrderService";
import { Order } from "@/types/Order";

// ✅ Define sort options
type SortField = "orderDate" | "paymentMethod" | "status" | "totalAmount";
type SortDirection = "asc" | "desc";

interface SortOption {
  field: SortField;
  direction: SortDirection;
  label: string;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentSort, setCurrentSort] = useState<SortOption>({
    field: "orderDate",
    direction: "desc",
    label: "Thời gian mới nhất",
  });

  const itemsPerPage = 10;

  // ✅ Sort options
  const sortOptions: SortOption[] = [
    { field: "orderDate", direction: "desc", label: "Thời gian mới nhất" },
    { field: "orderDate", direction: "asc", label: "Thời gian cũ nhất" },
    { field: "paymentMethod", direction: "asc", label: "VNPay trước" },
    { field: "paymentMethod", direction: "desc", label: "COD trước" },
    { field: "totalAmount", direction: "desc", label: "Giá cao nhất" },
    { field: "totalAmount", direction: "asc", label: "Giá thấp nhất" },
    { field: "status", direction: "asc", label: "Trạng thái A-Z" },
    { field: "status", direction: "desc", label: "Trạng thái Z-A" },
  ];

  // ✅ Sort function
  const sortOrders = (
    ordersToSort: Order[],
    sortOption: SortOption
  ): Order[] => {
    return [...ordersToSort].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortOption.field) {
        case "orderDate":
          aValue = new Date(a.orderDate).getTime();
          bValue = new Date(b.orderDate).getTime();
          break;
        case "paymentMethod":
          aValue = a.paymentMethod;
          bValue = b.paymentMethod;
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        case "totalAmount":
          aValue = a.totalAmount;
          bValue = b.totalAmount;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortOption.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOption.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  // ✅ Handle sort change - IMPLEMENT ĐÚng
  const handleSortChange = (sortOption: SortOption) => {
    console.log("Changing sort to:", sortOption.label);
    setCurrentSort(sortOption);
    setCurrentPage(0); // Reset to first page when sorting
  };

  // ✅ Fetch and sort orders
  const fetchOrderHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching order history...");
      const response = await OrderService.getOrderHistory(
        currentPage,
        itemsPerPage
      );

      console.log("Order history response:", response);

      let fetchedOrders: Order[] = [];

      if (response && response.result) {
        if (Array.isArray(response.result)) {
          fetchedOrders = response.result;
        } else if (response.result.content) {
          fetchedOrders = response.result.content;
          setTotalPages(response.result.totalPages || 1);
        }
      } else if (Array.isArray(response)) {
        fetchedOrders = response;
      }

      // ✅ Apply sorting
      const sortedOrders = sortOrders(fetchedOrders, currentSort);
      setOrders(sortedOrders);

      console.log(
        `Found ${sortedOrders.length} orders, sorted by ${currentSort.label}`
      );
    } catch (err) {
      console.error("Error fetching order history:", err);
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, [currentPage, currentSort]); // ✅ Re-fetch when sort changes

  // ✅ Handle pagination
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ❌ XÓA FUNCTION NÀY NẾU CÓ:
  // function handleSortChange(arg0: SortOption): void {
  //   throw new Error("Function not implemented.");
  // }

  if (loading) {
    return <p>Đang tải lịch sử mua hàng...</p>;
  }

  if (error) {
    return <p className="text-red-500">Lỗi: {error}</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold mb-2">Chưa có đơn hàng nào</h3>
        <p className="text-gray-600">
          Bạn chưa có đơn hàng nào. Hãy mua sắm ngay!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Lịch sử mua hàng ({orders.length} đơn hàng)
        </h2>

        {/* ✅ Sort dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sắp xếp:</span>
          <select
            value={sortOptions.findIndex(
              (option) =>
                option.field === currentSort.field &&
                option.direction === currentSort.direction
            )}
            onChange={(e) =>
              handleSortChange(sortOptions[parseInt(e.target.value)])
            }
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((option, index) => (
              <option key={index} value={index}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="font-semibold text-lg text-gray-800">
                    Mã đơn hàng: {order.orderId}
                  </h3>

                  {/* ✅ Payment method badge - màu nhẹ hơn */}
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      order.paymentMethod === "VNPAY"
                        ? "bg-gray-100 text-gray-700 border"
                        : "bg-gray-50 text-gray-600 border"
                    }`}
                  >
                    {OrderService.getPaymentMethodText(order.paymentMethod)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="mb-1">
                      Ngày đặt hàng: {OrderService.formatDate(order.orderDate)}
                    </p>
                    <p>
                      Tổng tiền:{" "}
                      <span className="font-semibold text-gray-900">
                        {OrderService.formatPrice(order.totalAmount)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      Phương thức:{" "}
                      {OrderService.getPaymentMethodText(order.paymentMethod)}
                    </p>
                    <p>
                      Thanh toán:{" "}
                      <span
                        className={`ml-1 px-2 py-1 rounded text-xs font-medium ${
                          order.paymentStatus === "PENDING"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : order.paymentStatus === "CONFIRMED" ||
                              order.paymentStatus === "PAID"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : order.paymentStatus === "FAILED"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-gray-50 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {OrderService.getPaymentStatusText(order.paymentStatus)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* ✅ Order status badge - màu nhẹ hơn */}
              <span
                className={`px-3 py-1 rounded text-sm font-medium border ${
                  order.status === "PENDING"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : order.status === "CONFIRMED"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : order.status === "PROCESSING"
                    ? "bg-violet-50 text-violet-700 border-violet-200"
                    : order.status === "SHIPPED"
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                    : order.status === "DELIVERED"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : order.status === "COMPLETED"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : order.status === "CANCELLED"
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : "bg-gray-50 text-gray-600 border-gray-200"
                }`}
              >
                {OrderService.getStatusText(order.status)}
              </span>
            </div>

            {/*  Order details - nếu có */}
            {order.orderDetails && order.orderDetails.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                {/* <p className="text-sm font-medium text-gray-700 mb-2">
                  Sản phẩm:
                </p> */}
                <div className="space-y-1">
                  {/* {order.orderDetails.slice(0, 2).map((detail, index) => (
                    // <p key={index} className="text-sm text-gray-600">
                    //   • {detail.productName || "Sản phẩm"} × {detail.quantity}
                    // </p>
                  ))} */}
                  {order.orderDetails.length > 2 && (
                    <p className="text-sm text-gray-500">
                      ... và {order.orderDetails.length - 2} sản phẩm khác
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
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

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Trang {currentPage + 1} / {totalPages}
            </span>
            <span className="text-xs text-gray-500">
              (Sắp xếp: {currentSort.label})
            </span>
          </div>

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
      )}
    </div>
  );
};

export default OrderHistory;
