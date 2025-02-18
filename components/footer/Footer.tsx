import Link from 'next/link'
import { Space_Mono } from 'next/font/google'
import { Exhibition } from '@/types/contentful'
import styles from './footer.module.css'

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin']
})

interface FooterProps {
  exhibitions?: Exhibition[]
}

export default function Footer({ exhibitions }: FooterProps) {
  const currentDate = new Date().toISOString()
  const upcomingExhibitions = exhibitions
    ?.filter(exhibition => exhibition.startDate > currentDate)
    ?.slice(0, 5)

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandSection}>
            <div className={styles.brandHeader}>
              <span className={styles.statusIndicator}></span>
              <h2 className={`${spaceMono.className} ${styles.brandTitle}`}>
                Final Frontier Arts
              </h2>
            </div>
            <div className={styles.systemStatus}>
              SYSTEMS ONLINE: {new Date().toLocaleDateString()}
            </div>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>ACTIVE EXHIBITIONS</h3>
            <ul className={styles.linkList}>
              {upcomingExhibitions?.map(exhibition => (
                <li key={exhibition.slug} className={styles.linkItem}>
                  <Link 
                    href={`/exhibitions/${exhibition.slug}`}
                    className={styles.link}
                  >
                    <span>→</span>
                    {exhibition.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>COMMAND CENTER</h3>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link 
                  href="/about"
                  className={styles.link}
                >
                  <span>→</span>
                  About the Director
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>SYSTEMS</h3>
            <ul className={styles.linkList}>
              <li className={styles.systemItem}>
                <span className={styles.systemDot}></span>
                Next.js
              </li>
              <li className={styles.systemItem}>
                <span className={styles.systemDot}></span>
                GraphQL
              </li>
              <li className={styles.systemItem}>
                <span className={styles.systemDot}></span>
                Contentful
              </li>
              <li className={styles.systemItem}>
                <span className={styles.systemDot}></span>
                TypeScript
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.bottomAddress}>
          </div>
          <div className={styles.bottomLinks}>
            <Link 
              href="/"
              className={styles.link}
            >
              <span>→</span>
              PRIVACY PROTOCOLS
            </Link>
            <Link 
              href="/"
              className={styles.link}
            >
              <span>→</span>
              TERMS OF OPERATION
            </Link>
            <span className={styles.systemId}>
              <span className={styles.systemIdDot}></span>
              SYSTEM ID: DSG-{new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}