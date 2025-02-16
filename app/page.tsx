import Image from 'next/image'
import Link from 'next/link'
import { Space_Mono } from 'next/font/google'
import { getHomePageContent } from '@/lib/api'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Exhibition, HomePageData } from '@/types/contentful'
import styles from './home.module.css'

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin']
})

export default async function HomePage() {
  const data = await getHomePageContent() as HomePageData
  const hero = data?.heroCollection?.items[0]
  const exhibitions: Exhibition[] | undefined = data?.exhibitionCollection?.items
  const about = data?.aboutCollection?.items[0]

  const currentDate = new Date().toISOString()
  const upcomingExhibitions: Exhibition[] | undefined = exhibitions
    ?.filter((exhibition: Exhibition) => exhibition.startDate > currentDate)
    ?.slice(0, 3)

  return (
    <main className={styles.wrapper}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
            <div className={styles.heroIndicator}></div>
            <h1 className={`${spaceMono.className} ${styles.heroTitle}`}>
              Surface Area:<br/>
              Planetary land collection
            </h1>
            <p className={styles.heroSubtitle}>
              Exploring the universe through the arts
            </p>
            <Link href="/exhibitions" className={styles.heroButton}>
              View Exhibitions
              <span className="ml-2">→</span>
            </Link>
        </div>
        {hero?.image && (
          <div className={styles.heroImageContainer}>
            <Image
              src={hero.image.url}
              alt="Mission Control Background"
              fill
              className={styles.heroImage}
            />
          </div>
        )}
      </section>

      <section className={styles.briefings}>
        <div className={styles.briefingsContainer}>
          <div className={styles.briefingsHeader}>
            <div className={styles.briefingsTitle}>
              <span className={`${styles.statusIndicator} ${styles.warning}`}></span>
              <h2 className={`${spaceMono.className} ${styles.briefingsSectionTitle}`}>
                Current & Upcoming Exhibitions
              </h2>
            </div>
          </div>

          <div className={styles.briefingsGrid}>
              {upcomingExhibitions?.map((exhibition: Exhibition) => (
                <Link 
                  key={exhibition.name} 
                  href={`/exhibitions/${exhibition.slug}`}
                  className={styles.missionCard}
                >
                  {exhibition.artworksCollection.items[0] && (
                    <div className={styles.missionImageContainer}>
                      <Image
                        src={exhibition.artworksCollection.items[0].image.url}
                        alt={exhibition.artworksCollection.items[0].name}
                        fill
                        className={styles.missionImage}
                      />
                      <div className={styles.imageOverlay} />
                    </div>
                  )}
                  <div className={styles.missionContent}>
                    <div className={styles.missionDates}>
                      {new Date(exhibition.startDate).toLocaleDateString('en-US', { 
                        month: 'long',
                        day: 'numeric'
                      })} - {new Date(exhibition.endDate).toLocaleDateString('en-US', { 
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <h3 className={`${spaceMono.className} ${styles.missionName}`}>
                      {exhibition.name}
                    </h3>
                    <p className={styles.commander}>{exhibition.artist.name}</p>
                    <div className={styles.viewDetails}>
                      Exhibition Details
                      <span className={styles.detailsArrow}>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
      </section>        

      <section className={styles.archive}>
        <div className={styles.archiveContainer}>
          <div className={styles.archiveHeader}>
            <span className={`${styles.statusIndicator} ${styles.warning}`}></span>
            <span className={styles.archiveStatus}>EXHIBITION ARCHIVE STATUS: ACTIVE</span>
          </div>
          
          <div className={styles.archiveGrid}>
            {exhibitions?.map((exhibition: Exhibition) => (
              <Link 
                key={exhibition.name} 
                href={`/exhibitions/${exhibition.slug}`}
                className={styles.archiveItem}
              >
                <span className={styles.archiveName}>
                  <span className={styles.archiveStar}>✦</span> {exhibition.shortName}
                </span>
                {exhibition.artworksCollection.items[0] && (
                  <div className={styles.archiveImageContainer}>
                    <Image
                      src={exhibition.artworksCollection.items[0].image.url}
                      alt={exhibition.artworksCollection.items[0].name}
                      fill
                      className={styles.archiveImage}
                    />
                    <div className={styles.archiveImageOverlay} />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {about && (
        <section className={styles.controlProfile}>
          <div className={styles.controlContainer}>
            <div className={styles.controlGrid}>
              <div className={styles.controlContent}>
                <div className={styles.controlHeader}>
                  <span className={`${styles.statusIndicator} ${styles.warning}`}></span>
                  <h2 className={`${spaceMono.className} ${styles.controlTitle}`}>
                    MISSION CONTROL
                  </h2>
                </div>
                
                <div className={styles.controlInfo}>                  
                  <p>
                    Executive Director: <span className={styles.missionDirector}>OLIVIA FITCH</span>
                  </p>
                </div>

                <div className={styles.controlDescription}>
                  {documentToReactComponents(about.content.json)}
                </div>

                <Link 
                  href="/about" 
                  className={styles.controlButton}
                >
                  FULL PROFILE
                  <span className={styles.controlArrow}>→</span>
                </Link>
              </div>

              <div className={styles.imageSection}>
                <div className={styles.imageOverlay}></div>
                <Image
                  src={about.image.url}
                  alt={about.title}
                  fill
                  className={styles.controlImage}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}