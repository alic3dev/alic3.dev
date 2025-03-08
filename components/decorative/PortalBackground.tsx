'use client'

import React from 'react'
import Image from 'next/image'

import { ScanLines } from '@/components/decorative'

import styles from '@/components/decorative/PortalBackground.module.scss'

export function PortalBackground(): React.ReactElement {
  const [imagesLoaded, setImagesLoaded] = React.useState<number>(0)

  const allImagesLoaded: boolean = imagesLoaded >= 3
  const imageClassName = `${styles.image} ${
    allImagesLoaded ? styles.active : ''
  }`
  const scanLinesClassName = `${styles['scan-lines-wrapper']} ${
    allImagesLoaded ? styles.active : ''
  }`

  const onImageLoad = React.useCallback((): void => {
    setImagesLoaded((prevImagesLoaded: number): number => prevImagesLoaded + 1)
  }, [])

  return (
    <div className={styles.background}>
      <div className={styles['images-container']}>
        <Image
          className={imageClassName}
          src="/131ee4045b158af250e7b47a148729ef.jpeg"
          width={1024}
          height={1024}
          quality={33}
          alt="background"
          onLoad={onImageLoad}
        />
        <Image
          className={imageClassName}
          src="/efe1e1e6e17923712943fecd5060f5dd.jpeg"
          width={1024}
          height={1024}
          quality={33}
          alt="background"
          onLoad={onImageLoad}
        />
        <Image
          className={imageClassName}
          src="/ad6ddd79494120eae3443ce861855f52.jpeg"
          width={1024}
          height={1024}
          quality={33}
          alt="background"
          onLoad={onImageLoad}
        />
      </div>

      <div className={scanLinesClassName}>
        <ScanLines />
      </div>
    </div>
  )
}
