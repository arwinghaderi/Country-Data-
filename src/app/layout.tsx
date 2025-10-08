import type { Metadata } from 'next'
import '@/app/globals.css'
import Providers from './providers'
import Navbar from '@/components/module/Navbar/Navbar'
import Footer from '@/components/module/Footer/Footer'

export const metadata: Metadata = {

  description: 'مشاهده و جزئیات کشورهای جهان در لوکو 🌍',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'لوکو | جزئیات کشورهای جهان',
    description: 'با لوکو، جزئیات کامل کشورهای جهان را ببینید 🌎',
    images: ['/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" suppressHydrationWarning className="dark">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
