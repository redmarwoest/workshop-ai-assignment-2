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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedImage || !teamName) {
      alert('Please provide both a team name and an image');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('teamName', teamName);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      await response.json();
      alert('Upload successful!');
      // Reset form
      setTeamName('');
      setSelectedImage(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <TeamNameInput value={teamName} onChange={setTeamName} placeholder="Enter your team name" />
          <ImageUpload onImageSelect={handleImageSelect} />
        </form>
      </main>
    </div>
  );
}
