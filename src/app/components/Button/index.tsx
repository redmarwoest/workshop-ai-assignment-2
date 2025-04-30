'use client';

import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className || ''}`} {...props}>
      {children}
    </button>
  );
}
