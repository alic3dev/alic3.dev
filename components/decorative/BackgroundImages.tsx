import React from 'react'

import styles from './BackgroundImages.module.scss'
import Image from 'next/image'

const defaultImages: string[] = [
  '/4a03107ee9f15ae9b82cedbaa4ee027f042f5d87.jpeg',
  '/4e41743b2fb8e9f358722d057c531ee785b0b862.jpeg',
  '/257a9d14c005c3eaf3a1255d6296b8518da12f9d.jpeg',
  '/47238fa52baad6ecdd6fb7741557de2ecbe412c8.jpeg',
]

export function BackgroundImages({
  images = defaultImages,
}: {
  images?: string[]
}): JSX.Element {
  return (
    <div className={styles.background}>
      {images.map(
        (image: string, index: number): JSX.Element => (
          <Image
            key={`${image}-${index}`}
            className={styles.image}
            src={image}
            width={1024}
            height={1024}
            quality={100}
            alt="background"
            priority
          />
        ),
      )}
    </div>
  )
}
