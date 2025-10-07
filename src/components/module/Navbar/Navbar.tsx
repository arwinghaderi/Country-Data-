import Link from 'next/link'

import { ModeToggle } from '../../Landing/modeToggle/modeToggle'
export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 dark:text-gray-100"
        >
          Country Data
        </Link>
      
        <ModeToggle />
      </div>
    </nav>
  )
}
