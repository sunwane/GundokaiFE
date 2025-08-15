import { useState } from 'react';

export interface ForgotPasswordFormState {
  email: string;
  verificationCode: string;
  newPassword: string;
  confirmPassword: string;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  codeSent: boolean;
  codeVerified: boolean;
}

export const useForgotPasswordForm = () => {
  const [formData, setFormData] = useState<ForgotPasswordFormState>({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: '',
    showNewPassword: false,
    showConfirmPassword: false,
    codeSent: false,
    codeVerified: false,
  });

  const updateField = (field: keyof ForgotPasswordFormState, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name as keyof ForgotPasswordFormState, value);
  };

  const resetForm = () => {
    setFormData({
      email: '',
      verificationCode: '',
      newPassword: '',
      confirmPassword: '',
      showNewPassword: false,
      showConfirmPassword: false,
      codeSent: false,
      codeVerified: false,
    });
  };

  return {
    formData,
    updateField,
    handleInputChange,
    resetForm,
  };
};