import { memo } from 'react'
import Link from 'next/link'

interface SectionHeaderProps {
  title: string
  dec?: string
  center: boolean
  btnTitle?: string
  btnHref?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = memo(
  ({ title, dec, center, btnTitle, btnHref }) => {
    return (
      <>
        <div className="container">
          <div className="w-full mb-5 md:mb-8">
            <div
              className={`flex  flex-col  gap-3  justify-center ${
                center ? ' items-center ' : ' items-start'
              }   text-sm  md:text-32 text-Gray-35 `}
            >
              <div
                className={` w-full  h-auto flex items-center  ${
                  center ? ' justify-center' : ' justify-between '
                } `}
              >
                <h3 className="  font-extrabold text-3xl   ">{title}</h3>
                {btnTitle ? (
                  <Link
                    className={
                      ' text-secondary transition-all duration-300 hover:text-primary  text-xs md:text-lg'
                    }
                    href={`${btnHref}`}
                  >
                    {btnTitle}
                  </Link>
                ) : (
                  ''
                )}
              </div>
              {dec ? <h5 className=" text-xs lg:text-2xl"> {dec}</h5> : ''}
            </div>
          </div>
        </div>
      </>
    )
  }
)
export default SectionHeader
