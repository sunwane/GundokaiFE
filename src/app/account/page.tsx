'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/component/layout/PageHeader';
import { AuthService } from '@/services/AuthService';
import { Account } from '@/types/Account';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<Omit<Account, 'password'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: '',
    email: '',
    gender: 'male' as 'male' | 'female' | 'other'
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const userSession = localStorage.getItem('userSession');

      if (!token || !userSession) {
        router.push('/auth');
        return;
      }

      try {
        const currentUser = await AuthService.getCurrentUser(token);
        setUser(currentUser);
        setEditData({
          username: currentUser.username,
          email: currentUser.email,
          gender: currentUser.gender
        });
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userSession');
        router.push('/auth');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUpdateLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatedUser = await AuthService.updateProfile(user.id, editData);
      setUser(updatedUser);
      localStorage.setItem('userSession', JSON.stringify(updatedUser));
      setSuccess('Cập nhật thông tin thành công!');
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userSession');
      router.push('/');
    }
  };

  const handleCancel = () => {
    if (user) {
      setEditData({
        username: user.username,
        email: user.email,
        gender: user.gender
      });
    }
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  if (isLoading) {
    return (
      <div>
        <PageHeader />
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
          <p style={styles.loadingText}>Đang tải thông tin tài khoản...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <PageHeader />
      
      <div style={styles.pageContainer}>
        <div style={styles.accountContainer}>
          {/* Header */}
          <div style={styles.accountHeader}>
            <div style={styles.avatarSection}>
              <div style={styles.avatar}>
                <div style={styles.avatarPlaceholder}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </div>
              <div style={styles.userInfo}>
                <h1 style={styles.username}>{user.username}</h1>
                <p style={styles.email}>{user.email}</p>
                <div style={styles.userStats}>
                  <span style={styles.stat}>
                    ID: {user.id}
                  </span>
                </div>
              </div>
            </div>
            <div style={styles.headerActions}>
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    style={styles.editButton}
                  >
                    ✏️ Chỉnh sửa
                  </button>
                  <button
                    onClick={handleLogout}
                    style={styles.logoutButton}
                  >
                    🚪 Đăng xuất
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCancel}
                  style={styles.cancelButton}
                >
                  ❌ Hủy
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div style={styles.accountContent}>
            {!isEditing ? (
              // View Mode
              <div style={styles.profileView}>
                <h2 style={styles.sectionTitle}>THÔNG TIN TÀI KHOẢN</h2>
                
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <label style={styles.infoLabel}>ID</label>
                    <div style={styles.infoValue}>{user.id}</div>
                  </div>
                  
                  <div style={styles.infoItem}>
                    <label style={styles.infoLabel}>Tên đăng nhập</label>
                    <div style={styles.infoValue}>{user.username}</div>
                  </div>
                  
                  <div style={styles.infoItem}>
                    <label style={styles.infoLabel}>Email</label>
                    <div style={styles.infoValue}>{user.email}</div>
                  </div>
                  
                  <div style={styles.infoItem}>
                    <label style={styles.infoLabel}>Giới tính</label>
                    <div style={styles.infoValue}>
                      {user.gender === 'male' ? 'Nam' : user.gender === 'female' ? 'Nữ' : 'Khác'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleUpdateProfile} style={styles.editForm}>
                <h2 style={styles.sectionTitle}>CHỈNH SỬA THÔNG TIN</h2>
                
                <div style={styles.formGrid}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Tên đăng nhập</label>
                    <input
                      type="text"
                      name="username"
                      value={editData.username}
                      onChange={handleInputChange}
                      style={styles.input}
                      required
                    />
                  </div>
                  
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleInputChange}
                      style={styles.input}
                      required
                    />
                  </div>
                  
                  <div style={styles.inputGroupFull}>
                    <label style={styles.label}>Giới tính</label>
                    <select
                      name="gender"
                      value={editData.gender}
                      onChange={handleInputChange}
                      style={styles.select}
                      required
                    >
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
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

                <div style={styles.formActions}>
                  <button
                    type="submit"
                    disabled={updateLoading}
                    style={{
                      ...styles.saveButton,
                      ...(updateLoading ? styles.saveButtonDisabled : {})
                    }}
                  >
                    {updateLoading ? 'ĐANG CẬP NHẬT...' : '💾 LƯU THAY ĐỔI'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    gap: '20px',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(26, 26, 255, 0.3)',
    borderTop: '3px solid #1a1aff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '16px',
    color: '#1a1aff',
    fontWeight: '500',
  },
  pageContainer: {
    minHeight: 'calc(100vh - 160px)',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    padding: '40px 5vw',
  },
  accountContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    border: '3px solid #1a1aff',
    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
    boxShadow: '0 20px 40px rgba(26,26,255,0.2)',
    overflow: 'hidden',
  },
  accountHeader: {
    background: 'linear-gradient(135deg, #1a1aff 0%, #ff6b35 100%)',
    color: 'white',
    padding: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '20px',
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid rgba(255, 255, 255, 0.3)',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  username: {
    overflow: 'hidden',
  },
  accountHeader: {
    background: 'linear-gradient(135deg, #1a1aff 0%, #ff6b35 100%)',
    color: 'white',
    padding: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '20px',
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid rgba(255, 255, 255, 0.3)',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  username: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0,
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  email: {
    fontSize: '16px',
    margin: 0,
    opacity: 0.9,
  },
  userStats: {
    display: 'flex',
    gap: '20px',
    fontSize: '14px',
    opacity: 0.8,
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap' as const,
  },
  editButton: {
    padding: '12px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '0',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    transition: 'all 0.2s ease',
    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
  },
  logoutButton: {
    padding: '12px 20px',
    backgroundColor: 'rgba(220, 53, 69, 0.8)',
    color: 'white',
    border: '2px solid rgba(220, 53, 69, 0.8)',
    borderRadius: '0',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    transition: 'all 0.2s ease',
    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
  },
  cancelButton: {
    padding: '12px 20px',
    backgroundColor: 'rgba(108, 117, 125, 0.8)',
    color: 'white',
    border: '2px solid rgba(108, 117, 125, 0.8)',
    borderRadius: '0',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    transition: 'all 0.2s ease',
    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
  },
  accountContent: {
    padding: '40px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1aff',
    margin: '0 0 30px 0',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  profileView: {
    width: '100%',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  infoItemFull: {
    gridColumn: '1 / -1',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  infoLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  infoValue: {
    padding: '12px 16px',
    backgroundColor: '#f8f9fa',
    border: '2px solid #e9ecef',
    borderRadius: '0',
    fontSize: '16px',
    color: '#495057',
    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
  },
  editForm: {
    width: '100%',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  inputGroupFull: {
    gridColumn: '1 / -1',
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
    padding: '12px 16px',
    border: '2px solid #e9ecef',
    borderRadius: '0',
    fontSize: '16px',
    color: '#495057',
    backgroundColor: '#f8f9fa',
    outline: 'none',
    transition: 'all 0.2s ease',
    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
  },
  select: {
    padding: '12px 16px',
    border: '2px solid #e9ecef',
    borderRadius: '0',
    fontSize: '16px',
    color: '#495057',
    backgroundColor: '#f8f9fa',
    outline: 'none',
    transition: 'all 0.2s ease',
    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
  },
  textarea: {
    padding: '12px 16px',
    border: '2px solid #e9ecef',
    borderRadius: '0',
    fontSize: '16px',
    color: '#495057',
    backgroundColor: '#f8f9fa',
    outline: 'none',
    transition: 'all 0.2s ease',
    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
    resize: 'vertical' as const,
    minHeight: '80px',
  },
  errorMessage: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px 16px',
    border: '2px solid #ffcdd2',
    fontSize: '14px',
    fontWeight: '500',
    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
    marginBottom: '16px',
  },
  successMessage: {
    backgroundColor: '#e8f5e8',
    color: '#2e7d32',
    padding: '12px 16px',
    border: '2px solid #c8e6c9',
    fontSize: '14px',
    fontWeight: '500',
    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
    marginBottom: '16px',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  saveButton: {
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
  saveButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none',
  },
};