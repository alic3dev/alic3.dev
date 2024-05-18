'use client'

import type { ImageProps } from 'next/dist/shared/lib/get-img-props'

import type { ModalContextInterface } from '@/components/modals'

import React from 'react'
import Image from 'next/image'

import { ModalContext } from '@/components/modals'
import { ModalImage } from '@/components/ModalImage'

import styles from './ImageWithViewer.module.scss'

export function ImageWithViewer({
  imageProps,
}: {
  imageProps: ImageProps
}): React.ReactElement {
  const modalContext = React.useContext<ModalContextInterface>(ModalContext)

  const addModal = React.useCallback((): void => {
    const id: string = crypto.randomUUID()

    modalContext.modalManager.add({
      id: id,
      content: <ModalImage id={id} imageProps={imageProps} />,
    })
  }, [imageProps, modalContext.modalManager])

  return (
    <>
      {/* Alt text is provided by `ImageProps` already */}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        {...imageProps}
        className={`${styles['image']} ${imageProps.className || ''}`}
        onClick={(event): void => {
          if (imageProps.onClick) {
            imageProps.onClick(event)
          }

          addModal()
        }}
      />
    </>
  )
}
