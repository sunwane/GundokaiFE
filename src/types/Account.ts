export interface Account {
  id: string;
  username: string; // Đảm bảo sử dụng username thay vì name
  email: string;
  password?: string;
  gender: string;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string; // Cập nhật từ name sang username
  email: string;
  password: string;
  gender: string;
  code: string; // Cập nhật từ verificationCode sang code
}

export interface AuthResponse {
  token: string;
  user: Omit<Account, 'password'>;
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordWithCodeRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface UserUpdateRequest {
  username?: string;
  gender?: string;
  // Các trường khác nếu cần

  
}