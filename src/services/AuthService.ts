import { Account, AuthResponse, LoginRequest, RegisterRequest } from '@/types/Account';
import { UserService } from './UserService';
import { mockAccounts } from '@/data/mockAccounts';
import { CheckAPIService } from './CheckAPIService';

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
   * 🔐 Đăng nhập với fallback mock data
   */
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // Thử gọi API thật trước
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
      console.warn('API login failed, trying mock data:', error);
      
      // 🔄 Fallback: Sử dụng mock data
      return this.loginWithMockData(credentials);
    }
  }

  /**
   * 🎭 Đăng nhập với mock data
   */
  private static async loginWithMockData(credentials: LoginRequest): Promise<AuthResponse> {
    // Tìm user trong mock data
    const mockUser = mockAccounts.find(
      user => user.email === credentials.email && user.password === credentials.password
    );

    if (!mockUser) {
      throw new Error('Email hoặc mật khẩu không đúng (Mock)');
    }

    // Tạo fake token
    const fakeToken = `mock_token_${mockUser.id}_${Date.now()}`;
    
    // Lưu token và user info
    localStorage.setItem('authToken', fakeToken);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    
    const { password, ...userWithoutPassword } = mockUser;

    return {
      token: fakeToken,
      user: userWithoutPassword,
      message: 'Đăng nhập thành công (Mock Data)'
    };
  }

  /**
   * 📝 Đăng ký - CHỈ API thật
   */
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    const check_api_url = CheckAPIService.checkApiAvailability("http://localhost:8080/mainCategory");
    if (!await check_api_url) {
      alert("Chưa kết nối với API, hệ thống đang thử nghiệm, không thể đăng ký thật, vui lòng đăng nhập bằng tài khoản với tên đăng nhập 'admin' và mật khẩu 'admin' để xem giao diện");
      throw new Error('Không thể đăng ký khi hệ thống đang thử nghiệm');
    }
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
      console.error('Register API failed:', error);
      alert("Chưa kết nối với hệ thống, hiện không thể đăng ký thật, vui lòng đăng nhập bằng tài khoản với tên đăng nhập 'admin' và mật khẩu 'admin' để xem giao diện");
      throw new Error('Không thể đăng ký khi hệ thống đang thử nghiệm');
    }
  }

  /**
   * 👤 Lấy thông tin người dùng hiện tại với fallback mock
   */
  static async getCurrentUser(token: string): Promise<Omit<Account, 'password'>> {
    try {
      // Thử API thật trước
      return await UserService.getMyInfo();
    } catch (error) {
      console.warn('API getCurrentUser failed, using mock data:', error);
      
      // 🔄 Fallback: Lấy từ localStorage mock
      const mockUserStr = localStorage.getItem('mockUser');
      if (!mockUserStr) {
        throw new Error('Không tìm thấy thông tin người dùng');
      }

      const mockUser: Account = JSON.parse(mockUserStr);
      const { password, ...userWithoutPassword } = mockUser;
      
      return userWithoutPassword;
    }
  }

  /**
   * 📧 Gửi mã xác thực quên mật khẩu - CHỈ API thật
   */
  static async forgotPassword(data: { email: string }): Promise<{ message: string }> {
    try {
      return await UserService.sendPasswordResetCode(data.email);
    } catch (error) {
      console.error('ForgotPassword API failed:', error);
      throw new Error('Không thể gửi mã xác thực khi hệ thống đang thử nghiệm');
    }
  }

  /**
   * 🔄 Đặt lại mật khẩu - CHỈ API thật
   */
  static async resetPassword(data: { 
    email: string; 
    code: string; 
    newPassword: string 
  }): Promise<{ message: string }> {
    try {
      return await UserService.resetPassword(data.email, data.code, data.newPassword);
    } catch (error) {
      console.error('ResetPassword API failed:', error);
      alert("Chưa kết nối với hệ thống, hiện không thể thay đổi mật khẩu thật");
      throw new Error('Không thể đặt lại mật khẩu khi hệ thống đang thử nghiệm');
    }
  }

  /**
   * 🔄 Gửi lại mã xác thực - CHỈ API thật
   */
  static async resendVerificationCode(data: { email: string }): Promise<{ message: string }> {
    try {
      return await UserService.sendVerificationCode(data.email);
    } catch (error) {
      console.error('ResendVerificationCode API failed:', error);
      throw new Error('Không thể gửi lại mã xác thực khi hệ thống đang thử nghiệm');
    }
  }

  /**
   * 🚪 Đăng xuất
   */
  static async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('authToken');
      
      // Chỉ gọi API logout nếu không phải mock token
      if (token && !token.startsWith('mock_token_')) {
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
      localStorage.removeItem('mockUser');
    }
  }

  /**
   * 🔐 Đổi mật khẩu - CHỈ API thật
   */
  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<ChangePasswordResponse> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Vui lòng đăng nhập lại');
      }

      // Nếu là mock token, không cho phép đổi mật khẩu
      if (token.startsWith('mock_token_')) {
        alert("Chưa kết nối với hệ thống, hiện không thể thay đổi mật khẩu thật");
        throw new Error('Không thể đổi mật khẩu với tài khoản thử nghiệm');
      }

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
      console.error('ChangePassword API failed:', error);
      
      // Chỉ hiển thị alert nếu không phải lỗi validation
      if (error instanceof Error && !error.message.includes('Không thể đổi mật khẩu với tài khoản thử nghiệm')) {
        alert("Kết nối có vấn đề, hiện không thể thay đổi mật khẩu thật");
      }
      
      throw error;
    }
  }
}