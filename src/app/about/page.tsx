import PageHeader from "@/component/layout/header/PageHeader";
import Footer from "@/component/layout/footer/Footer";

interface TeamMember {
  name: string;
  role: string;
  department: string;
  avatar: string;
  description: string;
  github?: string;
}

export default function About() {
  const teamMembers: TeamMember[] = [
    {
      name: "Vũ Hoàng Quân",
      role: "Backend Developer",
      department: "BE",
      avatar: "👨‍💻",
      description: "Phát triển và maintain hệ thống backend, API services",
      github: "https://github.com/Hiuth"
    },
    {
      name: "Đỗ Thanh Hòa", 
      role: "Backend Developer",
      department: "BE",
      avatar: "🧑‍💻",
      description: "Phát triển database, tối ưu hóa hiệu suất hệ thống",
      github: "https://github.com/thanhhoaisme"
    },
    {
      name: "Nguyễn Việt Dũng",
      role: "Backend Developer", 
      department: "BE",
      avatar: "👨‍💼",
      description: "Xây dựng architecture, security và deployment",
      github: "https://github.com/Wjndz"
    },
    {
      name: "Âu Xuân Hoa",
      role: "Frontend Developer",
      department: "FE",
      avatar: "👩‍💻", 
      description: "Phát triển giao diện người dùng, UX/UI implementation",
      github: "https://github.com/sunwane"
    },
    {
      name: "Nguyễn Huỳnh Quốc Tuấn",
      role: "Frontend Developer",
      department: "FE Admin",
      avatar: "👨‍🔧",
      description: "Phát triển giao diện dashboard admin, quản lý hệ thống dữ liệu nhập xuất",
      github: "https://github.com/QuocTuan1432004"
    }
  ];

  const getDepartmentColor = (dept: string) => {
    switch (dept) {
      case 'BE': return { 
        bg: '#e3f2fd', 
        text: '#1565c0', 
        border: '#2196f3' 
      };
      case 'FE': return { 
        bg: '#ffebee', 
        text: '#c62828', 
        border: '#f44336' 
      };
      case 'FE Admin': return { 
        bg: '#f5f5f5', 
        text: '#424242', 
        border: '#757575' 
      };
      default: return { 
        bg: '#f3f4f6', 
        text: '#374151', 
        border: '#9ca3af' 
      };
    }
  };

  return (
    <div>
      <PageHeader />
      
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Gundokai Team
          </h1>
          <p style={styles.heroSubtitle}>
            Đội ngũ phát triển đầy nhiệt huyết đằng sau dự án Gundokai
          </p>
          <div style={styles.heroStats}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>5</div>
              <div style={styles.statLabel}>Thành viên</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>1</div>
              <div style={styles.statLabel}>Mục tiêu</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div style={styles.projectSection}>
        <div style={styles.container}>
          <div style={styles.projectCard}>
            <h2 style={styles.projectTitle}>
              🛒 Dự án Gundokai
            </h2>
            <p style={styles.projectDescription}>
              Gundokai là một nền tảng thương mại điện tử chuyên về mô hình Gundam và các sản phẩm liên quan. 
              Chúng tôi cam kết mang đến trải nghiệm mua sắm tuyệt vời nhất cho cộng đồng yêu thích Gundam.
            </p>
            <div style={styles.techStack}>
              <span style={styles.techTagBlue}>React</span>
              <span style={styles.techTagRed}>Next.js</span>
              <span style={styles.techTagBlack}>TypeScript</span>
              <span style={styles.techTagBlue}>Spring Boot</span>
              <span style={styles.techTagRed}>MySQL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div style={styles.teamSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Đội Ngũ Phát Triển
            </h2>
            <p style={styles.sectionSubtitle}>
              Những con người tài năng đã cùng nhau xây dựng nên Gundokai
            </p>
          </div>

          <div style={styles.teamGrid}>
            {teamMembers.map((member, index) => {
              const colors = getDepartmentColor(member.department);
              return (
                <div key={index} style={styles.memberCard}>
                  <div style={styles.memberHeader}>
                    <div style={styles.memberAvatar}>
                      {member.avatar}
                    </div>
                    <div style={styles.memberInfo}>
                      <h3 style={styles.memberName}>{member.name}</h3>
                      <p style={styles.memberRole}>{member.role}</p>
                      <span 
                        style={{
                          ...styles.departmentBadge,
                          backgroundColor: colors.bg,
                          color: colors.text,
                          borderColor: colors.border,
                        }}
                      >
                        {member.department}
                      </span>
                    </div>
                  </div>
                  <p style={styles.memberDescription}>
                    {member.description}
                  </p>
                  
                  {/* GitHub Link */}
                  {member.github && (
                    <div style={styles.githubSection}>
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={styles.githubLink}
                      >
                        <span style={styles.githubIcon}>🔗</span>
                        <span>GitHub Profile</span>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div style={styles.contactSection}>
        <div style={styles.container}>
          <div style={styles.contactCard}>
            <h2 style={styles.contactTitle}>
              Liên Hệ
            </h2>
            <p style={styles.contactDescription}>
              Cảm ơn bạn đã quan tâm đến dự án của chúng tôi. Nếu có bất kỳ câu hỏi nào, 
              đừng ngần ngại liên hệ với đội ngũ phát triển.
            </p>
            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>🏫</span>
                <span style={styles.contactText}>Đại học Giao thông Vận tải TP.HCM</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📧</span>
                <span style={styles.contactText}>info@gundokai.com</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>🌟</span>
                <span style={styles.contactText}>Dự án môn Thương mại điện tử</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  // Hero Section - Responsive
  heroSection: {
    backgroundImage: 'url("/images/backgrounds/gundambackground.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center 80%',
    backgroundAttachment: 'fixed',
    textAlign: 'center' as const,
    height: '105vh',
    minHeight: '600px', // Minimum height cho mobile
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  heroOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(220, 38, 38, 0.6) 100%)',
    zIndex: 1,
  },
  
  heroContent: {
    position: 'relative' as const,
    zIndex: 2,
    margin: '0 auto',
    padding: '0 20px',
    color: '#ffffff',
    width: '100%',
  },
  
  heroTitle: {
    fontSize: 'clamp(32px, 5vw, 72px)', // Responsive font size
    fontWeight: '900',
    marginBottom: 'clamp(16px, 2vw, 20px)',
    letterSpacing: 'clamp(1px, 0.5vw, 4px)',
    color: '#ffffff',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(37, 99, 235, 0.5)',
    animation: 'glow 2s ease-in-out infinite alternate',
    wordBreak: 'break-word' as const,
  },
  
  heroSubtitle: {
    fontSize: 'clamp(16px, 4vw, 24px)',
    marginBottom: 'clamp(30px, 5vw, 50px)',
    color: '#e0e7ff',
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
    fontWeight: '500',
    margin: '0 auto clamp(30px, 5vw, 50px) auto',
  },
  
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(20px, 5vw, 50px)',
    marginTop: 'clamp(40px, 8vw, 60px)',
    flexWrap: 'wrap' as const,
    padding: '0 10px',
  },
  
  statItem: {
    textAlign: 'center' as const,
    padding: 'clamp(20px, 4vw, 30px) clamp(15px, 3vw, 25px)',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(12px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    minWidth: 'clamp(100px, 25vw, 120px)',
    flex: '1',
    maxWidth: '200px',
  },
  
  statNumber: {
    fontSize: 'clamp(28px, 6vw, 48px)',
    fontWeight: '900',
    color: 'rgb(246, 195, 40)',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
    letterSpacing: '2px',
  },
  
  statLabel: {
    fontSize: 'clamp(12px, 2.5vw, 16px)',
    color: '#e0e7ff',
    marginTop: '8px',
    fontWeight: '600',
    letterSpacing: '1px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
  },

  // Project Section - Responsive
  projectSection: {
    padding: 'clamp(60px, 10vw, 100px) 0',
    background: 'linear-gradient(135deg,rgb(228, 228rgb(239, 239, 239)%, #f6f6f6 100%)',
  },
  
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 clamp(15px, 3vw, 20px)',
  },
  
  projectCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: 'clamp(24px, 5vw, 40px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as const,
    border: '1px solid #f87171',
  },
  
  projectTitle: {
    fontSize: 'clamp(24px, 5vw, 32px)',
    fontWeight: 'bold',
    marginBottom: 'clamp(16px, 3vw, 20px)',
    color: '#dc2626',
    lineHeight: 1.2,
  },
  
  projectDescription: {
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    color: '#6b7280',
    lineHeight: 1.7,
    marginBottom: 'clamp(24px, 4vw, 30px)',
    maxWidth: '700px',
    margin: '0 auto clamp(24px, 4vw, 30px) auto',
  },
  
  techStack: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(8px, 2vw, 12px)',
    flexWrap: 'wrap' as const,
  },
  
  techTagBlue: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 2.5vw, 16px)',
    borderRadius: '20px',
    fontSize: 'clamp(12px, 2vw, 14px)',
    fontWeight: '600',
    margin: '2px',
  },
  
  techTagRed: {
    backgroundColor: '#dc2626',
    color: '#ffffff',
    padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 2.5vw, 16px)',
    borderRadius: '20px',
    fontSize: 'clamp(12px, 2vw, 14px)',
    fontWeight: '600',
    margin: '2px',
  },
  
  techTagBlack: {
    backgroundColor: '#1f2937',
    color: '#ffffff',
    padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 2.5vw, 16px)',
    borderRadius: '20px',
    fontSize: 'clamp(12px, 2vw, 14px)',
    fontWeight: '600',
    margin: '2px',
  },

  // Team Section - Responsive
  teamSection: {
    padding: 'clamp(60px, 10vw, 80px) 0',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  },
  
  sectionHeader: {
    textAlign: 'center' as const,
    marginBottom: 'clamp(40px, 8vw, 60px)',
    padding: '0 15px',
  },
  
  sectionTitle: {
    fontSize: 'clamp(28px, 6vw, 36px)',
    fontWeight: 'bold',
    marginBottom: 'clamp(12px, 2.5vw, 16px)',
    letterSpacing: '1px',
    color: '#1f2937',
    lineHeight: 1.2,
  },
  
  sectionSubtitle: {
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    color: '#6b7280',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'clamp(20px, 4vw, 30px)',
    padding: '0 10px',
  },
  
  memberCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: 'clamp(16px, 3vw, 24px)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  
  memberHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'clamp(12px, 2.5vw, 16px)',
    marginBottom: 'clamp(12px, 2.5vw, 16px)',
    flexWrap: 'wrap' as const,
  },
  
  memberAvatar: {
    width: 'clamp(50px, 8vw, 60px)',
    height: 'clamp(50px, 8vw, 60px)',
    borderRadius: '50%',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'clamp(20px, 4vw, 24px)',
    flexShrink: 0,
    border: '2px solid #e5e7eb',
  },
  
  memberInfo: {
    flex: 1,
    minWidth: '200px',
  },
  
  memberName: {
    fontSize: 'clamp(16px, 3vw, 20px)',
    fontWeight: 'bold',
    color: '#111827',
    margin: '0 0 4px 0',
    lineHeight: 1.2,
    wordBreak: 'break-word' as const,
  },
  
  memberRole: {
    fontSize: 'clamp(12px, 2vw, 14px)',
    color: '#6b7280',
    margin: '0 0 8px 0',
    lineHeight: 1.3,
  },
  
  departmentBadge: {
    padding: 'clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px)',
    borderRadius: '12px',
    fontSize: 'clamp(10px, 1.5vw, 12px)',
    fontWeight: '600',
    border: '1px solid',
    display: 'inline-block',
  },
  
  memberDescription: {
    fontSize: 'clamp(12px, 2vw, 14px)',
    color: '#374151',
    lineHeight: 1.6,
    margin: '0 0 clamp(12px, 2.5vw, 16px) 0',
  },
  
  githubSection: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: 'clamp(12px, 2.5vw, 16px)',
    textAlign: 'center' as const,
  },
  
  githubLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: 'clamp(8px, 1.5vw, 10px) clamp(16px, 3vw, 20px)',
    backgroundColor: '#1f2937',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '25px',
    fontSize: 'clamp(12px, 2vw, 14px)',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  },
  
  githubIcon: {
    fontSize: 'clamp(12px, 2vw, 14px)',
  },

  // Contact Section - Responsive
  contactSection: {
    padding: 'clamp(60px, 10vw, 80px) 0',
    background: 'linear-gradient(185deg, rgb(66, 98, 255) 0%, rgb(0, 0, 0) 100%)',
  },
  
  contactCard: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: '16px',
    padding: 'clamp(24px, 5vw, 40px)',
    textAlign: 'center' as const,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgb(117, 147, 255)',
  },
  
  contactTitle: {
    fontSize: 'clamp(24px, 5vw, 32px)',
    fontWeight: 'bold',
    marginBottom: 'clamp(16px, 3vw, 20px)',
    letterSpacing: '1px',
    color: 'rgb(0, 0, 0)',
    lineHeight: 1.2,
  },
  
  contactDescription: {
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    color: '#6b7280',
    lineHeight: 1.7,
    marginBottom: 'clamp(30px, 5vw, 40px)',
    maxWidth: '600px',
    margin: '0 auto clamp(30px, 5vw, 40px) auto',
  },
  
  contactInfo: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(20px, 5vw, 40px)',
    flexWrap: 'wrap' as const,
    padding: '0 10px',
  },
  
  contactItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 'clamp(6px, 1.5vw, 8px)',
    padding: 'clamp(16px, 3vw, 20px)',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    minWidth: 'clamp(150px, 25vw, 200px)',
    flex: '1',
    maxWidth: '250px',
  },
  
  contactIcon: {
    fontSize: 'clamp(20px, 4vw, 24px)',
  },
  
  contactText: {
    fontSize: 'clamp(12px, 2vw, 14px)',
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center' as const,
    lineHeight: 1.3,
    wordBreak: 'break-word' as const,
  },
};