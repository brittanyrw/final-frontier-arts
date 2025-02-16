'use client'

import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { motion } from 'framer-motion'
import { Space_Mono } from 'next/font/google'
import styles from './exhibitionContent.module.css'

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin']
})

interface ExhibitionContentProps {
  exhibition: any;
}

export default function ExhibitionContent({ exhibition }: ExhibitionContentProps) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.categoryWrapper}
        >
          <span className={styles.statusIndicator}></span>
          <div className={`${spaceMono.className} ${styles.category}`}>
            Exhibition File
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${spaceMono.className} ${styles.title}`}
        >
          {exhibition.name}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={styles.details}
        >
          <div className={styles.deploymentDate}>
            DEPLOYMENT DATE: {new Date(exhibition.startDate).toLocaleDateString('en-US', { 
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          <div className={styles.missionInfo}>
            <div className={styles.missionCommand}>EXHIBITION COMMAND</div>
            <div className={styles.commander}>{exhibition.artist.name.toUpperCase()}</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={styles.description}
        >
          <div className={styles.descriptionText}>
            {documentToReactComponents(exhibition.description.json)}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={styles.artifactsSection}
        >
          <div className={styles.sectionHeader}>
            <div className={styles.headerTitle}>
              <span className={styles.statusIndicator}></span>
              <h2 className={`${spaceMono.className} ${styles.title}`}>
                EXHIBITION ARTIFACTS
              </h2>
            </div>
            <div className={styles.headerLine}></div>
          </div>
          
          <div className={styles.artifactsGrid}>
            {exhibition.artworksCollection.items.map((artwork: any, index: number) => (
              <motion.div 
                key={artwork.name}
                className={`${styles.artworkContainer} ${
                  index === 0 ? styles.firstArtwork : 
                  index === 1 ? styles.secondArtwork : styles.thirdArtwork
                }`}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={artwork.image.url}
                    alt={artwork.name}
                    fill
                    className={styles.image}
                  />
                  <div className={styles.imageOverlay} />
                </div>
                <p className={styles.artworkTitle}>
                  {artwork.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}