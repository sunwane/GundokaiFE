import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
import React from "react";

interface Category {
  name: string;
  desc: string;
  icon: string;
  backgroundImage?: string;
  bgScale?: number; // ví dụ: 1.2, 1.4
  bgRight?: string; // ví dụ: "-10%", "0", "20px"
  bgTop?: string; // ví dụ: "-10%", "0", "20px"
}

interface ProductCategoryIntroProps {
  categories: Category[];
  isMobile?: boolean;
}

export default function ProductCategoryIntro({ categories, isMobile }: ProductCategoryIntroProps) {
  return (
    <section style={styles.section}>
      <h2 style={{
        ...styles.title,
        fontSize: isMobile ? "28px" : "40px"
      }}>
        Khám phá danh mục
      </h2>
      <p style={{
        ...styles.subtitle,
        fontSize: isMobile ? "14px" : "18px",
      }}>
        Khám phá 4 danh mục chính với hàng ngàn sản phẩm chất lượng
      </p>
      <div style={styles.grid}>
        {categories.map((cat) => (
          <div
            key={cat.name}
            style={{
              ...styles.card,
              position: "relative",
              overflow: "visible",
            }}
          >
            {cat.backgroundImage && (
              <img
                src={cat.backgroundImage}
                alt=""
                style={{
                  position: "absolute",
                  top: cat.bgTop ?? "-20%",
                  right: cat.bgRight ?? "-25%",
                  width: cat.bgScale ? `${cat.bgScale * 100}%` : "120%",
                  height: cat.bgScale ? `${cat.bgScale * 100}%` : "150px",
                  zIndex: 3,
                  pointerEvents: "none",
                  transition: "all 0.3s",
                  objectFit: "contain",
                }}
              />
            )}
            <img src={cat.icon} alt={cat.name} style={{ ...styles.icon, zIndex: 1, position: "relative" }} />
            <div style={{ ...styles.cardName, zIndex: 1, position: "relative" }}>{cat.name}</div>
            <div style={{ ...styles.cardDesc, zIndex: 1, position: "relative" }}>{cat.desc}</div>
          </div>
        ))}
      </div>
      <a
        href="/products"
        style={styles.viewAll}
      >
        <div>→</div>
    { isMobile ?
        <div>Xem tất cả sản phẩm</div>
        :
        <div>Khám phá tất cả sản phẩm</div>
    }
      </a>
    </section>
  );
}

const styles = {
  section: {
    margin: "clamp(40px, 12vw, 100px) 5px 70px 5px",
    textAlign: "center" as const,
    overflow: "hidden",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#111827",
    textTransform: "uppercase" as const,
    lineHeight: "1.2",
  },
  subtitle: {
    fontSize: "18px",
    color: "#6b7280",
    marginBottom: "72px",
  },
  grid: {
    display: "flex",
    gap: "40px",
    justifyContent: "center",
    flexWrap: "wrap" as const,
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "24px 20px",
    minWidth: "250px",
    maxWidth: "270px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    gap: "12px",
  },
  icon: {
    width: "64px",
    height: "64px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    objectFit: "contain" as const,
    padding: "8px",
  },
  cardName: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#222",
    marginBottom: "-10px",
  },
  cardDesc: {
    fontSize: "14px",
    color: "#555",
    textAlign: "left" as const,
  },
  viewAll: {
    display: "inline-flex",
    flexDirection: "row" as const,
    gap: "clamp(8px, 0.5vw, 16px)",
    marginTop: "60px",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
    background: "linear-gradient(90deg,#2563eb 0,#1e40af 100%)",
    color: "#fff",
    padding: "12px 28px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(37,99,235,0.12)",
    transition: "background 0.2s",
  },
};