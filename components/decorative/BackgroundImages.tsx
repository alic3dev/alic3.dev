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
  const imagesLoadedRef = React.useRef<Set<string>>(new Set())
  const [allImagesLoaded, setAllImagesLoaded] = React.useState<boolean>(
    !images || !images.length,
  )

  const onImageLoad = React.useCallback(
    (key: string): (() => void) => {
      return (): void => {
        imagesLoadedRef.current.add(key)
        setAllImagesLoaded(images.length <= imagesLoadedRef.current.size)
      }
    },
    [images],
  )

  React.useEffect((): void => {
    if (!images) {
      setAllImagesLoaded(true)
      imagesLoadedRef.current.clear()
      return
    }

    const imageKeys: string[] = images.map(
      (image: string, index: number): string => `${image}-${index}`,
    )

    for (const key of imagesLoadedRef.current.keys()) {
      if (!imageKeys.includes(key)) {
        imagesLoadedRef.current.delete(key)
      }
    }

    setAllImagesLoaded(imageKeys.length <= imagesLoadedRef.current.size)
  }, [images])

  return (
    <div className={styles.background}>
      {images.map(
        (image: string, index: number): JSX.Element => (
          <Image
            key={`${image}-${index}`}
            className={`${styles.image} ${
              allImagesLoaded ? styles.active : ''
            }`}
            src={image}
            width={1024}
            height={1024}
            quality={100}
            alt="background"
            priority
            onLoad={onImageLoad(`${image}-${index}`)}
          />
        ),
      )}
    </div>
  )
}
