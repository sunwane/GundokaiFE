'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { useFormValidation } from '@/hooks/useFormValidation';
import TabToggle from '@/component/ui/form/TabToggle';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthFormHeader from './AuthFormHeader';
import BaseAuthCard from './BaseAuthCard';
import BaseAuthContent from './BaseAuthContent';
import { ThemeMode } from '@/types/Theme';

interface AuthFormProps {
  mode?: ThemeMode;
}

const tabOptions = [
  { value: 'login', label: 'Đăng nhập' },
  { value: 'register', label: 'Đăng ký' }
];

export default function AuthForm({ mode = 'dark' }: AuthFormProps) {
  const {
    authMode,
    setAuthMode,
    loginData,
    registerData,
    isLoading,
    error,
    errors,
    showPassword,
    handleLoginInputChange,
    handleRegisterInputChange,
    handleLogin,
    handleRegister,
    setShowPassword,
    handleSendVerificationCode,
  } = useAuth();

  const validation = useFormValidation();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.validateLogin(auth.loginData)) return;
    await auth.handleLogin(e);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.validateRegister(auth.registerData)) return;
    await auth.handleRegister(e);
  };

  return (
    <BaseAuthCard className="auth-form">
      <AuthFormHeader />

      <BaseAuthContent>
        <TabToggle
          options={tabOptions}
          activeTab={authMode}
          onTabChange={setAuthMode}
          mode={mode}
        />
        
        <div style={styles.tabsContent}>
          <div className="scrollableContent" style={styles.scrollableContent}>
            {authMode === 'login' ? (
              <LoginForm
                data={loginData}
                isLoading={isLoading}
                error={error}
                validationErrors={errors}
                showPassword={showPassword}
                mode={mode}
                onInputChange={handleLoginInputChange}
                onSubmit={handleLogin}
                onTogglePassword={setShowPassword}
              />
            ) : (
              <RegisterForm
                data={registerData}
                isLoading={isLoading}
                error={error}
                validationErrors={errors}
                showPassword={showPassword}
                mode={mode}
                onInputChange={handleRegisterInputChange}
                onSubmit={handleRegister}
                onTogglePassword={setShowPassword}
                onSendVerificationCode={handleSendVerificationCode}
              />
            )}
          </div>
        </div>
      </BaseAuthContent>
    </BaseAuthCard>
  );
}

const styles = {
  tabsContent: {
    paddingTop: '1rem',
    flex: 1,
    overflow: 'hidden',
  },
  scrollableContent: {
    height: '100%',
    overflowY: 'auto' as const,
    overflowX: 'hidden',
    paddingRight: '0.5rem',
    scrollbarWidth: 'thin' as const,
    scrollbarColor: '#475569 rgba(15, 23, 42, 0.2)',
    boxSizing: 'border-box' as const,
  },
} as const;