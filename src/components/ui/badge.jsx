import React from 'react';

export function Badge({ children, className = '', variant = 'default', ...props }) {
  const base = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium';
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    secondary: 'bg-gray-200 text-gray-900',
    outline: 'border border-gray-200 text-gray-800',
  };
  return (
    <span className={`${base} ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </span>
  );
}

export default Badge;
