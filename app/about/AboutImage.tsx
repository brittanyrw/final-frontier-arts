'use client'

import Image from 'next/image';
import GameOverlay from '@/components/game/GameOverlay';
import { Space_Mono } from 'next/font/google'
import styles from './aboutImage.module.css'

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin']
})

interface AboutImageProps {
  image: {
    url: string;
    width: number;
    height: number;
  };
  name: string;
}

export default function AboutImage({ image, name }: AboutImageProps) {
  return (
    <>
      <div 
        className={styles.container}
        onClick={() => {
          document.getElementById('game-overlay')?.classList.remove('hidden');
        }}
      >
        {image && (
          <div className={styles.imageContainer}>
            <Image
              src={image.url}
              alt={name}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            <div className={styles.secureTag}>
              SECURE FILE
            </div>
          </div>
        )}
        
        <div className={styles.hoverOverlay}>
          <div className={styles.statusIndicator}></div>
          <p className={`${spaceMono.className} ${styles.alertText}`}>
            ANOMALY DETECTED
          </p>
          <p className={styles.instructionText}>
            Click to investigate
          </p>
        </div>
      </div>

      <GameOverlay />
    </>
  );
}