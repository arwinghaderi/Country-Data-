'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error boundary caught:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-red-500">
        اوپس! خطایی رخ داده 😢
      </h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300 text-center">
        متأسفیم، مشکلی در بارگذاری این صفحه پیش آمده است.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-md transition"
      >
        تلاش دوباره 🔄
      </button>
    </div>
  )
}
