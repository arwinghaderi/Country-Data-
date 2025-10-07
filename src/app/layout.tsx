import Navbar from '@/components/module/Navbar/Navbar'
import Footer from '@/components/module/Footer/Footer'
import { ThemeProvider } from '@/components/module/ThemeProvider/ThemeProvider'
import '@/app/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" suppressHydrationWarning className="dark">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
