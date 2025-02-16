import Image from 'next/image'
import { getExhibitionBySlug } from '@/lib/api'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import ExhibitionContent from '@/components/exhibition/ExhibitionContent'
import styles from './exhibitionPage.module.css'

export default async function ExhibitionPage({
  params,
}: {
  params: { slug: string }
}) {
  const { isEnabled: isDraftMode } = draftMode()
  const exhibition = await getExhibitionBySlug(params.slug, isDraftMode)

  if (!exhibition) {
    notFound()
  }

  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        <Image
          src={exhibition.artworksCollection.items[0].image.url}
          alt={exhibition.artworksCollection.items[0].name}
          fill
          className={styles.heroImage}
          priority
        />
        <div className={styles.heroOverlay} />
      </div>

      <ExhibitionContent exhibition={exhibition} />
    </div>
  )
}