import { useState } from 'react';
import { ForgotPasswordFormState } from './useForgotPasswordForm';

export interface ValidationErrors {
  email?: string;
  verificationCode?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const useForgotPasswordValidation = () => {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return 'Vui lòng nhập email';
    }
    return undefined;
  };

  const validateForm = (formData: ForgotPasswordFormState): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Vui lòng nhập email';
    }
    
    if (!formData.verificationCode.trim()) {
      errors.verificationCode = 'Vui lòng nhập mã xác thực';
    }
    
    if (formData.newPassword.length < 6) {
      errors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    return errors;
  };

  const clearFieldError = (field: keyof ValidationErrors) => {
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const clearAllErrors = () => {
    setValidationErrors({});
  };

  const setFieldError = (field: keyof ValidationErrors, error: string) => {
    setValidationErrors(prev => ({ ...prev, [field]: error }));
  };

  return {
    validationErrors,
    validateEmail,
    validateForm,
    clearFieldError,
    clearAllErrors,
    setFieldError,
    setValidationErrors,
  };
};