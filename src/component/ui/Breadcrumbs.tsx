import React from 'react';
import { useRouter } from 'next/navigation';
import { Fontdiner_Swanky } from 'next/font/google';

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
          <button
            style={styles.link}
            onClick={() => handleClick(item.href!)}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#000';
            }}
          >
            {item.label}
          </button>
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
    fontSize: '13.5px',
    color: '#444',
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: 'rgb(0, 20, 84)',
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    fontSize: 'inherit',
    transition: 'color 0.2s ease',
    fontWeight: '500',
  },
  divider: {
    color: '#888',
    margin: '0 4px',
  },
};