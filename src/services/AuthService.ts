import { Account, AuthResponse, LoginRequest, RegisterRequest, ResetPasswordRequest } from '@/types/Account';
import { mockAccounts } from '@/data/mockAccounts';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Mock storage cho verification codes
const mockVerificationCodes = new Map<string, { code: string; expiry: number; email: string }>();

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

  // ✅ Forgot Password - Gửi mã xác thực
  static async forgotPassword(data: { email: string }): Promise<{ message: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const user = mockAccounts.find(account => 
        account.email === data.email || account.username === data.email
      );
      
      if (!user) {
        throw new Error('Email hoặc tên đăng nhập không tồn tại trong hệ thống');
      }

      // Generate 6-digit verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store code with 10 minutes expiry
      const expiry = Date.now() + (10 * 60 * 1000); // 10 minutes
      mockVerificationCodes.set(user.email, {
        code: verificationCode,
        expiry,
        email: user.email
      });

      // Mock sending email (in real app, this would trigger email service)
      console.log(`[MOCK EMAIL] Verification code for ${user.email}: ${verificationCode}`);

      return {
        message: `Mã xác thực đã được gửi đến email ${user.email}. Mã có hiệu lực trong 10 phút.`
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  // ✅ Verify Reset Code - Xác thực mã
  static async verifyResetCode(data: { email: string; code: string }): Promise<{ message: string; isValid: boolean }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const user = mockAccounts.find(account => 
        account.email === data.email || account.username === data.email
      );
      
      if (!user) {
        throw new Error('Email hoặc tên đăng nhập không tồn tại');
      }

      const storedCodeData = mockVerificationCodes.get(user.email);
      
      if (!storedCodeData) {
        throw new Error('Không tìm thấy mã xác thực. Vui lòng yêu cầu gửi mã mới.');
      }

      if (Date.now() > storedCodeData.expiry) {
        mockVerificationCodes.delete(user.email);
        throw new Error('Mã xác thực đã hết hạn. Vui lòng yêu cầu gửi mã mới.');
      }

      if (storedCodeData.code !== data.code) {
        throw new Error('Mã xác thực không đúng. Vui lòng kiểm tra lại.');
      }

      return {
        message: 'Mã xác thực hợp lệ. Bạn có thể đặt lại mật khẩu.',
        isValid: true
      };
    } catch (error) {
      console.error('Verify reset code error:', error);
      throw error;
    }
  }

  // ✅ Reset Password - Đặt lại mật khẩu
  static async resetPassword(data: { 
    email: string; 
    code: string; 
    newPassword: string 
  }): Promise<{ message: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const user = mockAccounts.find(account => 
        account.email === data.email || account.username === data.email
      );
      
      if (!user) {
        throw new Error('Email hoặc tên đăng nhập không tồn tại');
      }

      const storedCodeData = mockVerificationCodes.get(user.email);
      
      if (!storedCodeData) {
        throw new Error('Không tìm thấy mã xác thực. Vui lòng yêu cầu gửi mã mới.');
      }

      if (Date.now() > storedCodeData.expiry) {
        mockVerificationCodes.delete(user.email);
        throw new Error('Mã xác thực đã hết hạn. Vui lòng yêu cầu gửi mã mới.');
      }

      if (storedCodeData.code !== data.code) {
        throw new Error('Mã xác thực không đúng. Vui lòng kiểm tra lại.');
      }

      // Validate new password
      if (data.newPassword.length < 6) {
        throw new Error('Mật khẩu mới phải có ít nhất 6 ký tự');
      }

      // Update password
      const userIndex = mockAccounts.findIndex(account => account.id === user.id);
      if (userIndex !== -1) {
        mockAccounts[userIndex].password = data.newPassword;
      }

      // Remove used verification code
      mockVerificationCodes.delete(user.email);

      return {
        message: 'Đặt lại mật khẩu thành công! Bạn có thể đăng nhập bằng mật khẩu mới.'
      };
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  // ✅ Change Password - Đổi mật khẩu (khi đã đăng nhập)
  static async changePassword(data: { 
    userId: string;
    currentPassword: string; 
    newPassword: string 
  }): Promise<{ message: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const user = mockAccounts.find(account => account.id === data.userId);
      
      if (!user) {
        throw new Error('Người dùng không tồn tại');
      }

      // Verify current password
      if (user.password !== data.currentPassword) {
        throw new Error('Mật khẩu hiện tại không đúng');
      }

      // Validate new password
      if (data.newPassword.length < 6) {
        throw new Error('Mật khẩu mới phải có ít nhất 6 ký tự');
      }

      if (data.currentPassword === data.newPassword) {
        throw new Error('Mật khẩu mới phải khác mật khẩu hiện tại');
      }

      // Update password
      const userIndex = mockAccounts.findIndex(account => account.id === data.userId);
      if (userIndex !== -1) {
        mockAccounts[userIndex].password = data.newPassword;
      }

      return {
        message: 'Đổi mật khẩu thành công!'
      };
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  // ✅ Resend Verification Code - Gửi lại mã xác thực
  static async resendVerificationCode(data: { email: string }): Promise<{ message: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const user = mockAccounts.find(account => 
        account.email === data.email || account.username === data.email
      );
      
      if (!user) {
        throw new Error('Email hoặc tên đăng nhập không tồn tại trong hệ thống');
      }

      // Check if too many requests (rate limiting)
      const existingCode = mockVerificationCodes.get(user.email);
      if (existingCode && (existingCode.expiry - Date.now()) > (8 * 60 * 1000)) {
        throw new Error('Vui lòng đợi ít nhất 2 phút trước khi yêu cầu gửi mã mới');
      }

      // Generate new verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store code with 10 minutes expiry
      const expiry = Date.now() + (10 * 60 * 1000);
      mockVerificationCodes.set(user.email, {
        code: verificationCode,
        expiry,
        email: user.email
      });

      console.log(`[MOCK EMAIL] New verification code for ${user.email}: ${verificationCode}`);

      return {
        message: `Mã xác thực mới đã được gửi đến email ${user.email}`
      };
    } catch (error) {
      console.error('Resend verification code error:', error);
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

      // Validate email uniqueness if updating email
      if (updates.email && updates.email !== mockAccounts[userIndex].email) {
        const existingUser = mockAccounts.find(account => 
          account.email === updates.email && account.id !== userId
        );
        if (existingUser) {
          throw new Error('Email đã được sử dụng bởi tài khoản khác');
        }
      }

      // Validate username uniqueness if updating username
      if (updates.username && updates.username !== mockAccounts[userIndex].username) {
        const existingUser = mockAccounts.find(account => 
          account.username === updates.username && account.id !== userId
        );
        if (existingUser) {
          throw new Error('Tên đăng nhập đã được sử dụng bởi tài khoản khác');
        }
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

  // ✅ Helper method để debug verification codes (chỉ cho development)
  static getVerificationCodes(): Map<string, { code: string; expiry: number; email: string }> {
    if (process.env.NODE_ENV === 'development') {
      return mockVerificationCodes;
    }
    throw new Error('Method chỉ available trong development mode');
  }
}