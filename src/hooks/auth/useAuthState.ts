'use client';
import { useState, useEffect } from 'react';
import { Account } from '@/types/Account';

export interface AuthState {
  isLoggedIn: boolean;
  user: Omit<Account, 'password'> | null;
  loading: boolean;
}

export function useAuthState(): AuthState & {
  login: (user: Omit<Account, 'password'>, token: string) => void;
  logout: () => void;
  updateUser: (user: Omit<Account, 'password'>) => void;
} {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Check authentication status on mount
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userSession = localStorage.getItem('userSession');
        
        if (token && userSession) {
          const userData = JSON.parse(userSession);
          setAuthState({
            isLoggedIn: true,
            user: userData,
            loading: false,
          });
        } else {
          setAuthState({
            isLoggedIn: false,
            user: null,
            loading: false,
          });
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setAuthState({
          isLoggedIn: false,
          user: null,
          loading: false,
        });
      }
    };

    checkAuthStatus();
  }, []);

  const login = (user: Omit<Account, 'password'>, token: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userSession', JSON.stringify(user));
    setAuthState({
      isLoggedIn: true,
      user,
      loading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userSession');
    setAuthState({
      isLoggedIn: false,
      user: null,
      loading: false,
    });
  };

  const updateUser = (user: Omit<Account, 'password'>) => {
    localStorage.setItem('userSession', JSON.stringify(user));
    setAuthState(prev => ({
      ...prev,
      user,
    }));
  };

  return {
    ...authState,
    login,
    logout,
    updateUser,
  };
}