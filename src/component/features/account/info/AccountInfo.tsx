import React, { useState } from 'react';
import FormInput from '@/component/ui/form/FormInput';
import FormSelect from '@/component/ui/form/FormSelect';
import SubmitButton from '@/component/ui/form/SubmitButton';
import Card from '@/component/ui/CardCotainer';
import CardHeader from '@/component/ui/CardHeader';
import ActionButton from '@/component/ui/ActionButton';
import AlertMessage from '@/component/ui/AlertMessage';
import UserStats from '@/component/features/account/info/UserStats';
import UserInfoDisplay from '@/component/features/account/info/UserInfoDisplay';
import { Account } from '@/types/Account';
import { AuthService } from '@/services/AuthService';

interface AccountInfoProps {
  user: Omit<Account, 'password'>;
  onUserUpdate: (user: Omit<Account, 'password'>) => void;
}

export default function AccountInfo({ user, onUserUpdate }: AccountInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user.username,
    email: user.email,
    gender: user.gender
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setUpdateLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatedUser = await AuthService.updateProfile(user.id, editData);
      onUserUpdate(updatedUser);
      localStorage.setItem('userSession', JSON.stringify(updatedUser));
      setSuccess('Cập nhật thông tin thành công!');
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
      email: user.email,
      gender: user.gender
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const genderOptions = [
    { value: 'male', label: 'Nam' },
    { value: 'female', label: 'Nữ' },
    { value: 'other', label: 'Khác' }
  ];

  const userStats = { orders: 12, points: 156, favorites: 8 };

  return (
    <Card padding="none">
      <CardHeader title="Thông tin tài khoản" icon="👤">
        {!isEditing ? (
          <ActionButton onClick={() => setIsEditing(true)}>
            <span>✏️</span>
            Chỉnh sửa
          </ActionButton>
        ) : (
          <ActionButton onClick={handleCancel} variant="secondary">
            <span>❌</span>
            Hủy
          </ActionButton>
        )}
      </CardHeader>

      <div style={styles.content}>
        {!isEditing ? (
          <div>
            <UserStats stats={userStats} />
            <UserInfoDisplay user={user} />
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile}>
            <div style={styles.formGrid}>
              <FormInput
                id="username"
                label="Tên đăng nhập"
                name="username"
                value={editData.username}
                onChange={handleInputChange}
                mode="light"
                required
              />
              
              <FormInput
                id="email"
                label="Email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
                mode="light"
                required
              />
              
              <div style={styles.fullWidth}>
                <FormSelect
                  id="gender"
                  label="Giới tính"
                  name="gender"
                  value={editData.gender}
                  onChange={handleInputChange}
                  options={genderOptions}
                  mode="light"
                  required
                />
              </div>
            </div>

            {error && <AlertMessage type="error" message={error} />}
            {success && <AlertMessage type="success" message={success} />}

            <div style={styles.formActions}>
              <SubmitButton
                isLoading={updateLoading}
                loadingText="Đang cập nhật..."
                mode="light"
              >
                💾 Lưu thay đổi
              </SubmitButton>
            </div>
          </form>
        )}
      </div>
    </Card>
  );
}

const styles = {
  content: {
    padding: '32px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    marginBottom: '24px',
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};