import { Account, AuthResponse, LoginRequest } from '@/types/Account';

// API Base URL
const API_BASE_URL = 'http://localhost:8080';

export class AuthService {
  // Login
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('Đang gửi request đăng nhập:', credentials);
      
      const response = await fetch(`${API_BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      console.log('Status code:', response.status);
      
      const data = await response.json();
      console.log('Response data:', JSON.stringify(data, null, 2));
      
      if (!response.ok) {
        throw new Error(data.message || 'Email hoặc mật khẩu không đúng');
      }
      
      // Kiểm tra cấu trúc response chi tiết hơn
      if (!data) {
        throw new Error('Không nhận được dữ liệu từ server');
      }
      
      console.log('Cấu trúc result:', data.result);
      
      // API trả về cấu trúc {code: 1000, result: {...}}
      // Cần kiểm tra bên trong result
      if (data.result) {
        // Truy cập trực tiếp vào các thuộc tính trong result
        const accessToken = data.result.accessToken || data.result.token;
        const refreshToken = data.result.refreshToken;
        const userInfo = data.result.user || data.result.userDetails || data.result;
        
        if (accessToken) {
          // Lưu token vào localStorage
          localStorage.setItem('accessToken', accessToken);
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
          }
          
          // Xử lý thông tin người dùng
          let userData = null;
          if (userInfo) {
            // Đảm bảo user object có username
            if (typeof userInfo === 'object') {
              if (!userInfo.username && userInfo.email) {
                userInfo.username = userInfo.email.split('@')[0];
              }
              userData = userInfo;
            }
          }
          
          // Nếu không có user data, tạo một object cơ bản
          if (!userData && credentials.email) {
            userData = {
              email: credentials.email,
              username: credentials.email.split('@')[0]
            };
          }
          
          // Xóa admin_info nếu tồn tại
          localStorage.removeItem('admin_info');
          
          // Lưu user data vào localStorage - chỉ sử dụng userSession
          if (userData) {
            localStorage.setItem('userSession', JSON.stringify(userData));
          }
          
          console.log('Đăng nhập thành công, token:', accessToken);
          
          return {
            token: accessToken,
            user: userData || {},
            message: 'Đăng nhập thành công'
          };
        }
      }
      
      // Nếu không tìm thấy token theo cách trên, log response chi tiết
      console.error('Cấu trúc response đầy đủ:', data);
      throw new Error('Không tìm thấy token trong response');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Refresh token
  static async refreshToken(): Promise<string> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('Không tìm thấy refresh token');
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }), // Match backend RefreshRequest
      });
      
      if (!response.ok) {
        throw new Error('Làm mới token thất bại');
      }
      
      const data = await response.json();
      
      // Update tokens
      localStorage.setItem('accessToken', data.result.accessToken);
      localStorage.setItem('refreshToken', data.result.refreshToken);
      
      return data.result.accessToken;
    } catch (error) {
      console.error('Token refresh error:', error);
      // Clear auth on refresh failure
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userSession');
      throw error;
    }
  }

  // Logout - Cập nhật để match với LogoutRequest.java (token thay vì refreshToken)
  static async logout(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: refreshToken }), // Thay đổi key thành token
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call result
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userSession');
    }
  }

  // Get current user from storage
  static getCurrentUser(): Omit<Account, 'password'> | null {
  // Kiểm tra cả hai key (userSession và admin_info)
  const userJson = localStorage.getItem('userSession') || localStorage.getItem('admin_info');
  
  if (!userJson || userJson === 'undefined') {
    return null;
  }
  
  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error parsing user session:', error);
    localStorage.removeItem('userSession');
    localStorage.removeItem('admin_info');
    return null;
  }
}

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  // Helper to get auth headers
  static getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('accessToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // Register (redirect to UserService)
  static async register(userData: any): Promise<AuthResponse> {
    // Import inline để tránh circular dependency
    const { UserService } = await import('./UserService');
    
    // Register user
    await UserService.register(userData);
    
    // After registration, login the user
    return this.login({
      email: userData.email,
      password: userData.password
    });
  }

  // Thêm phương thức này vào cuối class AuthService
  static clearAdminInfo(): void {
    localStorage.removeItem('admin_info');
    console.log('Đã xóa admin_info khỏi localStorage');
  }
}