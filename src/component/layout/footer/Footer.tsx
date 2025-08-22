import React from "react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
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
      <div style={styles.hr}></div>
      <div style={styles.copyright}>
        © 2024 Hội đạo chiến binh (GUNDOKAI). Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#131c2b",
    color: "#e5e7eb",
    padding: "48px 5vw 16px 5vw",
    fontSize: "15px",
    marginTop: "64px",
  },
  top: {
    display: "flex",
    gap: "48px",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap" as const,
    marginBottom: "24px",
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
  hr: {
    borderTop: "1px solid #334155",
    margin: "24px 0 12px 0",
  },
  copyright: {
    textAlign: "center" as const,
    fontSize: "13px",
    color: "#a5b4fc",
  },
};