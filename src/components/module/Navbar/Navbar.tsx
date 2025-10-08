'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '../../Landing/modeToggle/modeToggle'

export default function Navbar() {
  const pathname = usePathname()

  const isHome = pathname === '/'

  return (
    <nav className="bg-white dark:bg-gray-900 sticky top-0 z-50 transition-colors shadow-sm shadow-amber-400">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className=' flex items-center   justify-start gap-5 md:gap-15 '>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="لوگو"
              width={100}
              height={100}
              className="object-contain rounded-2xl"
              priority
            />
          </Link>
          {isHome ? (
            <>
              <a
                href="#features"
                className="text-gray-700 text-lg dark:text-gray-200 hover:text-amber-500 transition-colors font-medium"
              >
                ویژگی‌ها
              </a>
              <a
                href="#countries"
                className="text-gray-700 text-lg dark:text-gray-200 hover:text-amber-500 transition-colors font-medium"
              >
                کشورها
              </a>
            </>
          ) : (
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-200 hover:text-amber-500 transition-colors font-medium"
            >
              خانه
            </Link>
          )}
        </div>

        <ModeToggle />
      </div>
    </nav>
  )
}
