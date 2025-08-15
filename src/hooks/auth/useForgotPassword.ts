import { useRouter } from 'next/navigation';
import { useForgotPasswordForm } from './useForgotPasswordForm';
import { useForgotPasswordValidation } from './useForgotPasswordValidation';
import { useForgotPasswordAPI } from './useForgotPasswordAPI';

export const useForgotPassword = () => {
  const router = useRouter();
  const { formData, updateField, handleInputChange, resetForm } = useForgotPasswordForm();
  const { 
    validationErrors, 
    validateEmail, 
    validateForm, 
    clearFieldError, 
    clearAllErrors, 
    setValidationErrors 
  } = useForgotPasswordValidation();
  const { 
    isLoading, 
    error, 
    success, 
    clearMessages, 
    sendVerificationCode, 
    resendVerificationCode, 
    resetPassword 
  } = useForgotPasswordAPI();

  const clearErrors = () => {
    clearMessages();
    clearAllErrors();
  };

  const handleSendCode = async () => {
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setValidationErrors({ email: emailError });
      return;
    }

    clearErrors();
    const success = await sendVerificationCode(formData.email);
    if (success) {
      updateField('codeSent', true);
    }
  };

  const handleResendCode = async () => {
    clearErrors();
    await resendVerificationCode(formData.email);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const success = await resetPassword(formData);
    if (success) {
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/auth');
      }, 3000);
    }
  };

  const handleInputChangeWithClearError = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    
    // Clear errors when user types
    if (error) clearMessages();
    if (validationErrors[name as keyof typeof validationErrors]) {
      clearFieldError(name as keyof typeof validationErrors);
    }
    
    handleInputChange(e);
  };

  const handleBackToLogin = () => {
    router.push('/auth');
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  const toggleNewPasswordVisibility = () => {
    updateField('showNewPassword', !formData.showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    updateField('showConfirmPassword', !formData.showConfirmPassword);
  };

  const getFormClassName = () => {
    let className = 'forgot-password-form';
    if (isLoading) className += ' loading';
    if (error) className += ' error';
    if (success) className += ' success';
    return className;
  };

  const isSubmitDisabled = () => {
    return isLoading || 
           !formData.email.trim() || 
           !formData.verificationCode.trim() || 
           !formData.newPassword.trim() || 
           !formData.confirmPassword.trim();
  };

  const isSendCodeDisabled = () => {
    return isLoading || !formData.email.trim() || formData.codeSent;
  };

  return {
    // Form state
    formData,
    updateField,
    
    // UI state
    isLoading,
    error,
    success,
    validationErrors,
    
    // Handlers
    handleInputChange: handleInputChangeWithClearError,
    handleSendCode,
    handleResendCode,
    handleResetPassword,
    handleBackToLogin,
    handleLogoClick,
    toggleNewPasswordVisibility,
    toggleConfirmPasswordVisibility,
    
    // Computed values
    getFormClassName,
    isSubmitDisabled,
    isSendCodeDisabled,
    
    // Utils
    clearErrors,
    resetForm,
  };
};