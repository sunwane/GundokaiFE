import { Account, AuthResponse, LoginRequest, RegisterRequest } from '@/types/Account';
import { UserService } from './UserService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface ApiResponse<T> {
  code?: number;
  message?: string;
  result?: T;
}

export interface AuthenticationResponse {
  token: string;
  authenticated: boolean;
}

export interface UserCreationRequest {
  username: string;
  password: string;
  gender: string;
  email: string;
  code: string;
}

export interface ChangePasswordRequest {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export class AuthService {
  
  /**
   * 🔐 Đăng nhập
   */
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Email hoặc mật khẩu không đúng');
      }

      const data: ApiResponse<AuthenticationResponse> = await response.json();
      
      if (!data.result?.token) {
        throw new Error('Không nhận được token từ server');
      }

      // Lấy thông tin user sau khi đăng nhập thành công
      localStorage.setItem('authToken', data.result.token);
      const userInfo = await UserService.getMyInfo();

      return {
        token: data.result.token,
        user: userInfo,
        message: 'Đăng nhập thành công'
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * 📝 Đăng ký
   */
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const userCreationRequest: UserCreationRequest = {
        username: userData.username,
        password: userData.password,
        gender: userData.gender,
        email: userData.email,
        code: userData.verificationCode || ''
      };

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCreationRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Đăng ký thất bại');
      }

      const data: ApiResponse<Omit<Account, 'password'>> = await response.json();
      
      if (!data.result) {
        throw new Error('Không nhận được thông tin người dùng sau khi đăng ký');
      }

      // Sau khi đăng ký thành công, tự động đăng nhập
      const loginResponse = await this.login({
        email: userData.email,
        password: userData.password
      });

      return {
        token: loginResponse.token,
        user: loginResponse.user,
        message: 'Đăng ký thành công'
      };
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  /**
   * 📧 Gửi mã xác thực quên mật khẩu
   */
  static async forgotPassword(data: { email: string }): Promise<{ message: string }> {
    return UserService.sendPasswordResetCode(data.email);
  }

  /**
   * 🔄 Đặt lại mật khẩu
   */
  static async resetPassword(data: { 
    email: string; 
    code: string; 
    newPassword: string 
  }): Promise<{ message: string }> {
    return UserService.resetPassword(data.email, data.code, data.newPassword);
  }

  /**
   * 🔄 Gửi lại mã xác thực
   */
  static async resendVerificationCode(data: { email: string }): Promise<{ message: string }> {
    return UserService.sendVerificationCode(data.email);
  }

  /**
   * 👤 Lấy thông tin người dùng hiện tại
   */
  static async getCurrentUser(token: string): Promise<Omit<Account, 'password'>> {
    return UserService.getMyInfo();
  }

  /**
   * 🚪 Đăng xuất
   */
  static async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        // Gọi API logout trên server
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
      }
    } catch (error) {
      console.error('Logout API error:', error);
      // Vẫn tiếp tục clear localStorage dù API lỗi
    } finally {
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userSession');
    }
  }

  /**
   * 🔐 Đổi mật khẩu
   */
  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<ChangePasswordResponse> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Vui lòng đăng nhập lại');
      }

      // ✅ SỬA: Thêm userId vào request body
      const changePasswordRequest = {
        userId: userId,
        currentPassword: currentPassword,
        newPassword: newPassword
      };

      const response = await fetch(`${API_BASE_URL}/users/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(changePasswordRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Đổi mật khẩu thất bại');
      }

      const data: ApiResponse<ChangePasswordResponse> = await response.json();
      
      if (!data.result) {
        throw new Error('Không nhận được phản hồi từ server');
      }

      return data.result;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }
}