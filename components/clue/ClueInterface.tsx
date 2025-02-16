'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Space_Mono } from 'next/font/google'
import styles from './clueInterface.module.css'

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin']
})

interface Clue {
  clueNumber: number
  clueTitle: string
  clueDescription: string
  hint: string
  clueCode: string
}

interface ClueVerificationProps {
  clueNumber: number
  clueCode: string
  hint: string
  onStatusChange: (clueNumber: number, isCorrect: boolean) => void
}

function ClueVerification({ clueNumber, clueCode, hint, onStatusChange }: ClueVerificationProps) {
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showHint, setShowHint] = useState(false)

  const handleVerify = () => {
    const isCorrect = input.toUpperCase() === clueCode.toUpperCase()
    setStatus(isCorrect ? 'success' : 'error')
    onStatusChange(clueNumber, isCorrect)
    if (!isCorrect) {
      setTimeout(() => setStatus('idle'), 2000)
    }
  }

  return (
    <div className={styles.verificationWrapper}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ENTER SEQUENCE"
          className={styles.sequenceInput}
        />
        <button
          onClick={handleVerify}
          className={styles.verifyButton}
        >
          Verify
        </button>
        {status !== 'idle' && (
          <div className={`${styles.statusMessage} ${
            status === 'success' ? styles.statusSuccess : styles.statusError
          }`}>
            {status === 'success' ? '>> CONFIRMED' : '>> ERROR'}
          </div>
        )}
      </div>

      <div className={styles.hintSection}>
        <button
          onClick={() => setShowHint(!showHint)}
          className={styles.hintButton}
        >
          <span className={styles.hintIndicator}></span>
          REQUEST ASSISTANCE
        </button>
        
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={styles.hintContent}
          >
            <p className={styles.hintText}>{hint}</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

interface ClueInterfaceProps {
  clues: Clue[]
}

export default function ClueInterface({ clues }: ClueInterfaceProps) {
  const [verifiedClues, setVerifiedClues] = useState<{ [key: number]: boolean }>({})
  const [allCluesVerified, setAllCluesVerified] = useState(false)

  const handleClueStatusChange = (clueNumber: number, isCorrect: boolean) => {
    setVerifiedClues(prev => ({
      ...prev,
      [clueNumber]: isCorrect
    }))
  }

  useEffect(() => {
    if (clues.length > 0) {
      const allVerified = clues.every(clue => verifiedClues[clue.clueNumber])
      setAllCluesVerified(allVerified)
    }
  }, [verifiedClues, clues])

  const finalCode = clues.map(clue => clue.clueCode).join('')

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.statusIndicator}></div>
          <h1 className={`${spaceMono.className} ${styles.title}`}>
            MISSION OBJECTIVES
          </h1>
          <p className={styles.subtitle}>
            DECODE SEQUENCE MARKERS TO ACCESS SECURE ARTWORK DATA
          </p>
        </div>

        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine} />

          <div className={styles.timelineContent}>
            {clues.map((clue) => (
              <motion.div
                key={clue.clueNumber}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: clue.clueNumber * 0.1 }}
                className={styles.clueItem}
              >
                <div className={`${styles.timelineMarker} ${
                  verifiedClues[clue.clueNumber] ? styles.markerVerified : styles.markerPending
                }`}>
                  {clue.clueNumber}
                </div>

                <div className={styles.clueContent}>
                  <h2 className={`${spaceMono.className} ${styles.clueTitle}`}>
                    {clue.clueTitle}
                  </h2>
                  <p className={styles.clueDescription}>
                    {clue.clueDescription}
                  </p>
                  <ClueVerification 
                    clueNumber={clue.clueNumber}
                    clueCode={clue.clueCode}
                    hint={clue.hint}
                    onStatusChange={handleClueStatusChange}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {allCluesVerified && clues.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.completionSection}
          >
            <h2 className={`${spaceMono.className} ${styles.completionTitle}`}>
              SEQUENCE VERIFICATION COMPLETE
            </h2>
            <div className={styles.codeDisplay}>
              <code className={styles.codeText}>
                {finalCode}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(finalCode)}
                className={styles.copyButton}
              >
                COPY CODE
              </button>
            </div>
            <p className={styles.completionStatus}>
              STANDBY FOR FINAL SEQUENCE VALIDATION...
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={styles.instructions}
        >
          <p>
            ENTER VERIFICATION CODES AT EACH CHECKPOINT TO PROCEED
          </p>
        </motion.div>
      </div>
    </div>
  )
}