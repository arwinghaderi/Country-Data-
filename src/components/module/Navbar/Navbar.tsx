'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ModeToggle } from '../../Landing/modeToggle/modeToggle'

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 sticky top-0 z-50 transition-colors  shadow-sm shadow-amber-400 ">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="لوگو"
            width={100}
            height={100}
            className="object-contain rounded-2xl  "
            priority
          />
        </Link>

        <ModeToggle />
      </div>
    </nav>
  )
}
