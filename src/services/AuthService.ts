import { Account, AuthResponse, LoginRequest, RegisterRequest, ResetPasswordRequest } from '@/types/Account';
import { mockAccounts } from '@/data/mockAccounts';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export class AuthService {
  
  // Login
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const user = mockAccounts.find(account => 
        account.email === credentials.email && account.password === credentials.password
      );

      if (!user) {
        throw new Error('Email hoặc mật khẩu không đúng');
      }

      const { password, ...userWithoutPassword } = user;
      
      return {
        token: `mock_token_${user.id}_${Date.now()}`,
        user: userWithoutPassword,
        message: 'Đăng nhập thành công'
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Register
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    try {
      const existingUser = mockAccounts.find(account => account.email === userData.email);
      if (existingUser) {
        throw new Error('Email đã được sử dụng');
      }

      const existingUsername = mockAccounts.find(account => account.username === userData.username);
      if (existingUsername) {
        throw new Error('Tên đăng nhập đã được sử dụng');
      }

      const newUser: Account = {
        id: `user${Date.now()}`,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        gender: userData.gender
      };

      mockAccounts.push(newUser);

      const { password, ...userWithoutPassword } = newUser;
      
      return {
        token: `mock_token_${newUser.id}_${Date.now()}`,
        user: userWithoutPassword,
        message: 'Đăng ký thành công'
      };
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  // Forgot Password
  static async forgotPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const user = mockAccounts.find(account => account.email === data.email);
      if (!user) {
        throw new Error('Email không tồn tại trong hệ thống');
      }

      return {
        message: 'Link đặt lại mật khẩu đã được gửi về email của bạn'
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  // Get current user
  static async getCurrentUser(token: string): Promise<Omit<Account, 'password'>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const userIdMatch = token.match(/mock_token_(.+)_\d+/);
      if (!userIdMatch) {
        throw new Error('Token không hợp lệ');
      }

      const userId = userIdMatch[1];
      const user = mockAccounts.find(account => account.id === userId);
      
      if (!user) {
        throw new Error('Người dùng không tồn tại');
      }

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  // Logout
  static async logout(): Promise<void> {
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userSession');
  }

  // Update profile
  static async updateProfile(userId: string, updates: Partial<Account>): Promise<Omit<Account, 'password'>> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const userIndex = mockAccounts.findIndex(account => account.id === userId);
      if (userIndex === -1) {
        throw new Error('Người dùng không tồn tại');
      }

      mockAccounts[userIndex] = {
        ...mockAccounts[userIndex],
        ...updates
      };

      const { password, ...userWithoutPassword } = mockAccounts[userIndex];
      return userWithoutPassword;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
}