import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/AuthService';
import { UserService } from '@/services/UserService';

export const useAccount = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Dữ liệu chỉnh sửa
  const [editData, setEditData] = useState({
    username: '',
    email: '', // Thêm trường email
    gender: ''
  });

  // Kiểm tra xác thực và lấy thông tin người dùng
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        if (!AuthService.isAuthenticated()) {
          router.push('/auth');
          return;
        }

        // Lấy thông tin người dùng từ local storage trước
        const userFromStorage = AuthService.getCurrentUser();
        if (userFromStorage) {
          setUser(userFromStorage);
          setEditData({
            username: userFromStorage.username || '',
            email: userFromStorage.email || '', // Thêm trường email
            gender: userFromStorage.gender || 'MALE'
          });
        }

        // Sau đó gọi API để lấy thông tin mới nhất
        const profileData = await UserService.getMyProfile();
        if (profileData && profileData.result) {
          setUser(profileData.result);
          setEditData({
            username: profileData.result.username || '',
            email: profileData.result.email || '', // Thêm trường email
            gender: profileData.result.gender || 'MALE'
          });
          
          // Cập nhật lại localStorage
          localStorage.setItem('userSession', JSON.stringify(profileData.result));
        }
      } catch (err) {
        console.error('Account load error:', err);
        setError(err instanceof Error ? err.message : 'Không thể tải thông tin tài khoản');
        // Redirect to login if authentication fails
        router.push('/auth');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Xử lý cập nhật thông tin
  const handleUpdateProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await UserService.updateProfile(editData);
      setUser(result.result);
      localStorage.setItem('userSession', JSON.stringify(result.result));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cập nhật thất bại');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý đăng xuất
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      router.push('/auth');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng xuất thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    editData,
    setEditData,
    handleUpdateProfile,
    handleLogout
  };
};