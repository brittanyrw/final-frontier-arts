'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './masterpiece.module.css'

export default function SecretMasterpiece() {
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        {!isRevealed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.initialSection}
          >
            <h1 className={styles.title}>The Final Masterpiece</h1>
            <p className={styles.intro}>
              You have proven yourself worthy by finding our newest treasured work.
              Are you prepared for what you are about to see?
            </p>
            <button
              onClick={() => setIsRevealed(true)}
              className={styles.revealButton}
            >
              Reveal the Masterpiece
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <div className={styles.artworkSection}>
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1.5 }}
                  className={styles.artworkFrame}
                >
                  <div className={styles.lighting}></div>
                  
                  <div className={styles.artwork}>
                    <div className={styles.artworkInner}>
                      <Image
                        src="/kitten.jpg"
                        alt="Victor Lark's Ultimate Masterpiece"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2 }}
                  className={styles.artworkDetails}
                >
                  <h2 className={styles.artworkTitle}>"Space Cat"</h2>
                

                  <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={styles.description}
                      >
                        <p className={styles.descriptionText}>
                          In this unexpected piece, Nova playfully challenges our space expectations. Like a cat that somehow wandered into Mission Control, this cosmic kitten becomes a commentary on finding the familiar among the stars.
                        </p>
                        <p className={styles.attribution}>
                          - From the personal collection of Olivia Nova
                        </p>
                      </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}