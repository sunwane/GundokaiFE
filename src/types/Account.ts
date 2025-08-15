export interface Account {
  id: string;
  username: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<Account, 'password'>;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  verificationCode?: string; // Optional for registration
}

export interface ResetPasswordRequest {
  email: string;
}

export interface VerifyResetCodeRequest {
  email: string;
  code: string;
}

export interface ResetPasswordWithCodeRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export interface ResendCodeRequest {
  email: string;
}

export interface VerifyCodeResponse {
  message: string;
  isValid: boolean;
}

export interface PasswordResetResponse {
  message: string;
}