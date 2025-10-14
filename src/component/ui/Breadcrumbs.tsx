import React from 'react';
import { useRouter } from 'next/navigation';
import { useResponsive } from '@/hooks/useResponsive';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const router = useRouter();
  const { isMobile, isTablet } = useResponsive();

  const handleClick = (href: string) => {
    router.push(href);
  };

  // Truncate text for mobile
  const truncateLabel = (label: string, maxLength: number) => {
    if (label.length <= maxLength) return label;
    return label.substring(0, maxLength) + '...';
  };

  // Get responsive config
  const getConfig = () => {
    if (isMobile) {
      return {
        maxItems: 3, // Chỉ hiển thị tối đa 3 items trên mobile
        maxLabelLength: 15, // Giới hạn độ dài text
        fontSize: '14px',
        containerPadding: '8px 0',
        dividerMargin: '0 3px',
        showEllipsis: true,
      };
    } else if (isTablet) {
      return {
        maxItems: 4, // Hiển thị tối đa 4 items trên tablet
        maxLabelLength: 30,
        fontSize: '14px',
        containerPadding: '10px 0',
        dividerMargin: '0 4px',
        showEllipsis: false,
      };
    } else {
      return {
        maxItems: items.length, // Hiển thị tất cả trên desktop
        maxLabelLength: 50,
        fontSize: '15px',
        containerPadding: '12px 0',
        dividerMargin: '0 4px',
        showEllipsis: false,
      };
    }
  };

  const config = getConfig();

  // Process items for responsive display
  const getDisplayItems = () => {
    if (!config.showEllipsis || items.length <= config.maxItems) {
      return items;
    }

    // Mobile/Tablet: Show first item + ellipsis + last 2 items
    if (items.length > config.maxItems) {
      const firstItem = items[0];
      const lastItems = items.slice(-2);
      
      return [
        firstItem,
        { label: '...', href: undefined }, // Ellipsis item
        ...lastItems,
      ];
    }

    return items;
  };

  const displayItems = getDisplayItems();

  return (
    <nav style={{
      ...styles.container,
      fontSize: config.fontSize,
      padding: config.containerPadding,
      flexWrap: isMobile ? 'wrap' : 'nowrap',
      overflow: isMobile ? 'hidden' : 'visible',
    }}>
      {displayItems.map((item, index) => (
        <span 
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: isMobile ? 1 : 0,
            minWidth: 0, // Allow text truncation
          }}
        >
          {item.href ? (
            <button
              style={{
                ...styles.link,
                fontSize: config.fontSize,
                padding: isMobile ? '4px 2px' : '4px 0',
                minHeight: isMobile ? '32px' : 'auto', // Touch-friendly height
                display: 'flex',
                alignItems: 'center',
                maxWidth: isMobile ? 'auto' : 'none', // Limit width on mobile
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              onClick={() => handleClick(item.href!)}
              onMouseEnter={(e) => {
                if (!isMobile) { // Disable hover on mobile
                  e.currentTarget.style.color = '#3b82f6';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.color = 'rgb(0, 20, 84)';
                }
              }}
              // Touch feedback for mobile
              onTouchStart={(e) => {
                if (isMobile) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onTouchEnd={(e) => {
                if (isMobile) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {truncateLabel(item.label, config.maxLabelLength)}
            </button>
          ) : (
            // Ellipsis item (không clickable)
            <span style={{
              ...styles.ellipsis,
              fontSize: config.fontSize,
              padding: isMobile ? '4px 2px' : '4px 0',
            }}>
              {item.label}
            </span>
          )}
          
          {index < displayItems.length - 1 && (
            <span style={{
              ...styles.divider,
              margin: config.dividerMargin,
              fontSize: config.fontSize,
            }}>
              /
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

const styles = {
  container: {
    color: '#444',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  link: {
    color: 'rgb(0, 20, 84)',
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    margin: 0,
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    fontWeight: '500',
    borderRadius: '4px', // For touch feedback
  },
  ellipsis: {
    color: '#888',
    fontWeight: '400',
    cursor: 'default',
    userSelect: 'none' as const,
  },
  divider: {
    color: '#888',
    fontWeight: '300',
    flexShrink: 0, // Prevent divider from shrinking
  },
};

// CSS cho responsive behavior
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    /* Responsive breakpoints */
    @media (max-width: 480px) {
      .breadcrumb-container {
        font-size: 11px !important;
      }
      
      .breadcrumb-link {
        padding: 6px 4px !important;
        min-height: 36px !important;
      }
    }
    
    @media (max-width: 768px) {
      .breadcrumb-container {
        overflow-x: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      .breadcrumb-container::-webkit-scrollbar {
        display: none;
      }
      
      .breadcrumb-link:active {
        background-color: #e5e7eb !important;
        transform: scale(0.98);
      }
    }
    
    /* Hover effects only on non-touch devices */
    @media (hover: hover) and (pointer: fine) {
      .breadcrumb-link:hover {
        background-color: #f8fafc;
        color: #3b82f6 !important;
      }
    }
    
    /* Focus styles for accessibility */
    .breadcrumb-link:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
    
    /* Smooth transitions */
    .breadcrumb-link {
      transition: all 0.2s ease !important;
    }
  `;
  document.head.appendChild(style);
}