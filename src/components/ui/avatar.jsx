import React from 'react';

export function Avatar({ children, className = '', ...props }) {
  return (
    <div className={`inline-flex items-center justify-center overflow-hidden rounded-full bg-muted ${className}`} {...props}>
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt, className = '', ...props }) {
  return (
    <img src={src} alt={alt} className={`object-cover w-full h-full ${className}`} {...props} />
  );
}

export function AvatarFallback({ children, className = '', ...props }) {
  return (
    <div className={`flex items-center justify-center w-full h-full text-sm font-medium text-white bg-gray-500 ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Avatar;
