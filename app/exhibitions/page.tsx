import { getAllExhibitions } from '@/lib/api'
import { Space_Mono } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import styles from './exhibitions.module.css'
import { Exhibition } from '@/types/contentful'

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin']
})

export default async function ExhibitionsPage() {
  const exhibitions = await getAllExhibitions()
  const currentDate = new Date().toISOString()
  
  const activeExhibitions = exhibitions?.filter((exhibition: Exhibition) => exhibition.endDate > currentDate) || []
  const completedExhibtions = exhibitions?.filter((exhibition: Exhibition) => exhibition.endDate <= currentDate) || []

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span className={`${styles.statusIndicator} ${styles.warning}`}></span>
            <h1 className={`${spaceMono.className} ${styles.title}`}>
              Exhibition Control Center
            </h1>
          </div>
          <div className={styles.stats}>
            <p>Accessing Deep Space Exhibition Database...</p>
            <ul className={styles.statsList}>
              <li className={styles.statsItem}>
                <p>{exhibitions?.length || 0}</p>
                <p>Total Exhibitions</p>
                </li>
              <li className={styles.statsItem}>
                <p>{activeExhibitions.length}</p>
                <p>Active Exhibitions</p> 
                </li>
              <li className={styles.statsItem}>
                <p>{completedExhibtions.length}</p>
                <p>Completed Exhibitions</p> 
              </li>
            </ul>
          </div>
        </div>

        {activeExhibitions.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                <span className={`${styles.statusIndicator} ${styles.active}`}></span>
                <h2 className={`${spaceMono.className} ${styles.title}`}>
                  Active Exhibitions
                </h2>
              </div>
            </div>

            <div className={styles.grid}>
              {activeExhibitions.map((exhibition: any) => (
                <Link 
                  key={exhibition.slug}
                  href={`/exhibitions/${exhibition.slug}`}
                  className={styles.card}
                >
                  <div className={styles.imageContainer}>
                    {exhibition.artworksCollection.items[0] && (
                      <>
                        <Image
                          src={exhibition.artworksCollection.items[0].image.url}
                          alt={exhibition.artworksCollection.items[0].name}
                          fill
                          className={styles.image}
                        />
                        <div className={styles.imageOverlay} />
                      </>
                    )}
                    <div className={styles.statusBadge}>
                      <span className={`${styles.statusBadgeText} ${styles.active}`}>ACTIVE</span>
                    </div>
                  </div>

                  <div className={styles.cardContent}>
                    <h2 className={`${spaceMono.className} ${styles.cardTitle}`}>
                      {exhibition.name}
                    </h2>
                    
                    <div className={styles.timeline}>
                      Exhibition Timeline:
                      <br/>
                      {new Date(exhibition.startDate).toLocaleDateString('en-US', { 
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })} - {new Date(exhibition.endDate).toLocaleDateString('en-US', { 
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>

                    <div className={styles.cardFooter}>
                      <p className={styles.commander}>
                        {exhibition.artist.name}
                      </p>
                      <span className={`${styles.accessLink} ${styles.active}`}>
                        ACCESS →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {completedExhibtions.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                <span className={`${styles.statusIndicator} ${styles.archived}`}></span>
                <h2 className={`${spaceMono.className} ${styles.title}`}>
                  Exhibition archives
                </h2>
              </div>
            </div>

            <div className={styles.grid}>
              {completedExhibtions.map((exhibition: any) => (
                <Link 
                  key={exhibition.slug}
                  href={`/exhibitions/${exhibition.slug}`}
                  className={`${styles.card} ${styles.archived}`}
                >
                  <div className={styles.imageContainer}>
                    {exhibition.artworksCollection.items[0] && (
                      <>
                        <Image
                          src={exhibition.artworksCollection.items[0].image.url}
                          alt={exhibition.artworksCollection.items[0].name}
                          fill
                          className={styles.image}
                        />
                        <div className={styles.imageOverlay} />
                      </>
                    )}
                    <div className={styles.statusBadge}>
                      <span className={`${styles.statusBadgeText} ${styles.archived}`}>ARCHIVED</span>
                    </div>
                  </div>

                  <div className={styles.cardContent}>
                    <h2 className={`${spaceMono.className} ${styles.cardTitle}`}>
                      {exhibition.name}
                    </h2>
                    
                    <div className={styles.timeline}>
                      Exhibition Completed:
                      <br/>
                      {new Date(exhibition.startDate).toLocaleDateString('en-US', { 
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })} - {new Date(exhibition.endDate).toLocaleDateString('en-US', { 
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>

                    <div className={styles.cardFooter}>
                      <p className={styles.commander}>
                        {exhibition.artist.name}
                      </p>
                      <span className={`${styles.accessLink} ${styles.archived}`}>
                        VIEW LOG →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}