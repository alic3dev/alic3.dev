'use client'

import type { ImageProps } from 'next/dist/shared/lib/get-img-props'

import type { ModalContextInterface } from '@/components/modals'

import React from 'react'
import Image from 'next/image'

import { Spinner } from '@/components/decorative'
import { ModalContext } from '@/components/modals'

import styles from '@/components/ModalImage.module.scss'

export function ModalImage({
  id,
  imageProps,
}: {
  id: string
  imageProps: ImageProps
}): React.ReactElement {
  const modalContext = React.useContext<ModalContextInterface>(ModalContext)
  const [modalLoading, setModalLoading] = React.useState<boolean>(true)

  const isTallerThanWider = React.useMemo<boolean>((): boolean => {
    const width: number | undefined =
      typeof imageProps.width === 'string'
        ? parseInt(imageProps.width)
        : imageProps.width
    const height: number | undefined =
      typeof imageProps.height === 'string'
        ? parseInt(imageProps.height)
        : imageProps.height

    if (!width || isNaN(width) || !height || isNaN(height)) {
      return false
    }

    return width < height
  }, [imageProps])

  return (
    <>
      {modalLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <></>
      )}
      {/* Alt text is provided by `ImageProps` already */}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        {...imageProps}
        className={`${styles['modal-image']} ${
          isTallerThanWider ? styles['.tall'] : ''
        }`}
        priority={true}
        unoptimized={true}
        quality={100}
        loading="eager"
        onLoad={() => setModalLoading(false)}
        onClick={(): void => modalContext.modalManager.remove(id)}
      />
    </>
  )
}
