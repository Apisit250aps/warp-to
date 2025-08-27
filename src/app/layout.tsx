import type { Metadata } from 'next'

import './globals.css'
import { RetroGrid } from '@/components/magicui/retro-grid'

import { Itim } from 'next/font/google'
const itim = Itim({
  weight: '400',
  variable: '--font-itim',
  subsets: ['latin', 'thai'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.warp-to.space/'), // แก้เป็นโดเมนจริง
  title: {
    default: 'Warp to — เขียนวาร์บ ค้นหาความสุขแบบสุ่ม',
    template: '%s | Warp to',
  },
  description:
    'Warp to แพลตฟอร์มสำหรับเขียนและสุ่ม “วาร์บ” เพื่อค้นหาความสุข ไอเดีย และแรงบันดาลใจแบบ one tap.',
  keywords: [
    'warp',
    'วาร์บ',
    'random',
    'สุ่ม',
    'ความสุข',
    'แรงบันดาลใจ',
    'ไอเดีย',
    'journaling',
    'creative prompts',
  ],
  applicationName: 'Warp to',
  authors: [{ name: 'Warp to' }],
  category: 'productivity',
  alternates: {
    canonical: '/',
    languages: { 'th-TH': '/', en: '/en' },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.warp-to.space/',
    siteName: 'Warp to',
    title: 'Warp to — เขียนวาร์บ ค้นหาความสุขแบบสุ่ม',
    description: 'เขียนวาร์บ สุ่มวาร์บ และค้นหาความสุขในทุกวันกับ Warp to.',
    images: [
      {
        url: '/og/og-image-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Warp to — Write & Random Warp',
      },
    ],
    locale: 'th_TH',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Warp to — เขียนวาร์บ ค้นหาความสุขแบบสุ่ม',
    description: 'แพลตฟอร์มสุ่มวาร์บและจดบันทึกความสุขสั้น ๆ แบบ Gen Z',
    images: ['/og/og-image-1200x630.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0f19' },
  ],
  icons: {
    icon: [
      { url: '/icons/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon.ico', sizes: 'any' },
    ],
    apple: [
      {
        url: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: ['/icons/favicon.ico'],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/apple-touch-icon.png',
        color: '#0ea5e9',
      },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#0ea5e9',
    'msapplication-config': '/browserconfig.xml',
  },
}

import { Toaster } from '@/components/ui/sonner'
import Script from 'next/script'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ''
  return (
    <html lang="en">
      <head>
        {/* GA4: Google Tag Manager */}
        {GTM_ID ? (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
            />

            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GTM_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
            });
          `,
              }}
            />
          </>
        ) : null}
      </head>
      <body className={`${itim.variable} antialiased`}>
        <Toaster />
        <div className="relative h-screen w-full overflow-hidden">
          <RetroGrid />
          {children}
        </div>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      </body>
    </html>
  )
}
