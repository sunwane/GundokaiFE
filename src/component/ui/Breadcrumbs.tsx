import React from 'react';
import { useRouter } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const router = useRouter();

  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <nav style={styles.container}>
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            <button
              style={styles.link}
              onClick={() => handleClick(item.href!)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#1e40af';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#3b82f6';
              }}
            >
              {item.label}
            </button>
          ) : (
            <span style={styles.current}>{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span style={styles.divider}> / </span>
          )}
        </span>
      ))}
    </nav>
  );
}

const styles = {
  container: {
    padding: '16px 5vw 0 5vw',
    fontSize: '13px',
    color: '#444',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    fontSize: 'inherit',
    transition: 'color 0.2s ease',
  },
  current: {
    color: '#222',
    fontWeight: 'bold',
  },
  divider: {
    color: '#888',
    margin: '0 4px',
  },
};