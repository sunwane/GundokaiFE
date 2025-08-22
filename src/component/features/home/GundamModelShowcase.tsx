"use client";
import React, { useState } from "react";
import GundamScene3D from "@/component/features/auth/GundamScene3D";

interface GundamDetail {
  label: string;
  value: string;
  position: { x: number; y: number };
}

interface GundamModelConfig {
  defaultScale?: number;
  appearScale?: number;
  poseScale?: number;
  defaultPosition?: [number, number, number];
  appearPosition?: [number, number, number];
  posePosition?: [number, number, number];
  defaultRotation?: [number, number, number];
  appearAnimationNames?: string[];
  poseAnimationNames?: string[];
  transitionDuration?: number;
  appearCutTime?: number;
  colorMultiplier?: number;
  metalnessAdjust?: number;
  roughnessAdjust?: number;
  envMapIntensityAdjust?: number;
  aoMapIntensity?: number;
}

interface GundamModel {
  id: string;
  category: string;
  name: string;
  description: string;
  modelPath: string;
  categoryLink: string; // Thêm link cho từng thể loại
  details: GundamDetail[];
  specs: {
    height: string;
    detailLevel: string;
    difficulty: string;
    articulation: string;
  };
  config?: GundamModelConfig;
}

interface GundamModelShowcaseProps {
  models: GundamModel[];
  isMobile?: boolean;
}

