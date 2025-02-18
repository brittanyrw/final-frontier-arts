"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Space_Mono } from "next/font/google";
import styles from "./gameOverlay.module.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const CommandMessage = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.commandOverlay}
    >
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.messageContainer}
        >
          <div className={styles.content}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={styles.statusHeader}
            >
              <div className={styles.statusText}>
                <span className={styles.statusIndicator}></span>
                TRANSMISSION STATUS: ACTIVE
              </div>
            </motion.div>

            <motion.div className={styles.messageBody}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`${spaceMono.className} ${styles.messageTitle}`}
              >
                MISSION DIRECTIVE
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className={styles.messageText}
              >
                <div className={styles.sender}>
                  <span>&#9654;</span>
                  <p>FROM: EXECUIVE DIRECTOR NOVA</p>
                </div>

                <p>ATTENTION CREW</p>
                <p>
                  {" "}
                  Final Frontier Arts needs your help! The official announcement webpage of the next masterpiece being added to the gallery has gone missing. And trust us, this is no ordinary artwork, it is a <span>VERY IMPORTANT AND EXTREMELY SPECIAL PIECE OF ART.</span>
                </p>
                <p>
                  Unfortunately, standard search methods have failed. The only way to recover the lost page is by accessing <span>Contentful Mission Control (aka our Contentful space)</span> and decoding the clues left behind.
                </p>
                <p>YOUR MISSION:</p>
                <ul>
                  <li>
                    Search the system for <span>hidden codes</span> embedded in the gallery's
                    digital archives.
                  </li>
                  <li>
                    Navigate Contentful's <span>data structures</span> to uncover anomalies.
                  </li>
                  <li>
                    Use your expertise in content operations to reconstruct <span>the path to the missing page</span>.
                  </li>
                </ul>
                <p>
                  Your first clue is waiting. Proceed with caution. The fate of the gallery is in your hands!
                </p>

                <div className={styles.sender}>
                  <span>&#9654;</span>
                  <p>PROCEED WITH MISSION?</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className={styles.buttonContainer}
            >
              <button
                onClick={() => {
                  router.push("/clue");
                  onClose();
                }}
                className={`${styles.button} ${styles.confirmButton}`}
              >
                CONFIRM
              </button>
              <button
                onClick={onClose}
                className={`${styles.button} ${styles.cancelButton}`}
              >
                NEGATIVE
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function GameOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCommandMessage, setShowCommandMessage] = useState(false);

  useEffect(() => {
    const overlay = document.getElementById("game-overlay");
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          setIsVisible(!overlay?.classList.contains("hidden"));
        }
      });
    });

    if (overlay) {
      observer.observe(overlay, { attributes: true });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div id="game-overlay" className="hidden">
      <AnimatePresence>
        {isVisible && (
          <>
            {showCommandMessage ? (
              <CommandMessage
                onClose={() => {
                  setShowCommandMessage(false);
                  document
                    .getElementById("game-overlay")
                    ?.classList.add("hidden");
                }}
              />
            ) : (
              <div
                className={styles.backdrop}
                onClick={() => setShowCommandMessage(true)}
              >
                <div className={styles.initialMessage}>
                  <div className={styles.statusIndicator}></div>
                  <h2
                    className={`${spaceMono.className} ${styles.initialTitle}`}
                  >
                    SIGNAL DETECTED
                  </h2>
                  <p className={styles.initialText}>
                    Unauthorized transmission intercepted... Click to decode.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
