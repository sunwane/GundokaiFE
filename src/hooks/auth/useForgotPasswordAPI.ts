import { useState } from 'react';
import { AuthService } from '@/services/AuthService';
import { ForgotPasswordFormState } from './useForgotPasswordForm';

export const useForgotPasswordAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const sendVerificationCode = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    clearMessages();

    try {
      const response = await AuthService.forgotPassword({ email });
      setSuccess(response.message);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi gửi mã');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    clearMessages();

    try {
      const response = await AuthService.resendVerificationCode({ email });
      setSuccess(response.message);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi gửi lại mã');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (formData: ForgotPasswordFormState): Promise<boolean> => {
    setIsLoading(true);
    clearMessages();

    try {
      const response = await AuthService.resetPassword({
        email: formData.email,
        code: formData.verificationCode,
        newPassword: formData.newPassword
      });
      setSuccess(response.message);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi đặt lại mật khẩu');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    clearMessages,
    sendVerificationCode,
    resendVerificationCode,
    resetPassword,
  };
};