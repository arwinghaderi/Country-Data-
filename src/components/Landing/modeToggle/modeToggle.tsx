'use client'

import * as React from 'react'
import { Sun, Moon, Monitor, Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

type ThemeOption = 'light' | 'dark' | 'system'

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isLoading = !mounted || !resolvedTheme

  const activeTheme: ThemeOption =
    theme === 'system' ? (resolvedTheme as ThemeOption) : (theme as ThemeOption)

  const icons: Record<ThemeOption, React.JSX.Element> = {
    light: <Sun className="h-5 w-5 text-yellow-500 drop-shadow-md" />,
    dark: <Moon className="h-5 w-5 text-blue-400 drop-shadow-md" />,
    system: <Monitor className="h-5 w-5 text-green-400 drop-shadow-md" />,
  }

  const options: { label: string; value: ThemeOption; color: string }[] = [
    { label: 'روشن', value: 'light', color: 'text-yellow-500' },
    { label: 'تاریک', value: 'dark', color: 'text-blue-400' },
    { label: 'سیستم', value: 'system', color: 'text-green-400' },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={isLoading}
        className="relative w-12 h-12 rounded-xl cursor-pointer
          bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900
          border border-gray-300 dark:border-gray-700
          shadow-lg flex items-center justify-center hover:shadow-xl transition-all
          disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLoading ? (
            <motion.div
              key="spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <Loader2 className="h-5 w-5 text-gray-500 dark:text-gray-400 animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              key={activeTheme}
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
              className="absolute"
            >
              {icons[activeTheme]}
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {!isLoading && open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-3 w-44 rounded-2xl
              bg-white/95 dark:bg-gray-900/90
              backdrop-blur-md
              shadow-2xl border border-gray-200 dark:border-gray-700
              overflow-hidden flex flex-col z-50 px-3 py-3 gap-2"
          >
            {options.map(({ label, value, color }) => {
              const isActive =
                theme === 'system'
                  ? value === 'system' ||
                    (value === 'light' && resolvedTheme === 'light')
                  : activeTheme === value

              return (
                <motion.li
                  key={value}
                  onClick={() => {
                    setTheme(value)
                    setOpen(false)
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-3 w-full px-4 py-2 cursor-pointer text-sm transition-all rounded-lg
                    ${
                      isActive
                        ? `bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 font-semibold ${color}`
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                >
                  {icons[value]}
                  <span>{label}</span>
                </motion.li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
