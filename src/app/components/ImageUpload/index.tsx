'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import styles from './ImageUpload.module.css';
import Button from '../Button';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

export default function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor="poster-upload" className={styles.uploadArea}>
        {previewUrl ? (
          <div className={styles.preview}>
            <Image src={previewUrl} alt="Selected poster" fill style={{ objectFit: 'cover' }} />
          </div>
        ) : (
          <>
            <Image src="/icons/image-fill.svg" alt="Upload icon" width={48} height={48} className={styles.icon} />
            <span className={styles.text}>Upload your poster</span>
          </>
        )}
        <input type="file" id="poster-upload" accept="image/*" onChange={handleImageChange} className={styles.input} />
      </label>
      <div className={styles.buttonContainer}>
        <Button type="submit">Send poster</Button>
      </div>
    </div>
  );
}
