'use client'

import type { ImageProps } from 'next/dist/shared/lib/get-img-props'

import type { ModalContextInterface } from '@/components/modals'

import React from 'react'
import Image from 'next/image'

import { ModalImage } from '@/components/ModalImage'

import { ThemeContext, ModalContext } from '@/contexts'

import styles from '@/components/ImageWithViewer.module.scss'

interface ImagePropsThemed extends ImageProps {
  srcdark?: ImageProps['src']
  srclight?: ImageProps['src']
}

export function ImageWithViewer({
  imageProps,
}: {
  imageProps: ImagePropsThemed
}): React.ReactElement {
  const theme = React.useContext(ThemeContext)
  const modalContext = React.useContext<ModalContextInterface>(ModalContext)

  const imageSrc: ImageProps['src'] = React.useMemo<
    ImageProps['src']
  >((): ImageProps['src'] => {
    if (imageProps.srcdark && theme.theme === 'dark') {
      return imageProps.srcdark
    }

    if (imageProps.srclight && theme.theme === 'light') {
      return imageProps.srclight
    }

    return imageProps.src
  }, [imageProps, theme])

  const addModal = React.useCallback((): void => {
    const id: string = crypto.randomUUID()

    modalContext.modalManager.add({
      id: id,
      content: (
        <ModalImage id={id} imageProps={{ ...imageProps, src: imageSrc }} />
      ),
    })
  }, [imageProps, imageSrc, modalContext.modalManager])

  const [refreshKey, setRefreshKey] = React.useState<number>(0)

  React.useEffect((): void => {
    setRefreshKey((prevRefreshKey: number): number => prevRefreshKey + 1)
  }, [])

  return (
    <>
      {typeof imageProps.srcdark === 'string' ? (
        <link rel="prefetch" href={imageProps.srcdark} />
      ) : (
        <></>
      )}
      {typeof imageProps.srclight === 'string' ? (
        <link rel="prefetch" href={imageProps.srclight} />
      ) : (
        <></>
      )}

      {/* Alt text is provided by `ImageProps` already */}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        {...imageProps}
        src={imageSrc}
        key={refreshKey}
        className={`${styles['image']} ${imageProps.className || ''}`}
        onClick={(event): void => {
          if (imageProps.onClick) {
            imageProps.onClick(event)
          }

          addModal()
        }}
        suppressHydrationWarning
      />
    </>
  )
}
