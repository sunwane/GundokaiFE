import React, { useState } from 'react';
import UserStats from './UserStats';
import UserInfoDisplay from './UserInfoDisplay';
import { UserService } from '@/services/UserService';
import { Account } from '@/types/Account';

interface AccountInfoProps {
  user: Omit<Account, 'password'>;
  onUserUpdate: (user: Omit<Account, 'password'>) => void;
}

export default function AccountInfo({ user, onUserUpdate }: AccountInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user.username,
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editData.username.trim()) {
      setError('Tên đăng nhập không được để trống');
      return;
    }

    if (editData.username === user.username) {
      setError('Vui lòng thay đổi tên đăng nhập để cập nhật');
      return;
    }
    
    setUpdateLoading(true);
    setError('');
    setSuccess('');

    try {
      // ✅ SỬA: Sử dụng UserService thay vì AuthService
      const updatedUser = await UserService.updateMyProfile(editData);
      onUserUpdate(updatedUser);
      localStorage.setItem('userSession', JSON.stringify(updatedUser));
      setSuccess('Cập nhật tên đăng nhập thành công!');
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      username: user.username,
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const userStats = { orders: 12, ordered: 1, shipping: 8 };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h2 style={styles.title}>
            <span style={styles.icon}>👤</span>
            Thông tin tài khoản
          </h2>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} style={styles.editButton}>
              <span>✏️</span>
              Chỉnh sửa
            </button>
          ) : (
            <button onClick={handleCancel} style={styles.cancelButton}>
              <span>❌</span>
              Hủy
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {!isEditing ? (
          <div>
            <UserStats stats={userStats} />
            <UserInfoDisplay user={user} />
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile}>
            {/* Username Input */}
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label htmlFor="username" style={styles.label}>
                  Tên đăng nhập
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={editData.username}
                  onChange={handleInputChange}
                  placeholder="Nhập tên đăng nhập mới"
                  style={styles.input}
                  required
                />
              </div>
            </div>

            {/* Readonly Info */}
            <div style={styles.readonlyInfo}>
              <div style={styles.readonlyItem}>
                <label style={styles.readonlyLabel}>Email (không thể thay đổi)</label>
                <div style={styles.readonlyValue}>{user.email}</div>
              </div>
              
              <div style={styles.readonlyItem}>
                <label style={styles.readonlyLabel}>Giới tính (không thể thay đổi)</label>
                <div style={styles.readonlyValue}>
                  {user.gender === 'MALE' ? 'Nam' : user.gender === 'FEMALE' ? 'Nữ' : 'Chưa cập nhật'}
                </div>
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div style={styles.errorMessage}>
                <span>❌</span>
                {error}
              </div>
            )}
            {success && (
              <div style={styles.successMessage}>
                <span>✅</span>
                {success}
              </div>
            )}

            {/* Submit Button */}
            <div style={styles.formActions}>
              <button
                type="submit"
                disabled={updateLoading}
                style={{
                  ...styles.submitButton,
                  ...(updateLoading ? styles.submitButtonDisabled : {})
                }}
              >
                {updateLoading ? (
                  <>
                    <span style={styles.spinner}>⏳</span>
                    Đang cập nhật...
                  </>
                ) : (
                  <>
                    <span>💾</span>
                    Cập nhật tên đăng nhập
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
    padding: '20px 24px',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  icon: {
    fontSize: '18px',
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  cancelButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: '#6b7280',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  content: {
    padding: '24px',
  },
  formGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    marginBottom: '24px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.2s ease',
    outline: 'none',
  },
  readonlyInfo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
  },
  readonlyItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  readonlyLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  readonlyValue: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    fontStyle: 'italic' as const,
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    color: '#dc2626',
    fontSize: '14px',
    marginBottom: '16px',
  },
  successMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '8px',
    color: '#16a34a',
    fontSize: '14px',
    marginBottom: '16px',
  },
  formActions: {
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: '1px solid #e5e7eb',
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '100%',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
  },
};