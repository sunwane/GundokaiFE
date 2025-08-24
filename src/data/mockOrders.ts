// import { Order, OrderDetail } from '@/types/Order';

// export const mockOrders: Order[] = [
//   {
//     order_id: "ORD001",
//     account_id: "user005",
//     order_date: '2024-08-01T09:15:00Z',
//     total_amount: 1480000,
//     status: 'delivered',
//     phoneNumber: '0901234567',
//     address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
//     customer_Name: 'Nguyễn Văn An'
//   },
//   {
//     order_id: "ORD002",
//     account_id: "user005",
//     order_date: '2024-08-05T14:30:00Z',
//     total_amount: 2450000,
//     status: 'delivered',
//     phoneNumber: '0901234567',
//     address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
//     customer_Name: 'Nguyễn Văn An'
//   },
//   {
//     order_id: "ORD003",
//     account_id: "user005",
//     order_date: '2024-08-10T11:20:00Z',
//     total_amount: 1570000,
//     status: 'shipping',
//     phoneNumber: '0901234567',
//     address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
//     customer_Name: 'Nguyễn Văn An'
//   },
//   {
//     order_id: "ORD004",
//     account_id: "user005",
//     order_date: '2024-08-14T16:45:00Z',
//     total_amount: 1030000,
//     status: 'shipping',
//     phoneNumber: '0901234567',
//     address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
//     customer_Name: 'Nguyễn Văn An'
//   },
//   {
//     order_id: "ORD005",
//     account_id: "user005",
//     order_date: '2024-08-16T10:00:00Z',
//     total_amount: 3950000,
//     status: 'pending',
//     phoneNumber: '0901234567',
//     address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
//     customer_Name: 'Nguyễn Văn An'
//   },
//   {
//     order_id: "ORD006",
//     account_id: "user005",
//     order_date: '2024-08-17T13:30:00Z',
//     total_amount: 890000,
//     status: 'pending',
//     phoneNumber: '0901234567',
//     address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
//     customer_Name: 'Nguyễn Văn An'
//   }
// ];

// export const mockOrderDetails: OrderDetail[] = [
//   // ORD001 - MG Sazabi Ver.Ka + Action Base
//   { id: "OD001", order_id: "ORD001", product_id: "PRD017", quantity: 1, price: 1480000 },
  
//   // ORD002 - RG Nu Gundam + RG Strike Freedom + HG RX-78-2
//   { id: "OD002", order_id: "ORD002", product_id: "PRD009", quantity: 1, price: 750000 },
//   { id: "OD003", order_id: "ORD002", product_id: "PRD011", quantity: 1, price: 720000 },
//   { id: "OD004", order_id: "ORD002", product_id: "PRD020", quantity: 3, price: 320000 },
  
//   // ORD003 - MG Strike Freedom + RG Sazabi
//   { id: "OD005", order_id: "ORD003", product_id: "PRD002", quantity: 1, price: 1200000 },
//   { id: "OD006", order_id: "ORD003", product_id: "PRD012", quantity: 1, price: 850000 },
  
//   // ORD004 - HG Strike Freedom + HG Unicorn + Action Base
//   { id: "OD007", order_id: "ORD004", product_id: "PRD021", quantity: 1, price: 420000 },
//   { id: "OD008", order_id: "ORD004", product_id: "PRD022", quantity: 1, price: 380000 },
//   { id: "OD009", order_id: "ORD004", product_id: "PRD003", quantity: 1, price: 180000 },
//   { id: "OD010", order_id: "ORD004", product_id: "PRD010", quantity: 1, price: 150000 },
  
//   // ORD005 - PG Strike Freedom + MG Barbatos Lupus Rex
//   { id: "OD011", order_id: "ORD005", product_id: "PRD026", quantity: 1, price: 4200000 },
//   { id: "OD012", order_id: "ORD005", product_id: "PRD016", quantity: 1, price: 1150000 },
  
//   // ORD006 - Tanjiro Figure
//   { id: "OD013", order_id: "ORD006", product_id: "PRD007", quantity: 1, price: 890000 }
// ];

// // Helper function để lấy orders của một user cụ thể
// export const getOrdersByUserId = (userId: string): Order[] => {
//   return mockOrders.filter(order => order.account_id === userId);
// };

// // Helper function để lấy order details của một order
// export const getOrderDetailsByOrderId = (orderId: string): OrderDetail[] => {
//   return mockOrderDetails.filter(detail => detail.order_id === orderId);
// };

// // Helper function để tính tổng số đơn hàng theo status
// export const getOrderStatsByUserId = (userId: string) => {
//   const userOrders = getOrdersByUserId(userId);
  
//   return {
//     total: userOrders.length,
//     pending: userOrders.filter(order => order.status === 'pending').length,
//     shipping: userOrders.filter(order => order.status === 'shipping').length,
//     delivered: userOrders.filter(order => order.status === 'delivered').length,
//     cancelled: userOrders.filter(order => order.status === 'cancelled').length
//   };
// };