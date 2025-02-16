import { getBio } from '@/lib/api';
import AboutImage from './AboutImage';
import { Space_Mono } from 'next/font/google'
import styles from './about.module.css'

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin']
})

export default async function AboutPage() {
  const bio = await getBio();
  
  if (!bio) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.errorContainer}>
            <div className={styles.titleWrapper}>
              <span className={styles.statusIndicator}></span>
              <h1 className={`${spaceMono.className} ${styles.errorTitle}`}>
                ERROR: PERSONNEL FILE NOT FOUND
              </h1>
            </div>
            <p className={styles.errorMessage}>
              SYSTEM ERROR: Bio data missing from Contentful database.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <span className={styles.statusIndicator}></span>
              <h1 className={`${spaceMono.className} ${styles.title}`}>
                MISSION CONTROL
              </h1>
            </div>
            <div className={styles.subtitle}>
              PERSONNEL FILE: {bio?.name || 'Victor Lark'}
            </div>
          </div>
          
          <div className={styles.grid}>
            <div className={styles.imageSection}>
              {bio?.image && (
                <AboutImage image={bio.image} name={bio?.name || 'Victor Lark'} />
              )}
              <div className={styles.classifiedTag}>
                <span className={styles.classifiedDot}></span>
                CLASSIFIED CONTENT DETECTED
              </div>
            </div>

            <div className={styles.bioSection}>
              {bio?.description ? (
                <div className={styles.bioText}>
                  {bio.description}
                </div>
              ) : (
                <p className={styles.bioText}>
                  PERSONNEL DATA NOT FOUND IN DATABASE
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}