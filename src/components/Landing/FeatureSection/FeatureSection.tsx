'use client'

import { Zap, Globe, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionHeader from '../../module/sectionHeader/sectionHeader'

const features = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'اطلاعات کامل کشورهای جهان',
    description:
      'پرچم‌ها، مناطق، پایتخت‌ها و داده‌های مهم هر کشور را مشاهده کنید.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'سرعت و کارایی بالا',
    description:
      'با استفاده از Next.js و React Query، داده‌ها سریع و روان بارگذاری می‌شوند.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'امنیت و قابلیت اطمینان',
    description:
      'اطلاعات ایمن و قابل اعتماد با ساختار مدرن و به‌روز ارائه می‌شوند.',
  },
]

export default function FeatureSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      <div className=" w-full  flex items-center justify-start text-right mb-12">
        <SectionHeader
          title="ویژگی‌های پروژه"
          dec="این پروژه چه کاری انجام می‌دهد و چرا استفاده از آن جذاب است."
          center={false}
        />
      </div>
      <div className="container">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-right"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-gradient-to-tr from-amber-400 to-yellow-500 text-white rounded-full ml-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