export default function GundamModelShowcase({ models, isMobile = false }: GundamModelShowcaseProps) {
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const [activeDetailIndex, setActiveDetailIndex] = useState<number | null>(null);
  
  const activeModel = models[activeModelIndex];
  
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Khám phá các dòng Gundam</h2>
          <p style={styles.subtitle}>
            Tìm hiểu chi tiết về từng dòng mô hình Gundam qua trải nghiệm 3D tương tác
          </p>
        </div>

        {/* Category Buttons - Nằm ngang ở phía trên */}
        <div style={{
          ...styles.categoryButtons,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "8px" : "16px",
          marginBottom: "32px",
          width: isMobile ? "100%" : "auto",
        }}>
          {models.map((model, index) => (
            <button
              key={model.id}
              style={{
                ...styles.categoryButton,
                backgroundColor: index === activeModelIndex ? "#2563eb" : "#f8fafc",
                color: index === activeModelIndex ? "#fff" : "#64748b",
                border: index === activeModelIndex ? "2px solid #2563eb" : "2px solid #e2e8f0",
                flex: isMobile ? "none" : "1",
                textAlign: "center" as const,
                padding: isMobile ? "12px 16px" : "16px 24px",
                fontSize: isMobile ? "14px" : "16px",
                width: isMobile ? "100%" : "auto", // Thêm dòng này
                minWidth: isMobile ? "0" : undefined, // Đảm bảo không bị giới hạn min-width
              }}
              onClick={() => {
                setActiveModelIndex(index);
                setActiveDetailIndex(null);
              }}
            >
              {model.category}
            </button>
          ))}
        </div>

        <div style={{
          ...styles.content,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "24px" : "48px",
        }}>
          <div style={{
            ...styles.leftColumn,
            width: isMobile ? "100%" : "60%",
          }}>
          {/* 3D Model Showcase - Bên trái */}
          <div style={{
            ...styles.modelContainer,
            height: isMobile ? "400px" : "500px",
          }}>
            <div style={styles.modelWrapper}>
              {/* 3D Model */}
              <GundamScene3D 
                style={styles.scene3D}
                modelPath={activeModel.modelPath}
                config={activeModel.config}
              />
              
              {/* Detail Points */}
              {activeModel.details.map((detail, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.detailPoint,
                    left: `${detail.position.x}%`,
                    top: `${detail.position.y}%`,
                    transform: `translate(-50%, -50%) scale(${activeDetailIndex === index ? 1.2 : 1})`,
                    backgroundColor: activeDetailIndex === index ? "#2563eb" : "#fff",
                    borderColor: activeDetailIndex === index ? "#2563eb" : "#cbd5e1",
                  }}
                  onClick={() => setActiveDetailIndex(activeDetailIndex === index ? null : index)}
                >
                  <span style={{
                    ...styles.detailPointNumber,
                    color: activeDetailIndex === index ? "#fff" : "#2563eb",
                  }}>
                    {index + 1}
                  </span>
                  
                  {/* Tooltip */}
                  {activeDetailIndex === index && (
                    <div style={styles.tooltip}>
                      <div style={styles.tooltipLabel}>{detail.label}</div>
                      <div style={styles.tooltipValue}>{detail.value}</div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Model Info Overlay */}
              <div style={{
                ...styles.modelInfo,
                bottom: isMobile ? "16px" : "24px",
                left: isMobile ? "16px" : "24px",
              }}>
                <h3 style={styles.modelName}>{activeModel.name}</h3>
                <p style={styles.modelCategory}>{activeModel.category}</p>
              </div>
            </div>
          </div>
          {/* Category Link Button - Đặt ngay dưới modelWrapper */}
          <div style={styles.bottomButtonContainer}>
              <a
                href={activeModel.categoryLink}
                style={styles.categoryLinkButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                🔍 Khám phá tất cả {activeModel.category}
              </a>
            </div>
          </div>

          {/* Controls & Details - Bên phải */}
          <div style={{
            ...styles.controlsContainer,
            width: isMobile ? "100%" : "40%",
          }}>
            {/* Model Description */}
            <div style={styles.descriptionCard}>
              <h4 style={styles.descriptionTitle}>Mô tả chi tiết</h4>
              <p style={styles.descriptionText}>{activeModel.description}</p>
              
              {/* Specs Grid */}
              <div style={styles.specsGrid}>
                <div style={styles.specItem}>
                  <span style={styles.specLabel}>Chiều cao:</span>
                  <span style={styles.specValue}>{activeModel.specs.height}</span>
                </div>
                <div style={styles.specItem}>
                  <span style={styles.specLabel}>Chi tiết:</span>
                  <span style={styles.specValue}>{activeModel.specs.detailLevel}</span>
                </div>
                <div style={styles.specItem}>
                  <span style={styles.specLabel}>Độ khó:</span>
                  <span style={styles.specValue}>{activeModel.specs.difficulty}</span>
                </div>
                <div style={styles.specItem}>
                  <span style={styles.specLabel}>Khớp nối:</span>
                  <span style={styles.specValue}>{activeModel.specs.articulation}</span>
                </div>
              </div>
            </div>

            {/* Detail Legend */}
            <div style={styles.detailLegend}>
              <h4 style={styles.legendTitle}>Chi tiết kỹ thuật</h4>
              <div style={styles.legendList}>
                {activeModel.details.map((detail, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.legendItem,
                      backgroundColor: activeDetailIndex === index ? "#eff6ff" : "transparent",
                    }}
                    onClick={() => setActiveDetailIndex(activeDetailIndex === index ? null : index)}
                  >
                    <span style={styles.legendNumber}>{index + 1}</span>
                    <div style={styles.legendContent}>
                      <span style={styles.legendLabel}>{detail.label}</span>
                      <span style={styles.legendValue}>{detail.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "64px 0",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "48px",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#111827",
  },
  subtitle: {
    fontSize: "18px",
    color: "#6b7280",
    maxWidth: "600px",
    margin: "0 auto",
  },
  categoryButtons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryButton: {
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    outline: "none",
    border: "2px solid",
  },
  content: {
    display: "flex",
    alignItems: "flex-start",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column" as const,
  },
  modelContainer: {
    position: "relative" as const,
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  modelWrapper: {
    position: "relative" as const,
    width: "100%",
    height: "100%",
    // Background cố định với gradient và pattern
    background: `
      linear-gradient(135deg, rgba(16, 26, 43, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%),
      radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
      linear-gradient(45deg, #f8fafc 25%, transparent 25%),
      linear-gradient(-45deg, #f8fafc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #f1f5f9 75%),
      linear-gradient(-45deg, transparent 75%, #f1f5f9 75%)
    `,
    backgroundSize: "100% 100%, 400px 400px, 300px 300px, 20px 20px, 20px 20px, 20px 20px, 20px 20px",
    backgroundPosition: "0 0, 0 0, 100% 100%, 0 0, 10px 0, 0 10px, 10px 10px",
  },
  scene3D: {
    width: "100%",
    height: "100%",
  },
  detailPoint: {
    position: "absolute" as const,
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "2px solid",
    cursor: "pointer",
    transition: "all 0.3s ease",
    zIndex: 10,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  detailPointNumber: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  tooltip: {
    position: "absolute" as const,
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#1f2937",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "8px",
    whiteSpace: "nowrap" as const,
    fontSize: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    zIndex: 11,
  },
  tooltipLabel: {
    fontWeight: "bold",
    marginBottom: "2px",
  },
  tooltipValue: {
    opacity: 0.9,
  },
  modelInfo: {
    position: "absolute" as const,
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(8px)",
    padding: "16px 20px",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  },
  modelName: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 4px 0",
    color: "#111827",
  },
  modelCategory: {
    fontSize: "14px",
    margin: 0,
    color: "#6b7280",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
  },
  controlsContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },
  descriptionCard: {
    background: "#fff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },
  descriptionTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#111827",
  },
  descriptionText: {
    fontSize: "15px",
    lineHeight: 1.6,
    color: "#4b5563",
    marginBottom: "20px",
  },
  specsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  specItem: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
  },
  specLabel: {
    fontSize: "12px",
    color: "#6b7280",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
  },
  specValue: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
  },
  detailLegend: {
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },
  legendTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#111827",
  },
  legendList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  legendNumber: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
    flexShrink: 0,
  },
  legendContent: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "2px",
  },
  legendLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
  },
  legendValue: {
    fontSize: "13px",
    color: "#6b7280",
  },
  bottomButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },
  categoryLinkButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "16px 32px",
    background: "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    boxShadow: "0 4px 16px rgba(37, 99, 235, 0.3)",
    transition: "all 0.3s ease",
    border: "none",
    cursor: "pointer",
  },
};