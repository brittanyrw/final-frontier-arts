import './styles/globals.css'
import type { Metadata } from 'next'
import { ContentfulLivePreviewProvider } from '@/components/contentful/ContentfulLivePreviewProvider'
import { Space_Mono } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import { getHomePageContent } from '@/lib/api'
import styles from './layout.module.css'

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Final Frontier Arts',
  description: 'Exploring the universe through the arts',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isOpen = true
  const data = await getHomePageContent()
  const exhibitions = data?.exhibitionCollection?.items

  return (
    <html lang="en">
      <body>
        <ContentfulLivePreviewProvider>
          <nav className={styles.nav}>
            <div className={styles.container}>
              <div className={styles.navContent}>
                <h1 className={`${spaceMono.className} ${styles.logo}`}>
                  <span className={styles.statusIndicator}></span>
                  <a href="/" className={styles.logoLink}>
                    FINAL FRONTIER ARTS
                  </a>
                </h1>

                <div className={styles.navLinks}>
                  <a href="/" className={styles.navLink}>
                    MAIN
                  </a>
                  <a href="/exhibitions" className={styles.navLink}>
                    EXHIBITIONS
                  </a>
                  <a href="/about" className={styles.navLink}>
                    ABOUT
                  </a>
                </div>

                <div className={styles.statusBox}>
                  <div className={isOpen ? styles.statusIndicatorOperational : styles.statusIndicatorOffline} />
                  <p className={styles.statusText}>
                    GALLERY STATUS: {isOpen ? 'OPEN' : 'CLOSED'}
                  </p>
                </div>
              </div>
            </div>
          </nav>
          <main>
            {children}
          </main>
          <Footer exhibitions={exhibitions} />
        </ContentfulLivePreviewProvider>
      </body>
    </html>
  )
}