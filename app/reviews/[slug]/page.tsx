import { getReviewBySlug } from '@/lib/api'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import { Space_Mono } from 'next/font/google'
import styles from './review.module.css'

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin']
})

export const revalidate = 0;

export default async function ReviewPage({
  params,
}: {
  params: { slug: string }
}) {
  const { isEnabled: isDraftMode } = draftMode()
  const review = await getReviewBySlug(params.slug, isDraftMode)

  if (!review) {
    notFound()
  }

  return (
    <main className={styles.container}>
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={`${spaceMono.className} ${styles.title}`}>
            {review.title}
          </h1>
          <div className={styles.reviewer}>
            Review by {review.criticName}
          </div>
        </header>

        <div className={styles.content}>
          {review.artwork && (
            <div className={styles.artworkContainer}>
              <div className={styles.imageWrapper}>
                <Image
                  src={review.artwork.image.url}
                  alt={review.artwork.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {(review.artwork.name || review.artwork.artist) && (
                <div className={styles.artworkInfo}>
                  {review.artwork.name && (
                    <span className={styles.artworkTitle}>{review.artwork.name}</span>
                  )}
                  {review.artwork.artist && (
                    <span className={styles.artworkArtist}>
                      by {review.artwork.artist.name}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          <div className={styles.reviewContent}>
            {documentToReactComponents(review.review.json)}
          </div>
        </div>

        {isDraftMode && (
          <div className={styles.draftMode}>
            Preview Mode - This is a draft
          </div>
        )}
      </article>
    </main>
  )
}