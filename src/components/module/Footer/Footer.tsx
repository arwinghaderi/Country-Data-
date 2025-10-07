'use client'

import { Github, Linkedin, Send } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-10">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm md:text-base text-center md:text-left">
          ساخته شده با <span className="text-red-500 animate-pulse">❤️</span>{' '}
          توسط آروین قادری
        </p>

        <div className="flex gap-6">
          <motion.a
            href="https://github.com/arwinghaderi"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            title="GitHub"
          >
            <Github className="h-6 w-6" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/arvinghaderi/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            title="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </motion.a>

          <motion.a
            href="https://t.me/arvin81"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-400"
            title="Telegram"
          >
            <Send className="h-6 w-6" />
          </motion.a>
        </div>
      </div>

      <div className="border-t  py-10 border-gray-300 dark:border-gray-700 mt-4 pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Country Data. تمامی حقوق محفوظ است.
      </div>
    </footer>
  )
}
