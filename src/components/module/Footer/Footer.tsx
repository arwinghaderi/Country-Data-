export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-10">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Country Data. All rights reserved.
        </p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a
            href="https://github.com/yourusername/country-data"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-100 transition"
          >
            GitHub
          </a>
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-100 transition"
          >
            Vercel
          </a>
        </div>
      </div>
    </footer>
  )
}
