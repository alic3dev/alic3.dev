'use client'

import React from 'react'
import Image from 'next/image'

import styles from '@/components/demandment/Eye.module.scss'

export function Eye() {
  'use client'

  const [eyeSrc /*, setEyeSrc*/] = React.useState<string>(
    '/demandment/IMG3065.png',
  )

  // React.useEffect((): (() => void) => {
  //   const intervalHandle = window.setInterval((): void => {
  //     setEyeSrc((prevEyeSrc: string): string => {
  //       let num = Number.parseInt(
  //         prevEyeSrc.substring(
  //           '/demandment/IMG'.length,
  //           '/demandment/IMG'.length + 4,
  //         ),
  //       )

  //       num++

  //       if (num > 3065) {
  //         num = 3057
  //       }

  //       return `/demandment/IMG${num}.png`
  //     })
  //   }, 100)

  //   return (): void => {
  //     window.clearInterval(intervalHandle)
  //   }
  // }, [])

  return (
    <Image
      src={eyeSrc}
      alt="Eye"
      width={4032}
      height={3024}
      className={styles.eye}
    />
  )
}
