import { AuthService } from './AuthService';

// API Base URL (same as AuthService)
const API_BASE_URL = 'http://localhost:8080';

// Cập nhật interface này để khớp với backend UserCreationRequest.java
export interface UserCreationRequest {
  username: string; // Đổi từ name thành username để khớp với backend
  email: string;
  password: string;
  gender: string;
  code: string; // Mã xác thực
}

export interface UserUpdateRequest {
  username?: string;
  gender?: string;
  // Các field khác nếu cần
}

export class UserService {
  // Helper method for API calls with auth
  private static async fetchWithAuth(url: string, options: RequestInit = {}): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      ...AuthService.getAuthHeaders(),
      ...options.headers
    };

    try {
      let response = await fetch(url, { ...options, headers });
      
      // Handle 401 with token refresh
      if (response.status === 401) {
        try {
          await AuthService.refreshToken();
          // Retry with new token
          const newHeaders = {
            ...headers,
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          };
          response = await fetch(url, { ...options, headers: newHeaders });
        } catch (refreshError) {
          // If refresh fails, throw auth error
          throw new Error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
        }
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Yêu cầu thất bại');
      }
      
      return data;
    } catch (error) {
      console.error(`API error for ${url}:`, error);
      throw error;
    }
  }

  // Register user - Cập nhật để match với backend
  static async register(request: UserCreationRequest): Promise<any> {
    console.log('Sending registration request:', JSON.stringify(request, null, 2));
    
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      
      console.log('Registration response status:', response.status);
      
      // Always try to parse the response body, even if !response.ok
      const data = await response.json().catch(err => {
        console.error('Failed to parse response as JSON:', err);
        return { message: 'Lỗi định dạng phản hồi từ server' };
      });
      
      console.log('Registration response data:', data);
      
      if (!response.ok) {
        throw new Error(data.message || `Đăng ký thất bại (${response.status})`);
      }
      
      return data.result || data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Send verification code
  static async sendVerificationCode(email: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/users/send-code?email=${encodeURIComponent(email)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gửi mã xác thực thất bại');
    }
    
    const data = await response.json();
    return data;
  }

  // Request password reset
  static async requestPasswordReset(email: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/users/request-password-reset?email=${encodeURIComponent(email)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Yêu cầu đặt lại mật khẩu thất bại');
    }
    
    const data = await response.json();
    return data;
  }

  // Reset password - Cập nhật để match với ResetPasswordRequest.java
  static async resetPassword(resetData: { email: string, code: string, newPassword: string }): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/users/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Đặt lại mật khẩu thất bại');
    }
    
    const data = await response.json();
    return data;
  }

  // Get user profile
  static async getMyProfile(): Promise<any> {
    return this.fetchWithAuth(`${API_BASE_URL}/users/my-info`);
  }

  // Update user profile
  static async updateProfile(updateRequest: UserUpdateRequest): Promise<any> {
      return this.fetchWithAuth(`${API_BASE_URL}/users/my-profile`, {
        method: 'PUT',
        body: JSON.stringify(updateRequest)
      });
  }

  // Search users by email
  static async searchByEmail(keyword: string): Promise<any> {
    return this.fetchWithAuth(`${API_BASE_URL}/users/search?keyword=${encodeURIComponent(keyword)}`);
  }

  // Get user count
  static async getUserCount(): Promise<number> {
    const response = await this.fetchWithAuth(`${API_BASE_URL}/users/count`);
    return response.result;
  }
}