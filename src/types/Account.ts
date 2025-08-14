export interface Account {
  id: string;
  username: string;
  password: string;
  gender: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<Account, 'password'>;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  gender: string;
  verificationCode: string;
}

export interface ResetPasswordRequest {
  email: string;
}