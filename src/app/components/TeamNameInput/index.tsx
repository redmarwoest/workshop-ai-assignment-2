'use client';

import type { ChangeEvent } from 'react';
import styles from './TeamNameInput.module.css';

interface TeamNameInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TeamNameInput({ value, onChange, placeholder = 'Placeholder' }: TeamNameInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="teamName" className={styles.label}>
        Team Name
      </label>
      <input
        type="text"
        id="teamName"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
}
