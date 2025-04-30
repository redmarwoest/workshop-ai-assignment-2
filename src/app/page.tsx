'use client';

import { useState } from 'react';
import styles from './page.module.css';
import TeamNameInput from './components/TeamNameInput';
import ImageUpload from './components/ImageUpload';

export default function Home() {
  const [teamName, setTeamName] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <TeamNameInput value={teamName} onChange={setTeamName} placeholder="Enter your team name" />
        <ImageUpload onImageSelect={handleImageSelect} />
      </main>
    </div>
  );
}
