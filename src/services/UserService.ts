import { Account } from '@/types/Account';
import { CheckAPIService } from './CheckAPIService';
import { mockAccounts } from '@/data/mockAccounts';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const check_api_url = CheckAPIService.checkApiAvailability("http://localhost:8080/mainCategory");

export interface UserResponse {
  result?: Omit<Account, 'password'>;
  message?: string;
}

export interface ApiResponse<T> {
  code?: number;
  message?: string;
  result?: T;
}

export class UserService {
  
  /**
   * 📧 Gửi mã xác thực khi đăng ký
   */
  static async sendVerificationCode(email: string): Promise<{ message: string }> {
    const apiAvailable = await check_api_url;
    if (!apiAvailable) {
      return { message: 'Hệ thống đang gặp vấn đề, không thể gửi mã xác thực' };
    }
    try {
      const response = await fetch(`${API_BASE_URL}/users/send-code?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Có lỗi xảy ra khi gửi mã xác thực');
      }

      const data: ApiResponse<string> = await response.json();
      return {
        message: data.message || 'Mã xác thực đã được gửi đến email của bạn'
      };
    } catch (error) {
      console.error('Send verification code error:', error);
      throw error;
    }
  }

  /**
   * 📧 Gửi mã xác thực khi quên mật khẩu  
   */
  static async sendPasswordResetCode(email: string): Promise<{ message: string }> {
    const apiAvailable = await check_api_url;
    if (!apiAvailable) {
      return { message: 'Hệ thống đang gặp vấn đề, không thể gửi mã đặt lại mật khẩu' };
    }
    try {
      const response = await fetch(`${API_BASE_URL}/users/request-password-reset?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Có lỗi xảy ra khi gửi mã đặt lại mật khẩu');
      }

      const data: ApiResponse<string> = await response.json();
      return {
        message: data.message || 'Mã đặt lại mật khẩu đã được gửi đến email của bạn'
      };
    } catch (error) {
      console.error('Send password reset code error:', error);
      throw error;
    }
  }

  /**
   * 🔄 Đặt lại mật khẩu
   */
  static async resetPassword(email: string, code: string, newPassword: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code,
          newPassword
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Có lỗi xảy ra khi đặt lại mật khẩu');
      }

      const data: ApiResponse<void> = await response.json();
      return {
        message: data.message || 'Đặt lại mật khẩu thành công'
      };
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  /**
   * 👤 Lấy thông tin người dùng hiện tại
   */
  static async getMyInfo(): Promise<Omit<Account, 'password'>> {
    const apiAvailable = await check_api_url;
    if (!apiAvailable) {
      return mockAccounts[4];
    }
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Không tìm thấy token xác thực');
      }

      const response = await fetch(`${API_BASE_URL}/users/my-info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Có lỗi xảy ra khi lấy thông tin người dùng');
      }

      const data: ApiResponse<Omit<Account, 'password'>> = await response.json();
      if (!data.result) {
        throw new Error('Không nhận được thông tin người dùng');
      }

      return data.result;
    } catch (error) {
      console.error('Get my info error:', error);
      throw error;
    }
  }

  /**
   * ✏️ Cập nhật thông tin người dùng
   */
  static async updateMyProfile(updates: { username: string }): Promise<Omit<Account, 'password'>> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Không tìm thấy token xác thực');
      }

      const response = await fetch(`${API_BASE_URL}/users/my-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Có lỗi xảy ra khi cập nhật thông tin');
      }

      const data: ApiResponse<Omit<Account, 'password'>> = await response.json();
      if (!data.result) {
        throw new Error('Không nhận được thông tin người dùng đã cập nhật');
      }

      return data.result;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
}