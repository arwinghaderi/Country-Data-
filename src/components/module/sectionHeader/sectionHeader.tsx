import { memo } from 'react'
import Link from 'next/link'

interface SectionHeaderProps {
  title: string
  dec?: string
  center?: boolean
  btnTitle?: string
  btnHref?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = memo(
  ({ title, dec, center = false, btnTitle, btnHref }) => {
    return (
      <div className="container">
        <div className="w-full mb-10 md:mb-14">
          <div
            className={`flex flex-col gap-4 ${
              center ? 'items-center text-center' : 'items-start text-right'
            }`}
          >
            <div
              className={`w-full flex items-center ${
                center ? 'justify-center' : 'justify-between'
              }`}
            >
              <h3 className="font-extrabold text-3xl md:text-4xl bg-gradient-to-r from-amber-500 to-orange-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                {title}
              </h3>

              {btnTitle && btnHref && (
                <Link
                  href={btnHref}
                  className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-1.5 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 hover:text-white dark:hover:from-blue-500 dark:hover:to-cyan-500 transition-all duration-300 shadow-sm"
                >
                  {btnTitle}
                </Link>
              )}
            </div>

            {dec && (
              <h5 className="text-gray-600 dark:text-gray-400 text-sm md:text-lg max-w-2xl leading-relaxed">
                {dec}
              </h5>
            )}
          </div>
        </div>
      </div>
    )
  }
)

export default SectionHeader
