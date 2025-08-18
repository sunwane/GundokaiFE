import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/AuthService';
import { LoginRequest, RegisterRequest } from '@/types/Account';
import { UserService } from '@/services/UserService';

export type AuthMode = 'login' | 'register';

export interface UseAuthReturn {
  // State
  authMode: AuthMode;
  isLoading: boolean;
  error: string;
  showPassword: boolean;
  loginData: LoginRequest;
  registerData: RegisterRequest;
  
  // Actions
  setAuthMode: (mode: AuthMode) => void;
  setShowPassword: (show: boolean) => void;
  handleLoginInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegisterInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleRegister: (e: React.FormEvent) => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const router = useRouter();
  
  // State
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loginData, setLoginData] = useState<LoginRequest>({
    email: '',
    password: ''
  });

  // Cập nhật để match với UserCreationRequest.java
  const [registerData, setRegisterData] = useState<RegisterRequest>({
    username: '',
    email: '',
    password: '',
    gender: 'MALE', // Sử dụng giá trị phù hợp với backend
    code: '' // Đổi từ verificationCode thành code
  });

  // Handlers
  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await AuthService.login(loginData);
      console.log('Đăng nhập thành công, chuyển hướng đến trang chủ');
      git 
      // Thay đổi từ '/account' thành '/' (trang chủ)
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await AuthService.register(registerData);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng ký thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError('');

  return {
    // State
    authMode,
    isLoading,
    error,
    showPassword,
    loginData,
    registerData,
    
    // Actions
    setAuthMode,
    setShowPassword,
    handleLoginInputChange,
    handleRegisterInputChange,
    handleLogin,
    handleRegister,
    clearError,
  };
};