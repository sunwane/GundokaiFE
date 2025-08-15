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
  const auth = useAuth();
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
    <BaseAuthCard>
      <AuthFormHeader />

      <BaseAuthContent>
        <TabToggle
          options={tabOptions}
          activeTab={auth.authMode}
          mode={mode}
          onTabChange={(tab) => auth.setAuthMode(tab as 'login' | 'register')}
        />

        <div style={styles.tabsContent}>
          <div style={styles.scrollableContent}>
            {auth.authMode === 'login' ? (
              <LoginForm
                data={auth.loginData}
                isLoading={auth.isLoading}
                error={auth.error}
                validationErrors={Object.fromEntries(
                  Object.entries(validation.errors).map(([key, value]) => [key, String(value)])
                )}
                showPassword={auth.showPassword}
                mode={mode}
                onInputChange={auth.handleLoginInputChange}
                onSubmit={handleLoginSubmit}
                onTogglePassword={() => auth.setShowPassword(!auth.showPassword)}
              />
            ) : (
              <RegisterForm
                data={auth.registerData}
                isLoading={auth.isLoading}
                error={auth.error}
                validationErrors={Object.fromEntries(
                  Object.entries(validation.errors).map(([key, value]) => [key, String(value)])
                )}
                showPassword={auth.showPassword}
                mode={mode}
                onInputChange={auth.handleRegisterInputChange}
                onSubmit={handleRegisterSubmit}
                onTogglePassword={() => auth.setShowPassword(!auth.showPassword)}
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