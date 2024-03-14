import type { Metadata } from 'next'

import type { BlogPost, Category } from '../payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'


export const generateMeta = async (args: { doc: BlogPost | Category }): Promise<Metadata> => {
  const { doc } = args || {}
  // console.log('doc', doc)

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc?.meta?.image !== null &&
    'url' in doc?.meta?.image &&
    `${process.env.PAYLOAD_BACKEND_URL}${doc.meta.image.url}`

  return {
    title: doc?.meta?.title || '',
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      title: doc?.meta?.title || 'Massive',
      description: doc?.meta?.description || 'Massive',
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
  }
}
