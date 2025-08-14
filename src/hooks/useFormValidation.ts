import { useState, useEffect } from 'react';
import { LoginRequest, RegisterRequest } from '@/types/Account';

interface ValidationErrors {
  email?: string;
  password?: string;
  username?: string;
  gender?: string;
}

interface UseFormValidationReturn {
  errors: ValidationErrors;
  isValid: boolean;
  validateLogin: (data: LoginRequest) => boolean;
  validateRegister: (data: RegisterRequest) => boolean;
  clearErrors: () => void;
}

export const useFormValidation = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email là bắt buộc';
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Mật khẩu là bắt buộc';
    return undefined;
  };

  const validateUsername = (username: string): string | undefined => {
    if (!username) return 'Tên đăng nhập là bắt buộc';
    if (username.length < 3) return 'Tên đăng nhập phải có ít nhất 3 ký tự';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới';
    }
    return undefined;
  };

  const validateLogin = (data: LoginRequest): boolean => {
    const newErrors: ValidationErrors = {};
    
    const emailError = validateEmail(data.email);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validatePassword(data.password);
    if (passwordError) newErrors.password = passwordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = (data: RegisterRequest): boolean => {
    const newErrors: ValidationErrors = {};
    
    const emailError = validateEmail(data.email);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validatePassword(data.password);
    if (passwordError) newErrors.password = passwordError;
    
    const usernameError = validateUsername(data.username);
    if (usernameError) newErrors.username = usernameError;
    
    if (!data.gender) newErrors.gender = 'Giới tính là bắt buộc';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => setErrors({});

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValid,
    validateLogin,
    validateRegister,
    clearErrors,
  };
};