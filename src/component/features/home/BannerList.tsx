"use client";
import { useState, useEffect, useRef } from "react";

interface BannerItem {
  img: string;
  link?: string;
  subtitle?: string;
  title?: string;
  description?: string;
}
interface BannerListProps {
  banners: BannerItem[];
  isMobile?: boolean;
}

export default function BannerList({ banners, isMobile = false }: BannerListProps) {
  const [current, setCurrent] = useState(0);
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | 'none'>('none');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (banners.length <= 1) return;
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, banners.length]);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((current - 1 + banners.length) % banners.length);
  const next = () => setCurrent((current + 1) % banners.length);

  return (
    <div style={styles.wrapper}>
      <div style={{
        ...styles.slider,
        height: isMobile ? "200px" : "calc(100vh - 160px)",
        maxHeight: isMobile ? "250px" : "560px",
      }}>
        {/* Vùng hover trái */}
        <div 
          style={{
            ...styles.leftHoverZone,
            width: isMobile ? "60px" : "120px",
            paddingLeft: isMobile ? "10px" : "20px",
          }}
          onMouseEnter={() => setHoveredSide('left')}
          onMouseLeave={() => setHoveredSide('none')}
          onClick={prev}
        >
          <button
            style={{
              ...styles.arrowLeft,
              width: isMobile ? "36px" : "48px",
              height: isMobile ? "36px" : "48px",
              opacity: hoveredSide === 'left' ? 0.8 : 0,
              transform: `translateY(-50%) scale(${hoveredSide === 'left' ? 1 : 0.8})`,
              transition: "all 0.3s ease",
            }}
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
          >
            <svg width={isMobile ? "14" : "16"} height={isMobile ? "14" : "16"} viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
        </div>

        {/* Vùng ảnh giữa + mô tả */}
        <div style={styles.bannerContent}>
          <img
            src={banners[current].img}
            alt={banners[current].title || `Banner ${current + 1}`}
            style={styles.bannerImg}
          />
          <div style={{
            ...styles.infoBox,
            left: isMobile ? "10px" : "auto",
            right: isMobile ? "auto" : "30px",
            bottom: isMobile ? "5px" : "40px",
            padding: isMobile ? "12px 16px" : "24px 32px",
            maxWidth: isMobile ? "55vw" : "500px",
            gap: isMobile ? "6px" : "8px",
          }}>
            {banners[current].subtitle && (
              <div style={{
                ...styles.subtitle,
                fontSize: isMobile ? "11px" : "16px",
                marginBottom: isMobile ? "-3px" : "-6px",
              }}>
                {banners[current].subtitle}
              </div>
            )}
            {banners[current].title && (
              <div style={{
                ...styles.title,
                fontSize: isMobile ? "18px" : "42px",
                marginBottom: isMobile ? "4px" : "8px",
              }}>
                {banners[current].title}
              </div>
            )}
            {banners[current].description && (
              <div style={{
                ...styles.desc,
                fontSize: isMobile ? "10px" : "18px",
                marginBottom: isMobile ? "5px" : "16px",
              }}>
                {banners[current].description}
              </div>
            )}
            {banners[current].link && (
              <a
                href={banners[current].link}
                style={{
                  ...styles.detailBtn,
                  padding: isMobile ? "6px 12px" : "12px 28px",
                  fontSize: isMobile ? "10px" : "16px",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Xem chi tiết
              </a>
            )}
          </div>
        </div>

        {/* Vùng hover phải */}
        <div 
          style={{
            ...styles.rightHoverZone,
            width: isMobile ? "60px" : "120px",
            paddingRight: isMobile ? "10px" : "20px",
          }}
          onMouseEnter={() => setHoveredSide('right')}
          onMouseLeave={() => setHoveredSide('none')}
          onClick={next}
        >
          <button
            style={{
              ...styles.arrowRight,
              width: isMobile ? "36px" : "48px",
              height: isMobile ? "36px" : "48px",
              opacity: hoveredSide === 'right' ? 0.8 : 0,
              transform: `translateY(-50%) scale(${hoveredSide === 'right' ? 1 : 0.8})`,
              transition: "all 0.3s ease",
            }}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
          >
            <svg width={isMobile ? "14" : "16"} height={isMobile ? "14" : "16"} viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div style={{
        ...styles.dots,
        padding: isMobile ? "20px 0px 12px 0" : "26px 0 16px 0",
      }}>
        {banners.map((_, idx) => (
          <button
            key={idx}
            style={{
              ...styles.dot,
              width: isMobile ? "10px" : "12px",
              height: isMobile ? "10px" : "12px",
              background: idx === current ? "#1a365d" : "rgb(211, 211, 211)",
              border: idx === current ? "2px solid #1a365d" : "2px solid rgb(211, 211, 211)",
              transform: idx === current ? "scale(1.2)" : "scale(1)",
            }}
            onClick={() => goTo(idx)}
            aria-label={`Go to banner ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Styles riêng như cũ, không có responsive
const styles = {
  wrapper: {
    width: "100%",
    position: "relative" as const,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  slider: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#101a2b",
  },
  leftHoverZone: {
    position: "absolute" as const,
    left: 0,
    top: 0,
    height: "100%",
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    cursor: "pointer",
    background: "linear-gradient(to right, rgba(0,0,0,0.1), transparent)",
  },
  rightHoverZone: {
    position: "absolute" as const,
    right: 0,
    top: 0,
    height: "100%",
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    cursor: "pointer",
    background: "linear-gradient(to left, rgba(0,0,0,0.1), transparent)",
  },
  bannerContent: {
    position: "relative" as const,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  infoBox: {
    position: "absolute" as const,
    background: "rgba(16,26,43,0.8)",
    backdropFilter: "blur(8px)",
    color: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
    zIndex: 2,
    display: "flex",
    flexDirection: "column" as const,
  },
  subtitle: {
    fontWeight: "500",
    color: "#94a3b8",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
  },
  title: {
    fontWeight: "bold",
    lineHeight: 1,
    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  desc: {
    fontWeight: 400,
    lineHeight: 1.4,
    textShadow: "0 1px 4px rgba(0,0,0,0.2)",
    color: "#e2e8f0",
  },
  detailBtn: {
    display: "inline-block",
    fontWeight: "600",
    color: "#fff",
    background: "linear-gradient(90deg,#2563eb 0,#1e40af 100%)",
    borderRadius: "8px",
    textDecoration: "none",
    boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
    transition: "all 0.2s ease",
    border: "none",
    cursor: "pointer",
    outline: "none",
    alignSelf: "flex-start",
  },
  bannerImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    transition: "all 0.3s ease",
    background: "#101a2b",
  },
  arrowLeft: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1a365d",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    outline: "none",
    pointerEvents: "auto" as const,
  },
  arrowRight: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1a365d",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    outline: "none",
    pointerEvents: "auto" as const,
  },
  dots: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    backgroundImage: "url(/images/backgrounds/dots-bg.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  dot: {
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.3s ease",
    outline: "none",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
};