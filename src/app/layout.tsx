import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import '@/styles/animations.css'
import '@/styles/gradients.css'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next';


import { Providers } from './providers'

// Cookie consent
import LoadCookies from '@/website/features/cookie-consent/LoadCookies'
import CookieConsentBanner from '@/website/features/cookie-consent/CookieConsentBanner'
import generateSchema from '@/website/schema/generate-schema'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Massive Online Marketing'
  },
  description:
    'Zet uw zakelijke visie samen met Massive Online Marketing om in tastbare sucessen met strategieën die ondernemerschap en resultaatgerichtheid combineren',
  metadataBase: new URL(process.env.WEBSITE_URL || 'http://localhost:3000/'),
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // openGraph: {
  //   title: 'Massive Online Marketing',
  //   description:
  //     'Massive Online Marketing is een online marketing bureau dat zich richt op het helpen van ondernemers met het behalen van hun doelen.',
  //   url: process.env.WEBSITE_URL,
  //   siteName: 'Massive Online Marketing',
  //   // invullen met de juiste afbeeldingen
  //   images: [
  //     {
  //       url: 'https://nextjs.org/og.png',
  //       width: 800,
  //       height: 600,
  //     },
  //     {
  //       url: 'https://nextjs.org/og-alt.png',
  //       width: 1800,
  //       height: 1600,
  //       alt: 'My custom alt',
  //     },
  //   ],
  //   locale: 'nl_NL',
  //   type: 'website',
  // },
  // // invullen met juiste twitter gegevens
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Next.js',
  //   description: 'Massive Online Marketing is een online marketing bureau dat zich richt op het helpen van ondernemers met het behalen van hun doelen.',
  //   siteId: '1467726470533754880',
  //   creator: '@nextjs',
  //   creatorId: '1467726470533754880',
  //   images: ['https://nextjs.org/og.png'],
  // },
  verification: {
    google: 'google',
    yahoo: 'yahoo',
  },
}

export const viewport = {
  themeColor: 'white',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const schema = generateSchema('DefaultSchema')

  return (
    <html lang="nl">
      <body className={`${inter.className} overflow-x-hidden h-screen`}>


        <Providers>
          {children}
        </Providers>


        <LoadCookies />
        <CookieConsentBanner />
        <SpeedInsights />

        <Script type="application/ld+json" id='default-schema'>
          {JSON.stringify(schema)}
        </Script>
      </body>
    </html>
  )
}
