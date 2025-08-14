'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/AuthService';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleBackToLogin = () => {
    router.push('/auth');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await AuthService.forgotPassword({ email });
      setSuccess(response.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Logo Header */}
      <div style={styles.logoHeader}>
        <button 
          style={styles.logoButton}
          onClick={handleLogoClick}
          title="Về trang chủ"
        >
          <img src="/images/logo.png" alt="Gundokai logo" style={styles.logoImage} />
          <div style={styles.logoText}>
            HỘI ĐẠO<br/>CHIẾN BINH
          </div>
        </button>
      </div>

      <div style={styles.forgotPasswordContainer}>
        <div style={styles.formSection}>
          <div style={styles.formContainer}>
            <div style={styles.formHeader}>
              <h1 style={styles.formTitle}>QUÊN MẬT KHẨU</h1>
              <p style={styles.formSubtitle}>
                Nhập email để nhận link đặt lại mật khẩu
              </p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                    if (success) setSuccess('');
                  }}
                  placeholder="your.email@example.com"
                  style={styles.input}
                  required
                />
              </div>

              {error && (
                <div style={styles.errorMessage}>
                  ⚠️ {error}
                </div>
              )}

              {success && (
                <div style={styles.successMessage}>
                  ✅ {success}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  ...styles.submitButton,
                  ...(isLoading ? styles.submitButtonDisabled : {})
                }}
              >
                {isLoading ? 'ĐANG GỬI...' : 'GỬI LINK ĐẶT LẠI'}
              </button>

              <button
                type="button"
                onClick={handleBackToLogin}
                style={styles.backButton}
              >
                ← Quay lại đăng nhập
              </button>
            </form>
          </div>
        </div>

        {/* Right side - Info */}
        <div style={styles.infoSection}>
          <div style={styles.infoContent}>
            <h2 style={styles.infoTitle}>ĐẶT LẠI MẬT KHẨU</h2>
            <div style={styles.infoSteps}>
              <div style={styles.step}>
                <div style={styles.stepNumber}>1</div>
                <div style={styles.stepText}>
                  Nhập email đã đăng ký
                </div>
              </div>
              <div style={styles.step}>
                <div style={styles.stepNumber}>2</div>
                <div style={styles.stepText}>
                  Kiểm tra hộp thư email
                </div>
              </div>
              <div style={styles.step}>
                <div style={styles.stepNumber}>3</div>
                <div style={styles.stepText}>
                  Click link để đặt lại mật khẩu
                </div>
              </div>
            </div>
            <div style={styles.gundamIcon}>🔐</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  logoHeader: {
    position: 'absolute' as const,
    top: '30px',
    left: '30px',
    zIndex: 10,
  },
  logoButton: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.95)',
    border: '2px solid #1a1aff',
    borderRadius: '0',
    cursor: 'pointer',
    padding: '12px 16px',
    transition: 'all 0.3s ease',
    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
    boxShadow: '0 4px 12px rgba(26,26,255,0.2)',
  },
  logoImage: {
    height: '40px',
    marginRight: '8px',
  },
  logoText: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#1a1aff',
    lineHeight: '1.2',
    textAlign: 'left' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  forgotPasswordContainer: {
    display: 'flex',
    maxWidth: '900px',
    width: '100%',
    backgroundColor: '#ffffff',
    border: '3px solid #1a1aff',
    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
    boxShadow: '0 20px 40px rgba(26,26,255,0.2)',
    overflow: 'hidden',
    zIndex: 1,
    position: 'relative' as const,
  },
  formSection: {
    flex: 1,
    padding: '60px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
  },
  formHeader: {
    textAlign: 'center' as const,
    marginBottom: '40px',
  },
  formTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1a1aff',
    margin: '0 0 16px 0',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  formSubtitle: {
    fontSize: '16px',
    color: '#666',
    margin: 0,
    lineHeight: 1.5,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  input: {
    padding: '16px 20px',
    border: '2px solid #e9ecef',
    borderRadius: '0',
    fontSize: '16px',
    color: '#495057',
    backgroundColor: '#f8f9fa',
    outline: 'none',
    transition: 'all 0.2s ease',
    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
  },
  errorMessage: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px 16px',
    border: '2px solid #ffcdd2',
    fontSize: '14px',
    fontWeight: '500',
    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
  },
  successMessage: {
    backgroundColor: '#e8f5e8',
    color: '#2e7d32',
    padding: '12px 16px',
    border: '2px solid #c8e6c9',
    fontSize: '14px',
    fontWeight: '500',
    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
  },
  submitButton: {
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #1a1aff 0%, #ff6b35 100%)',
    color: 'white',
    border: '2px solid #1a1aff',
    borderRadius: '0',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
  },
  submitButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none',
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#1a1aff',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    textAlign: 'center' as const,
    transition: 'color 0.2s ease',
    padding: '12px',
  },
  infoSection: {
    flex: 1,
    background: 'linear-gradient(135deg, #1a1aff 0%, #ff6b35 100%)',
    color: 'white',
    padding: '60px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    textAlign: 'center' as const,
    maxWidth: '350px',
  },
  infoTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 0 40px 0',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  infoSteps: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
    marginBottom: '40px',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    textAlign: 'left' as const,
  },
  stepNumber: {
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  stepText: {
    fontSize: '16px',
    lineHeight: 1.4,
  },
  gundamIcon: {
    fontSize: '60px',
    margin: '20px 0',
  },
};