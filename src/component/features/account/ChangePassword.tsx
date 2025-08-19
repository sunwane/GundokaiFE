import React, { useState } from 'react';
import PasswordInput from '@/component/ui/form/PasswordInput';
import SubmitButton from '@/component/ui/form/SubmitButton';
import Card from '@/component/ui/CardCotainer';
import CardHeader from '@/component/ui/CardHeader';
import AlertMessage from '@/component/ui/AlertMessage';
import { AuthService } from '@/services/AuthService';

interface ChangePasswordProps {
  userId: string;
}

export default function ChangePassword({ userId }: ChangePasswordProps) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // ✅ THÊM: State cho việc hiển thị password
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  // ✅ THÊM: Handlers cho toggle password visibility
  const handleTogglePassword = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await AuthService.changePassword(userId, formData.currentPassword, formData.newPassword);
      setSuccess('Đổi mật khẩu thành công!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      // ✅ Reset password visibility states
      setShowPasswords({
        current: false,
        new: false,
        confirm: false
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi đổi mật khẩu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card padding="none">
      <CardHeader title="Thay đổi mật khẩu" icon="🔐" />

      <div style={styles.content}>
        <div style={styles.securityInfo}>
          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>🛡️</div>
            <div style={styles.infoContent}>
              <h3 style={styles.infoTitle}>Bảo mật tài khoản</h3>
              <p style={styles.infoText}>
                Thường xuyên thay đổi mật khẩu giúp tài khoản của bạn được bảo mật tốt hơn.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGrid}>
            <PasswordInput
              id="currentPassword"
              label="Mật khẩu hiện tại"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              showPassword={showPasswords.current}
              onTogglePassword={() => handleTogglePassword('current')}
              mode="light"
              required
              placeholder="Nhập mật khẩu hiện tại"
            />

            <PasswordInput
              id="newPassword"
              label="Mật khẩu mới"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              showPassword={showPasswords.new}
              onTogglePassword={() => handleTogglePassword('new')}
              mode="light"
              required
              placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
            />

            <PasswordInput
              id="confirmPassword"
              label="Xác nhận mật khẩu mới"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              showPassword={showPasswords.confirm}
              onTogglePassword={() => handleTogglePassword('confirm')}
              mode="light"
              required
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>

          {error && <AlertMessage type="error" message={error} />}
          {success && <AlertMessage type="success" message={success} />}

          <div style={styles.formActions}>
            <SubmitButton
              isLoading={isLoading}
              loadingText="Đang cập nhật..."
              mode="light"
            >
              🔒 Đổi mật khẩu
            </SubmitButton>
          </div>
        </form>

        <div style={styles.passwordTips}>
          <h4 style={styles.tipsTitle}>💡 Gợi ý tạo mật khẩu mạnh:</h4>
          <ul style={styles.tipsList}>
            <li style={styles.tipItem}>Sử dụng ít nhất 8 ký tự</li>
            <li style={styles.tipItem}>Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</li>
            <li style={styles.tipItem}>Không sử dụng thông tin cá nhân dễ đoán</li>
            <li style={styles.tipItem}>Không sử dụng mật khẩu giống với các tài khoản khác</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

const styles = {
  content: {
    padding: '32px',
  },
  securityInfo: {
    marginBottom: '32px',
  },
  infoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '8px',
  },
  infoIcon: {
    fontSize: '24px',
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1e40af',
    margin: '0 0 4px 0',
  },
  infoText: {
    fontSize: '14px',
    color: '#3b82f6',
    margin: 0,
  },
  form: {
    marginBottom: '32px',
  },
  formGrid: {
    display: 'grid',
    gap: '24px',
    marginBottom: '24px',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  passwordTips: {
    backgroundColor: '#f9fafb',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  tipsTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0 0 12px 0',
  },
  tipsList: {
    margin: 0,
    paddingLeft: '20px',
  },
  tipItem: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '4px',
  },
};