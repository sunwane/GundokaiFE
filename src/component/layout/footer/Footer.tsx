import React from "react";

export default function Footer() {
  return (
    <div style={styles.wrapper}>
      <div
        style={{
          position: "relative",
          ...styles.info,
          backgroundImage: `url('/images/backgrounds/bg_footer.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center 70%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay làm mờ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.25)",
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={styles.top}>
            <div style={styles.col}>
              <div style={styles.logoRow}>
                <img src="/images/logo.png" alt="Logo" style={styles.logo} />
                <div>
                  <div style={styles.siteName}>Hội đạo chiến binh</div>
                  <div style={styles.siteSub}>GUNDOKAI</div>
                </div>
              </div>
              <div style={styles.desc}>
                Điểm đến tin cậy cho mọi sản phẩm hobby chất lượng cao. Từ Gundam đến figure, chúng tôi mang đến trải nghiệm mua sắm tuyệt vời nhất.
              </div>
              <div style={styles.socialRow}>
                <a href="#" style={styles.social}><img src="/images/icons/facebook.svg" alt="fb" style={styles.socialIcon} /></a>
                <a href="#" style={styles.social}><img src="/images/icons/instagram.svg" alt="ig" style={styles.socialIcon} /></a>
                <a href="#" style={styles.social}><img src="/images/icons/youtube.svg" alt="yt" style={styles.socialIcon} /></a>
              </div>
            </div>
            <div style={styles.col}>
              <div style={styles.colTitle}>Danh mục</div>
              <div style={styles.colLink}>Gundam</div>
              <div style={styles.colLink}>Thẻ bài</div>
              <div style={styles.colLink}>Figure</div>
              <div style={styles.colLink}>Sản phẩm khác</div>
              <div style={styles.colLink}>Phụ kiện</div>
            </div>
            <div style={styles.col}>
              <div style={styles.colTitle}>Hỗ trợ</div>
              <div style={styles.colLink}>Hướng dẫn mua hàng</div>
              <div style={styles.colLink}>Chính sách đổi trả</div>
              <div style={styles.colLink}>Bảo hành</div>
              <div style={styles.colLink}>FAQ</div>
              <div style={styles.colLink}>Liên hệ</div>
            </div>
            <div style={styles.col}>
              <div style={styles.colTitle}>Liên hệ</div>
              <div style={styles.colLink}><span style={styles.icon}>📞</span> 0123 456 789</div>
              <div style={styles.colLink}><span style={styles.icon}>✉️</span> info@gundokai.com</div>
              <div style={styles.colLink}><span style={styles.icon}>📍</span> 123 Đường ABC, Quận 1<br/>TP. Hồ Chí Minh</div>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright - nền đen */}
      <div style={styles.copyrightBar}>
        <div style={styles.copyright}>
          © 2024 Hội đạo chiến binh (GUNDOKAI). Tất cả quyền được bảo lưu.
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "auto",
    background: "#000",
  },
  info: {
    padding: "0 0 48px 0",
    color: "#e5e7eb",
    fontSize: "15px",
    width: "100%",
  },
  top: {
    display: "flex",
    gap: "48px",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: "0 auto",
    maxWidth: "85vw",
    padding: "48px 24px 0 24px",
  },
  col: {
    minWidth: "180px",
    maxWidth: "260px",
    flex: "1 1 0",
    marginBottom: "16px",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  logo: {
    width: "48px",
    height: "48px",
    borderRadius: "8px",
    background: "#fff",
    objectFit: "contain" as const,
  },
  siteName: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#fff",
  },
  siteSub: {
    fontSize: "13px",
    color: "#a5b4fc",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  desc: {
    fontSize: "14px",
    color: "#e5e7eb",
    marginBottom: "12px",
    marginTop: "8px",
  },
  socialRow: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  social: {
    display: "inline-block",
  },
  socialIcon: {
    width: "22px",
    height: "22px",
    filter: "brightness(1.5)",
  },
  colTitle: {
    fontWeight: "bold",
    fontSize: "16px",
    marginBottom: "10px",
    color: "#fff",
  },
  colLink: {
    fontSize: "14px",
    color: "#e5e7eb",
    marginBottom: "7px",
    cursor: "pointer",
    whiteSpace: "pre-line" as const,
  },
  icon: {
    marginRight: "6px",
  },
  copyrightBar: {
    background: "#000",
    width: "100%",
    padding: "16px 0 8px 0",
  },
  copyright: {
    textAlign: "center" as const,
    fontSize: "13px",
    color: "#a5b4fc",
  },
};