'use client';
import React from 'react'
import CategoryNavigation from '@/component/navigation/CategoryNavigation';
import { useRouter } from 'next/navigation';

function PageHeader() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/'); // Navigate về trang chủ
  };

  return (
    <div style={styles.headerContainer}>
        <button 
          style={styles.logoContainer}
          onClick={handleLogoClick}
          title="Về trang chủ"
        >
            <img src="/images/logo.png" alt="Gundokai logo" style={styles.logo} />
            <div style={styles.logoName}>HỘI ĐẠO <br/> CHIẾN BINH</div>
        </button>
        <div style={styles.headerContent}>
            <div style={styles.headerTop}>
                <div>

                </div>
                <button style={styles.buttonContainer}>
                    <img src={'/images/icons/cart.png'} alt="Giỏ hàng" style={styles.buttonIcon} />
                    <div style={styles.buttonText}>Giỏ hàng</div>
                </button>
                <button style={styles.buttonContainer}>
                    <img src={'/images/icons/cart.png'} alt="Giỏ hàng" style={styles.buttonIcon} />
                    <div style={styles.buttonText}>Giỏ hàng</div>
                </button>
                <button style={styles.buttonContainer}>
                    <img src={'/images/icons/cart.png'} alt="Giỏ hàng" style={styles.buttonIcon} />
                    <div style={styles.buttonText}>Giỏ hàng</div>
                </button>
            </div>
            <div style={styles.headerBottom}>
                <CategoryNavigation />
            </div>
        </div>
    </div>
  );
}

const styles = {
    headerContainer: {
      display: 'flex',
      boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
      height: '120px',
      paddingLeft: '35px',
    },  
    logo: {
        height: '100px',
        padding: '5px',
        paddingRight: '0px',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
        transition: 'opacity 0.2s ease',
    },
    logoName: {
        fontSize: '19px',
        fontWeight: 'bold',
        color: '#333',
        lineHeight: '1.2',
        textAlign: 'left' as const,
    },
    headerContent: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column' as const,
        marginLeft: '40px',
    },
    headerTop: {
        display: 'flex',
        justifyContent: 'flex-end',    // ✅ Thay đổi: không dãn cách, căn phải
        alignItems: 'center',          // ✅ Thêm để căn giữa theo chiều dọc
        gap: '10px',                   // ✅ Thêm gap giữa các buttons
        backgroundImage: 'url(/images/backgrounds/headerBg.png)',
        backgroundSize: 'auto',
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '60px',
        flexGrow: 0,
        paddingRight: '30px',          // ✅ Thêm padding để cách viền
    },
    headerBottom: {
        display: 'flex',
        justifyContent: 'space-between',
        borderLeft: '1px solid #ccc',
        width: "100%",
        flexGrow: 1,
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        background: 'none',             // ✅ Thêm để bỏ background mặc định
        border: 'none',                 // ✅ Thêm để bỏ border mặc định
        cursor: 'pointer',              // ✅ Thêm cursor pointer
        padding: '8px 12px',            // ✅ Giảm padding
        borderRadius: '4px',            // ✅ Thêm border radius
        transition: 'background-color 0.2s ease', // ✅ Thêm hover effect
    },
    buttonIcon: {
        width: '24px',
        height: '24px',
    },
    buttonText: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#00417C',
        lineHeight: '1.2',
        textAlign: 'left' as const,
    },
};

export default PageHeader