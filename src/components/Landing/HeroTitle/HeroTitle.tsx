'use client'

import { Typewriter } from 'react-simple-typewriter'

export default function HeroTitle() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-2xl leading-9 tracking-tighter  h-10">
        <Typewriter
          words={['کاوش در کشورهای سراسر جهان']}
          loop={true}
          typeSpeed={150}
          deleteSpeed={80}
          delaySpeed={2000}
        />
      </h1>

      <p className="text-lg md:text-2xl text-amber-300 drop-shadow-md leading-relaxed">
        'همه کشورهای جهان را مرور کنید، پرچم‌ها، مناطق، پایتخت‌ها و اطلاعات
        بیشتر را ببینید.
        <br />
        ساخته‌شده با
        <br />
        Next.js، Tailwind CSS، React Query و shadcn/ui.
      </p>
    </>
  )
}
