import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/AuthService';
import { LoginRequest, RegisterRequest } from '@/types/Account';

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

  const [registerData, setRegisterData] = useState<RegisterRequest>({
    username: '',
    email: '',
    password: '',
    gender: 'Nam',
    verificationCode: ''
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
      const response = await AuthService.login(loginData);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userSession', JSON.stringify(response.user));
      router.push('/account');
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
      const response = await AuthService.register(registerData);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userSession', JSON.stringify(response.user));
      router.push('/account');
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